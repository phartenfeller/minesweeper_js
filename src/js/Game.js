import Board from './board';
import emptyBoard from './board/util/emtyBoard';
import {
  bombClass,
  bombRedClass,
  btnDeadClass,
  btnSmileyClass,
  fieldClass,
  flagClass,
  flags,
  gameButton,
  inputBombs,
  inputColumns,
  inputRows,
  noBombClass
} from './DomObjects.js';
import { Points } from './Points.js';
import { Timer } from './Timer.js';
import { showTime } from './UI.js';
import { changeClass, debugLog, getID, getSelector } from './Util.js';

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

    this.rows;
    this.columns;
    this.bombs;

    this.setupGame();
  }

  /**
   * Setups the game
   */
  setupGame() {
    if (this.board) {
      emptyBoard();
    }

    const iRows = parseInt($(inputRows).val());
    const iCols = parseInt($(inputColumns).val());
    const iBombs = parseInt($(inputBombs).val());

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
   * process that runs if a field is clicked
   * @param {number} row
   * @param {number} col
   * @param {id}     field
   */
  blockClicked(row, col, field = '') {
    const selector = getSelector(row, col);
    field === '' ? (field = getID(row, col)) : field;

    debugLog('block clicked =>', field);

    // skip if field is not on gamefield
    if (row < 0 || row >= this.rows || col < 0 || col >= this.columns) {
      return;
    }

    // if field was not clicked before
    if ($(field).hasClass(fieldClass)) {
      // if this field is a bomb
      if (!this.checkNoBomb(row, col)) {
        this.bombClicked(row, col, selector);
      } else {
        this.fieldClicked(row, col, field, selector);
      }
    }
  }

  /**
   * Clicked on a field
   * @param {number} row
   * @param {number} col
   * @param {id}     field
   * @param {string} selector
   */
  fieldClicked(row, col, field, selector) {
    this.amountFields--;
    const number = this.boardArray[row][col];

    changeClass(selector, fieldClass, `sprite-${number}`, true);

    $(field).attr('data-value', number);

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
   * @param {id} field
   */
  flagField(field) {
    debugLog('Flag field =>', field);

    if ($(field).hasClass(flagClass)) {
      this.points.addPoint();

      changeClass(field, flagClass, fieldClass);
    } else {
      this.points.removePoint();

      changeClass(field, fieldClass, flagClass);
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
   * @param {number} row
   * @param {number} col
   * @param {string} selector
   */
  bombClicked(row, col, selector) {
    debugLog('bomb clicked =>', selector);

    // mark clicked bomb red
    changeClass(selector, fieldClass, bombRedClass, true);

    // stop timer
    this.timer.stopTimer();

    // dead button
    changeClass(gameButton, btnSmileyClass, btnDeadClass);

    // show all other bombs
    for (let i = 0; i < this.bombs; i++) {
      if (this.bombsArray[i].row !== row || this.bombsArray[i].col !== col) {
        const selector = getSelector(
          this.bombsArray[i].row,
          this.bombsArray[i].col
        );
        changeClass(selector, fieldClass, bombClass);
      }
    }

    // set context for each function below
    const game = this;

    // check if all flagged fields are really bombs
    $(flags).each(function() {
      let id = $(this).attr('id');
      const row = parseInt(id.split('-')[0]);
      const col = parseInt(id.split('-')[1]);
      id = `#${id}`;

      // if no bomb
      if (game.checkNoBomb(row, col)) {
        changeClass(id, flagClass, noBombClass);
      }
    });

    // lock all fields
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        const id = getID(r, c);
        changeClass(id, null, null, true);
      }
    }
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
