import domObjects from '../DomObjects';
import { changeClass } from '../util';
import createBorder from './util/createBorder';
import {
  createBlockDiv,
  createRow,
  createRowBorder
} from './util/createDomElements';
import killEventListeners from './util/killEventListeners';
import logBoard from './util/logBoard';
import resetGameButton from './util/resetGameButton';

const BLOCK_SIZE = 16;
const BORDER_SIZE = 10;

export default class Board {
  /**
   * constructor
   * @param {object} props
   */
  constructor({ rows, cols, bombs, domListener }) {
    this.rows = rows;
    this.cols = cols;
    this.bombs = bombs;
    this.domListener = domListener;

    this.board = [...Array(rows)].map(() => Array(cols));
    this.bombsArray = [];
    this.flagArray = [];

    this.gameButton = document.getElementById('game-button');
    this.generateBoard();
  }

  /**
   * Sets the widths and heights of the board
   */
  initBoardProperties() {
    const gameHeight = BLOCK_SIZE * this.rows + 3 * BORDER_SIZE + 32;
    const gameWidth = BLOCK_SIZE * this.cols + 2 * BORDER_SIZE;
    const gameBarWidth = BLOCK_SIZE * this.cols + 2 * BORDER_SIZE;
    const margin = `${(BLOCK_SIZE * this.cols) / 2 - 13 - 49}px`;

    const game = document.getElementById('game');
    game.style.minHeight = `${gameHeight}px`;
    game.style.minWidth = `${gameWidth}px`;

    const gameBar = document.getElementById('gamebar');
    gameBar.style.width = gameBarWidth;

    const fieldContainer = document.getElementById('field-container');
    fieldContainer.style.height = BLOCK_SIZE * this.rows;

    this.gameButton.style.marginLeft = margin;
    this.gameButton.style.marginRight = margin;

    resetGameButton(this.gameButton);
  }

  /**
   * Returns if block is clicked
   * @param {number} row
   * @param {number} col
   */
  isClicked(row, col) {
    return this.board[row][col].clicked;
  }

  /**
   * Returns if block is flagged
   * @param {number} row
   * @param {number} col
   */
  isFlagged(row, col) {
    return this.board[row][col].flagged;
  }

  /**
   * generate blocks for the board
   */
  generateCentralBoard() {
    const fieldContainerElement = document.querySelector('#field-container');
    for (let i = 0; i < this.rows; i += 1) {
      // create row div
      const rowElement = createRow(i);
      fieldContainerElement.appendChild(rowElement);

      // left border
      rowElement.appendChild(createRowBorder());

      // blocks loop
      for (let j = 0; j < this.cols; j += 1) {
        // block
        const div = createBlockDiv(i, j);
        rowElement.appendChild(div);
        this.board[i][j] = {
          domElement: div,
          value: undefined,
          clicked: false,
          flagged: false
        };
      }

      // right border
      rowElement.append(createRowBorder());
    }
  }

  /**
   * Create Bombs
   */
  createBombs() {
    const isUniqueBomb = (row, col) =>
      !this.bombsArray.some(bomb => bomb.row === row && bomb.col === col);

    for (let i = 1; i <= this.bombs; i += 1) {
      let unique = false;
      let randRow;
      let randCol;
      // Generate random Bombs and check if they are unique
      while (!unique) {
        randRow = Math.floor(Math.random() * this.rows);
        randCol = Math.floor(Math.random() * this.cols);

        if (isUniqueBomb(randRow, randCol)) {
          unique = true;
        }
      }

      this.createBomb(randRow, randCol);
      // Add Bomb to the bombsArray
      this.bombsArray.push({ row: randRow, col: randCol });
    }
  }

  /**
   * generate minesweeper board in the dom
   */
  generateBoard() {
    this.initBoardProperties();
    createBorder('top', this);
    this.generateCentralBoard();
    createBorder('middle', this);
    createBorder('bottom', this);
    this.createBombs();
    this.countNumbers();
    logBoard(this.board);
  }

  /**
   * Mark bomb in board object
   * @param {number} row
   * @param {number} col
   */
  createBomb(row, col) {
    console.log({ row, col });
    this.board[row][col].value = 'b';
  }

  /**
   * Marks the values of thee board object, after the bombs are createt
   */
  countNumbers() {
    this.bombsArray.forEach(bomb => {
      this.counterUpAround(bomb.row, bomb.col);
    });
  }

  /**
   * Counts fields around one bomb
   * @param {number} row
   * @param {number} col
   */
  counterUpAround(row, col) {
    this.counterUp(row + 1, col - 1);
    this.counterUp(row + 1, col);
    this.counterUp(row + 1, col + 1);

    this.counterUp(row, col - 1);
    this.counterUp(row, col + 1);

    this.counterUp(row - 1, col - 1);
    this.counterUp(row - 1, col);
    this.counterUp(row - 1, col + 1);
  }

  /**
   * Counts up a value in the bomb Array
   * @param  {number} row
   * @param  {number} col
   * @param  {array}  boardArray
   * @param  {object} boardConfig
   */
  counterUp(row, col) {
    if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
      if (this.board[row][col].value === 'b') return;
      if (!this.board[row][col].value) {
        this.board[row][col].value = 1;
      } else {
        this.board[row][col].value += 1;
      }
    }
  }

  /**
   * Handle click on block
   * @param {number} row
   * @param {number} col
   * @return {boolean} wasBomb
   */
  clickBlock(row, col) {
    const { value, domElement, flagged } = this.board[row][col];
    this.board[row][col].clicked = true;

    if (!flagged && value === 'b') {
      changeClass(
        domElement,
        domObjects.fieldClass,
        domObjects.bombRedClass,
        true
      );
      this.revealBombs();
      this.checkFlags();
      killEventListeners();
      return { wasBomb: true, wasFlag: flagged, number: null };
    }

    changeClass(
      domElement,
      domObjects.fieldClass,
      `sprite-${value || 0}`,
      true
    );
    return { wasBomb: false, number: value || 0 };
  }

  /**
   * Reveal all bombs on the board
   */
  revealBombs() {
    this.bombsArray.forEach(bomb => {
      const { domElement } = this.board[bomb.row][bomb.col];
      changeClass(domElement, domObjects.fieldClass, domObjects.bombClass);
    });
  }

  /**
   * Check if all flagged fields are really bombs
   */
  checkFlags() {
    // check if all flagged fields are really bombs
    this.flagArray.forEach(flag => {
      const { value, domElement } = this.board[flag.row][flag.col];
      if (value !== 'b') {
        changeClass(domElement, domObjects.flagClass, domObjects.noBombClass);
      }
    });
  }

  /**
   * Flag a block on the board
   * @param {number} row
   * @param {number} col
   * @return {boolean} flaggedBefore
   */
  handleFlag(row, col) {
    const { flagged, domElement } = this.board[row][col];
    if (!flagged) {
      this.flagArray.push({ row, col });
      this.board[row][col].flagged = true;
      changeClass(domElement, domObjects.fieldClass, domObjects.flagClass);
      return false;
    }

    // remove flag from flag array
    this.flagArray = this.flagArray.filter(flag => {
      console.log(flag, row, col);
      return !(flag.row === row && flag.col === col);
    });
    this.board[row][col].flagged = false;
    changeClass(domElement, domObjects.flagClass, domObjects.fieldClass);
    const ele = document.querySelector(
      `div.${domObjects.blockClass}[data-row="${row}"][data-col="${col}"]`
    );
    ele.addEventListener('click', this.domListener.handleClick, {
      once: true
    });

    return true;
  }

  /**
   * change board to show that the game is won
   */
  winGame() {
    // show win button
    changeClass(
      this.gameButton,
      domObjects.btnSmileyClass,
      domObjects.btnCoolClass
    );

    // show not flagged bombs as flagged
    this.bombsArray.forEach(bomb => {
      if (!this.board[bomb.row][bomb.col].flagged) {
        this.handleFlag(bomb.row, bomb.col);
      }
    });
  }

  /**
   * Show lose game button
   */
  loseGame() {
    changeClass(
      this.gameButton,
      domObjects.btnSmileyClass,
      domObjects.btnDeadClass
    );
  }
}
