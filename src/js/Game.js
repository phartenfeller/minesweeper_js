import {Bomb} from './Bomb.js';
import {setupBorad, clearBorad} from './Board.js';
import {Timer} from './Timer.js';
import {Points} from './Points.js';
import {gameButton} from './DomObjects.js';
import {getID} from './Util.js';

const cBlock = 0;
const cBomb = 'b';
const cFlag = 'f';
class Game {
  /**
   * Setups a Game
   * @param {boolean} debug
   */
  constructor(debug = false) {
    this.debugLog('Setting up Game');

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
    clearBorad();

    const inputRows = parseInt($('#input-rows').val());
    const inputCols = parseInt($('#input-columns').val());
    const inputBombs = parseInt($('#input-bombs').val());

    this.rows = inputRows < 8 ? 8 : inputRows;
    this.columns = inputCols < 8 ? 8 : inputCols;
    this.bombs = inputBombs < 1 ? 1 : inputBombs;

    this.amountFields = this.rows * this.columns - this.bombs;
    this.bombsArray = this.createBombs();
    this.boardArray = this.createBoardArray();
    console.log('boardArray =>', this.boardArray);
    this.gameWon = false;

    setupBorad(this.rows, this.columns);

    this.points = new Points(this.bombs);
    this.timer = new Timer();
  }


  /**
   * Randomly creates the Bombs
   * @return {array} Bomb Objects.
   */
  createBombs() {
    const bombsArray = [];

    for (let i = 1; i <= this.bombs; i++) {
      let uniqueBomb = false;
      let randRow;
      let randCol;
      // Generate random Bombs and check if they are unique
      while (!uniqueBomb) {
        randRow = Math.floor(Math.random() * this.rows);
        randCol = Math.floor(Math.random() * this.columns);

        if (!bombsArray.some(bomb => bomb.row === randRow &&
                                     bomb.col === randCol)) {
          uniqueBomb = true;
        }
      }

      // Add Bomb to the bombsArray
      bombsArray.push(new Bomb(randRow, randCol));

      // Debug
      if (this.showBombs) {
        const block = '#' + randRow + '-' + randCol;
        $(block).toggleClass('field bomb');
      }
    }

    this.debugLog(bombsArray);

    return bombsArray;
  }

  /**
   * Creates a two dimensional array of the board
   * @return {array}  board array
   */
  createBoardArray() {
    let boardArray = [];

    for (let r = 0; r < this.rows; r++) {
      boardArray[r] = [];
      for (let c = 0; c < this.columns; c++) {
        boardArray[r][c] = cBlock;
      }
    }


    for (let i = 0; i < this.bombsArray.length; i++) {
      const row = this.bombsArray[i].row;
      const col = this.bombsArray[i].col;
      boardArray[row][col] = cBomb;
      boardArray = this.counterUpAround(row, col, boardArray);
    }

    return boardArray;
  }

  /**
   * Calls to count up all fields around a block
   * @param  {number} row
   * @param  {number} col
   * @param  {array}  boardArray
   * @return {array}  boardArray
   */
  counterUpAround(row, col, boardArray) {
    boardArray = this.counterUp(row+1, col-1, boardArray);
    boardArray = this.counterUp(row+1, col, boardArray);
    boardArray = this.counterUp(row+1, col+1, boardArray);

    boardArray = this.counterUp(row, col-1, boardArray);
    boardArray = this.counterUp(row, col+1, boardArray);

    boardArray = this.counterUp(row-1, col-1, boardArray);
    boardArray = this.counterUp(row-1, col, boardArray);
    boardArray = this.counterUp(row-1, col+1, boardArray);

    return boardArray;
  }

  /**
   * Counts up a value in the bomb Array
   * @param  {number} row
   * @param  {number} col
   * @param  {array}  boardArray
   * @param  {object} boardConfig
   * @return {array}  boardArray
   */
  counterUp(row, col, boardArray) {
    if ( row >= 0 && row < this.rows &&
         col >= 0 && col < this.columns &&
         typeof boardArray[row][col] === 'number') {
      boardArray[row][col] = boardArray[row][col] + 1;
    }

    return boardArray;
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
    } else {
      return true;
    }
  }

  /**
   * process that runs if a field is clicked
   * @param {number} row
   * @param {number} col
   * @param {id}     field
   */
  blockClicked(row, col, field = '') {
    field === '' ? field = getID(row, col) : field;

    // skip if field is not on gamefield
    if (row < 0 || row >= this.rows || col < 0 || col >= this.columns) {
      return;
    }

    // if field was not clicked before
    if ($(field).hasClass('field')) {
      // if this field is a bomb
      if (!this.checkNoBomb(row, col)) {
        this.bombClicked(row, col, field);
      } else {
        this.fieldClicked(row, col, field);
      }
    }
  }

  fieldClicked(row, col, field) {
    this.amountFields--;
    const number = this.boardArray[row][col];
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

  /**
   * flags a field on rightclick
   * @param {id} field
   */
  flagField(field) {
    if ($(field).hasClass('flag')) {
      this.points.addPoint();

      $(field).removeClass('flag');
      $(field).addClass('field');
    } else {
      this.points.removePoint();

      $(field).removeClass('field');
      $(field).addClass('flag');
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
      const time = this.timer.getTime();
      console.log('time =>', time);

      // show win button
      $(gameButton).toggleClass('btn-smiley btn-cool');

      // show not flagged bombs as flagged
      for (let i=0; i < this.bombs; i++) {
        const row = this.bombsArray[i].row;
        const col = this.bombsArray[i].col;

        const field = getID(row, col);

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
   * @param {field} field
   */
  bombClicked(row, col, field) {
    // mark clicked bomb red
    $(field).toggleClass('field bomb-red clicked');

    // stop timer
    this.timer.stopTimer(); // todo

    // dead button
    $(gameButton).removeClass('btn-smiley');
    $(gameButton).addClass('btn-dead');

    // show all other bombs
    for (let i = 0; i < this.bombs; i++) {
      if (this.bombsArray[i].row !== row || this.bombsArray[i].col !== col) {
        const id = getID(this.bombsArray[i].row, this.bombsArray[i].col);
        $(id).toggleClass('field bomb');
      }
    }

    // set context for each function below
    const game = this;

    // check if all flagged fields are really bombs
    $('.flag').each(function() {
      let id = $(this).attr('id');
      console.log('id =>', id);
      const row = parseInt(id.split('-')[0]);
      const col = parseInt(id.split('-')[1]);
      id = '#' + id;

      // if no bomb
      if (game.checkNoBomb(row, col)) {
        $(id).toggleClass('flag no-bomb');
      }
    });

    // lock all fields
    for (let r = 1; r <= this.rows; r++) {
      for (let c = 1; c <= this.columns; c++) {
        const id = getID(r, c);
        $(id).addClass('clicked');
      }
    }
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
