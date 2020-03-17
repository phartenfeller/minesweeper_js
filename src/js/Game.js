import Board from './board';
import emptyBoard from './board/util/emtyBoard';
import { flagClass, gameButton } from './DomObjects.js';
import { Points } from './Points.js';
import { Timer } from './Timer.js';
import { showTime } from './UI.js';
import { debugLog, getID } from './Util.js';

const cBomb = 'b';
class Game {
  /**
   * Setups a Game
   * @param {boolean} debug
   */
  constructor(debug = false) {
    debugLog('Setting up Game...');

    this.debug = debug;
    this.showBombs = debug;

    this.rows = undefined;
    this.columns = undefined;
    this.bombs = undefined;

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

    debugLog(
      `${this.rows} rows, `,
      `${this.columns} cols, `,
      `${this.bombs} bombs`
    );

    this.amountFields = this.rows * this.columns - this.bombs;
    this.board = new Board({
      rows: this.rows,
      cols: this.columns,
      bombs: this.bombs
    });
    // this.board.fillBoardValues();
    this.gameWon = false;

    this.points = new Points(this.bombs);
    this.timer = new Timer();
  }

  /**
   * Returns true if field is no bomb
   * @param  {number}  row
   * @param  {number}  col
   * @return {boolean} true = no bomb, false = bomb
   */
  checkNoBomb(row, col) {
    // Error handling
    if (isNaN(row)) {
      const error = new Error('Row is NaN');
      throw error;
    }

    if (isNaN(col)) {
      const error = new Error('Col is NaN');
      throw error;
    }

    if (this.boardArray[row][col] === cBomb) {
      return false;
    }
    return true;
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
    return this.board.isClicked(row, col);
  }

  /**
   * process that runs if a field is clicked
   * @param {number} row
   * @param {number} col
   */
  blockClicked(row, col) {
    // skip if field is not on gamefield
    if (this.skippableBlock(row, col)) {
      return;
    }

    const { wasBomb, number } = this.board.clickBlock(row, col);

    if (wasBomb) {
      this.bombClicked();
    } else {
      this.fieldClicked(row, col, number);
    }
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
      this.clickFieldsAround(row, col);
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
   * calculates how many bombs are around a field
   * @param  {number} row
   * @param  {number} col
   * @return {number} amount sourrounding bombs
   */
  checkSurroundings(row, col) {
    let amount = 0;
    // row
    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        if (!this.checkNoBomb(row + r, col + c)) {
          amount++;
        }
      }
    }
    return amount;
  }

  /**
   * procedure which sets the game to won
   */
  winGame() {
    if (!this.gameWon) {
      const time = this.timer.getFinishTime();
      console.log('time =>', time);

      // show win button
      $(gameButton).toggleClass('btn-smiley btn-cool');

      // show not flagged bombs as flagged
      for (let i = 0; i < this.bombs; i++) {
        const { row } = this.bombsArray[i];
        const { col } = this.bombsArray[i];

        const field = getID(row, col);

        if (!$(field).hasClass(flagClass)) {
          this.flagField($(field));
        }
      }

      const settings = `${this.rows}x${this.columns}, ${this.bombs} Bombs `;

      showTime(settings, time);
      this.timer.stopTimer();
    }

    this.gameWon = true;
  }

  /**
   * reveals fields around a field with 0 bombs around
   * @param {number} row
   * @param {number} col
   */
  clickFieldsAround(row, col) {
    this.blockClicked(row - 1, col - 1);
    this.blockClicked(row - 1, col);
    this.blockClicked(row - 1, col + 1);

    this.blockClicked(row + 1, col - 1);
    this.blockClicked(row + 1, col);
    this.blockClicked(row + 1, col + 1);

    this.blockClicked(row, col - 1);
    this.blockClicked(row, col + 1);
  }

  /**
   * process that runs if the player clicks on a bomb
   */
  bombClicked() {
    // stop timer
    this.timer.stopTimer();

    // // lock all fields
    // for (let r = 0; r < this.rows; r++) {
    //   for (let c = 0; c < this.columns; c++) {
    //     const id = getID(r, c);
    //     changeClass(id, null, null, true);
    //   }
    // }
  }

  /**
   * clears old Game data
   */
  clearGame() {
    this.timer.stopTimer();
    this.timer.setTimerToZero();
  }
}

export { Game };
