import {Bomb} from './Bomb.js';
import {setupBorad} from './Board.js';
import {Timer} from './Timer.js';
import {Points} from './Points.js';
import {gameButton} from './DomObjects.js';
class Game {
  /**
   * Setups a Game
   * @param {number}  rows
   * @param {number}  columns
   * @param {number}  bombs
   * @param {boolean} debug
   */
  constructor(rows, columns, bombs, debug) {
    this.debugLog('Setting up Game');

    // Game Board
    this.rows = rows;
    this.columns = columns;
    this.debug = debug;
    this.showBombs = debug;
    this.bombs = bombs;

    this.amountFields = this.rows * this.columns - this.bombs;
    this.bombArray = this.createBombs();

    this.gameWon = false;

    this.seconds = 0;

    setupBorad(this.rows, this.columns);

    this.points = new Points(this.bombs);
    this.timer = new Timer();
  }

  /**
   * Randomly creates the Bombs
   * @return {array} Bomb Objects.
   */
  createBombs() {
    const bombArray = [];

    for (let i = 1; i <= this.bombs; i++) {
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
    const bombs = bombArray.length;

    // Error handling
    if (isNaN(row)) {
      const error = new Error('Row is NaN');
      throw error;
    }

    if (isNaN(col)) {
      const error = new Error('Col is NaN');
      throw error;
    }

    for (let i = 0; i < bombs; i++) {
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

    // skip if field is not on gamefield
    if (row < 1 || row > this.rows || col < 1 || col > this.columns) {
      return;
    }

    // if field was not clicked before
    if ($(field).hasClass('field')) {
      // if this field is a bomb
      if (!this.checkNoBomb(row, col)) {
        this.bombClicked(row, col, field);
      } else {
        this.amountFields--;
        const number = this.checkSurroundings(row, col);
        $(field).toggleClass(`field f${number} clicked`);
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
    }
  }

  /**
   * flags a field on rightclick
   * @param {id} field
   */
  flagField(field) {
    if ($(field).hasClass('flag')) {
      this.points.addPoint();
    } else {
      this.points.removePoint();
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
      for (let i=0; i < this.bombs; i++) {
        const row = bombArray[i].row;
        const col = bombArray[i].col;

        const field = this.getID(row, col);

        if (!$(field).hasClass('flag')) {
          this.flagField($(field));
        }
      }

      const msg = this.rows + 'x' + this.columns
                + ', ' + this.bombs + ' Bombs ' + this.seconds;

      // addTime(msg);
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
    this.timer.stopTimer(); // todo

    // dead button
    $(gameButton).toggleClass('btn-smiley btn-dead');

    // show all other bombs
    for (let i = 0; i < this.bombs; i++) {
      if (this.bombArray[i].row !== row || this.bombArray[i].col !== col) {
        const id = this.getID(this.bombArray[i].row, this.bombArray[i].col);
        $(id).toggleClass('field bomb');
      }
    }

    // check if all flagged fields are really bombs
    $('.flag').each(function() {
      const id = '#' + $(this).attr('id');
      const row = parseInt(id.split('-')[0]);
      const col = parseInt(id.split('-')[1]);

      // if no bomb
      if (this.checkNoBomb(row, col)) {
        $(id).toggleClass('flag no-bomb');
      }
    });

    // lock all fields
    for (let r = 1; r <= this.rows; r++) {
      for (let c = 1; c <= this.columns; c++) {
        const id = this.getID(r, c);
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

  clearGame() {
    this.timer.stopTimer();
    this.timer.setTimerToZero();
  }
}


export {Game};
