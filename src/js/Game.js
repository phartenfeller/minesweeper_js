import Board from './board';
import emptyBoard from './board/util/emtyBoard';
import addGameResult from './db/addGameResult';
import DomListener from './DomListener';
import Points from './Points';
import Timer from './Timer';

class Game {
  /**
   * Setups a Game
   * @param {boolean} debug
   */
  constructor(initialZoom, debug = false) {
    this.debug = debug;
    this.showBombs = debug;

    this.rows = undefined;
    this.columns = undefined;
    this.bombs = undefined;

    this.domListener = new DomListener(this);
    this.zoom = initialZoom;
    this.applyZoom();

    this.setupGame();
  }

  /**
   * Setups the game
   */
  setupGame() {
    if (this.board) {
      emptyBoard();
    }

    const iRows = parseInt(document.getElementById('input-rows').value);
    const iCols = parseInt(document.getElementById('input-columns').value);
    const iBombs = parseInt(document.getElementById('input-bombs').value);

    // min 8 rows and cols and 1 bomb
    this.rows = iRows < 8 ? 8 : iRows;
    this.columns = iCols < 8 ? 8 : iCols;
    this.bombs = iBombs < 1 ? 1 : iBombs;

    this.amountFields = this.rows * this.columns - this.bombs;
    this.board = new Board({
      rows: this.rows,
      cols: this.columns,
      bombs: this.bombs,
      domListener: this.domListener
    });
    this.domListener.init();
    // this.board.fillBoardValues();
    this.gameWon = false;

    this.points = new Points(this.bombs);
    this.timer = new Timer();
  }

  /**
   * Restart game
   */
  newGame() {
    try {
      window.plausible('newGame');
    } catch {
      console.log('plausible not found');
    }
    this.clearGame();
    this.setupGame();
  }

  /**
   * Check if block is out of reach or already clicked
   * @param {number} row
   * @param {number} col
   */
  skippableBlock(row, col) {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.columns) {
      return true;
    }
    if (this.board.isFlagged(row, col)) return true;
    return this.board.isClicked(row, col);
  }

  /**
   * process that runs if a field is clicked
   * @param {number} row
   * @param {number} col
   * @return {boolaen} wasFlag
   */
  blockClicked(row, col) {
    // skip if field is not on gamefield
    if (this.skippableBlock(row, col)) {
      return false;
    }

    const { wasBomb, number } = this.board.clickBlock(row, col);

    if (wasBomb) {
      this.bombClicked();
      return false;
    }
    this.fieldClicked(row, col, number);
    return false;
  }

  /**
   * Clicked on a field
   * @param {number} row
   * @param {number} col
   * @param {number} number
   */
  fieldClicked(row, col, number) {
    this.amountFields -= 1;

    // if zero bombs around reveal the fields around
    if (number === 0) {
      this.floodFill(row, col);
    }

    // win game when all fields which are not bombs are clicked
    if (this.amountFields === 0) {
      this.winGame();
    }
  }

  /**
   * flags a field on rightclick
   * @param {number} row
   * @param {number} col
   */
  flagField(row, col) {
    const flaggedBefore = this.board.handleFlag(row, col);

    if (flaggedBefore) {
      this.points.addPoint();
    } else {
      this.points.removePoint();
    }
  }

  /**
   * procedure which sets the game to won
   */
  winGame() {
    if (!this.gameWon) {
      const time = this.timer.getFinishTime();
      console.log('time =>', time);
      this.board.winGame();
      this.timer.stopTimer();
      const settingsCode = this.getSettingsCode();
      addGameResult({ mode: settingsCode, result: 'w', time });
    }

    this.gameWon = true;
  }

  /**
   * reveals fields around a field with 0 bombs around
   * @param {number} row
   * @param {number} col
   */
  floodFill(row, col) {
    // timeout so the ui has time to repaint in the meantime
    // => looks way smoother
    setTimeout(() => {
      this.blockClicked(row - 1, col - 1);
      this.blockClicked(row - 1, col);
      this.blockClicked(row - 1, col + 1);

      this.blockClicked(row + 1, col - 1);
      this.blockClicked(row + 1, col);
      this.blockClicked(row + 1, col + 1);

      this.blockClicked(row, col - 1);
      this.blockClicked(row, col + 1);
    }, 1);
  }

  /**
   * process that runs if the player clicks on a bomb
   */
  bombClicked() {
    const time = this.timer.getFinishTime();
    this.timer.stopTimer();
    this.board.loseGame();

    const settingsCode = this.getSettingsCode();
    addGameResult({ mode: settingsCode, result: 'l', time });
  }

  /**
   * clears old Game data
   */
  clearGame() {
    this.timer.stopTimer();
    this.timer.setTimerToZero();
  }

  /**
   * Apply zoom
   * @param {number} newZoom
   */
  applyZoom(newZoom = undefined) {
    this.zoom = newZoom || this.zoom;

    const game = document.getElementById('game');
    game.style.zoom = this.zoom;
  }

  /**
   * Get settings code for db
   */
  getSettingsCode() {
    return `${this.rows}x${this.columns} ${this.bombs}b`;
  }
}

export default Game;
