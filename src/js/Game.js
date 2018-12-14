import {addPoint, removePoint} from './Points.js';
import {Bomb} from './Bomb.js';
import {setupBorad} from './Board.js';
class Game {
  /**
   * Setups a Game
   * @param {number}  rows
   * @param {number}  columns
   * @param {number}  amountBombs
   * @param {boolean} debug
   */
  constructor(rows, columns, amountBombs, debug) {
    this.debugLog('Setting up Game');

    // Game Board
    this.rows = rows;
    this.columns = columns;
    this.debug = debug;
    this.showBombs = debug;
    this.amountBombs = amountBombs;

    this.amountFields = this.rows * this.columns - this.amountBombs;
    this.bombArray = this.createBombs();

    this.gameWon = false;
    this.seconds = 0;

    setupBorad(this.rows, this.columns);
  }

  /**
   * Randomly creates the Bombs
   * @return {array} Bomb Objects.
   */
  createBombs() {
    const bombArray = [];

    for (let i = 1; i <= this.amountBombs; i++) {
      let uniqueBomb = false;
      let randRow;
      let randCol;
      // Generate random Bombs and check if they are unique
      while (!uniqueBomb) {
        randRow = Math.floor(Math.random() * this.rows) + 1;
        randCol = Math.floor(Math.random() * this.columns) + 1;

        if (this.checkNoBomb(randRow, randCol, bombArray)) {
          uniqueBomb = true;
        }
      }

      // Add Bomb to the bombArray
      bombArray.push(new Bomb(randRow, randCol));

      // Debug
      if (this.showBombs) {
        const block = '#' + randRow + '-' + randCol;
        $(block).toggleClass('field bomb');
      }
    }

    this.debugLog(bombArray);

    return bombArray;
  }

  /**
   * Returns true if field is no bomb
   * @param  {number}  row
   * @param  {number}  col
   * @param  {array}   bombArray
   * @return {boolean} true = no bomb, false = bomb
   */
  checkNoBomb(row, col, bombArray = this.bombArray) {
    const amountBombs = bombArray.length;

    // Error handling
    if (isNaN(row)) {
      const error = new Error('Row is NaN');
      throw error;
    }

    if (isNaN(col)) {
      const error = new Error('Col is NaN');
      throw error;
    }

    for (let i = 0; i < amountBombs; i++) {
      if (bombArray[i].row === row && bombArray[i].col === col) {
        return false;
      }
    }
    return true;
  }

  /**
   * process that runs if a field is clicked
   * @param {number} row
   * @param {number} col
   * @param {id}     field
   */
  fieldClicked(row, col, field = '') {
    if (field === '') {
      field = this.getID(row, col);
    }

    // returns if field is not on gamefield
    // skip fields that are not on gamefield
    if (row < 1 || row > rows || col < 1 || col > columns) {
      return;
    }

    // if field was not clicked before
    if (field.hasClass('field')) {
      // if this field is a bomb
      if (!checkNoBomb(row, col)) {
        bombClicked(row, col, field);
      } else {
        this.amountFields--;
        const number = this.checkSurroundings(row, col);
        $(field).toggleClass('field f' + number + ' clicked');
        $(field).attr('data-value', number);

        // if zero bombs around reveal the fields around
        if (number === 0) {
          this.clickFieldsAround(row, col);
        }

        // win game when all fields which are not bombs are clicked
        if (this.amountFields === 0) {
          winGame();
        }
      }
    }
  }

  /**
   * flags a field on rightclick
   * @param {id} field
   */
  flagField(field) {
    if ($(field).hasClass('flag')) {
      addPoint(); // todo
    } else {
      removePoint(); // todo
    }

    $(field).toggleClass('field flag');
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
      for (let c =- 1; c <= 1; c++) {
        if (!this.checkNoBomb(row+r, col+c)) {
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
      // show win button
      $(gameButton).toggleClass('btn-smiley btn-cool');

      // show not flagged bombs as flagged
      for (let i=0; i < bombs; i++) {
        const row = bombArray[i].row;
        const col = bombArray[i].col;

        const field = getID(row, col);

        if (!$(field).hasClass('flag')) {
          flagField($(field));
        }
      }

      const msg = this.rows + 'x' + this.columns
                + ', ' + this.bombs + ' Bombs ' + this.seconds;

      addTime(msg);
      stopTimer(); // todo
    }

    this.gameWon = true;
  }

  /**
   * reveals fields around a field with 0 bombs around
   * @param {number} row
   * @param {number} col
   */
  clickFieldsAround(row, col) {
    this.fieldClicked(row - 1, col - 1);
    this.fieldClicked(row - 1, col);
    this.fieldClicked(row - 1, col + 1);

    this.fieldClicked(row + 1, col - 1);
    this.fieldClicked(row + 1, col);
    this.fieldClicked(row + 1, col + 1);

    this.fieldClicked(row, col - 1);
    this.fieldClicked(row, col + 1);
  }

  /**
   * process that runs if the player clicks on a bomb
   * @param {number} row
   * @param {number} col
   * @param {field} field
   */
  bombClicked(row, col, field) {
    // mark clicked bomb red
    $(field).toggleClass('field bomb-red clicked');

    // stop timer
    stopTimer(); // todo

    // dead button
    $(gameButton).toggleClass('btn-smiley btn-dead');

    // show all other bombs
    for (let i = 0; i < bombs; i++) {
      if (bombArray[i].row !== row || bombArray[i].col !== col) {
        const id = getID(bombArray[i].row, bombArray[i].col);
        $(id).toggleClass('field bomb');
      }
    }

    // check if all flagged fields are really bombs
    $('.flag').each(function() {
      let id = $(this).attr('id');
      const row = parseInt(id.split('-')[0]);
      const col = parseInt(id.split('-')[1]);

      id = '#' + id;

      // if no bomb
      if (this.checkNoBomb(row, col)) {
        $(id).toggleClass('flag no-bomb');
      }
    });

    // lock all fields
    for (let r = 1; r <= rows; r++) {
      for (let c = 1; c <= columns; c++) {
        const id = getID(r, c);
        $(id).addClass('clicked');
      }
    }
  }

  /**
   * returns the id corresponding to row and col
   * @param  {number} row
   * @param  {number} col
   * @return {id}
   */
  getID(row, col) {
    return '#' + row + '-' + col;
  }

  /**
   * Logs if debug is on
   * @param {string} message
   */
  debugLog(message) {
    if (this.debug) {
      console.log(message);
    }
  }
}


export {Game};
