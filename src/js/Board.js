import {game, gameBar, fieldContainer, gameButton,
  topBorder, middleBorder, bottomBorder} from './DomObjects';

const cBlock = 0;
const cBomb = 'b';
const cFlag = 'f';

const cBlockSize = 16;
const cBorderSize = 10;
/**
 * setups the board
 * @param {number} rows
 * @param {number} cols
 */
function setupBorad(rows, cols) {
  setBoardProperties(rows, cols);

  createBorder(cols, topBorder, 't');
  setupBlocks(rows, cols);
  createBorder(cols, middleBorder, 'i');
  createBorder(cols, bottomBorder, 'b');
}


/**
 * Sets the widths and heights of the board
 * @param {number} rows
 * @param {number} cols
 */
function setBoardProperties(rows, cols) {
  const gameHeight = cBlockSize * rows + 3 * cBorderSize + 32;
  const gameWidth = cBlockSize * cols + 2 * cBorderSize;
  const gameBarWidth = cBlockSize * cols + 2 *cBorderSize;
  const marginL = cBlockSize * cols / 2 - 13 - 49;
  const marginR = cBlockSize * cols / 2 - 13 - 49;

  $(game).css('zoom', 3);
  $(game).css({'height': gameHeight, 'width': gameWidth});
  $(gameBar).css('width', gameBarWidth);
  $(fieldContainer).css('height', cBlockSize * rows);
  $(gameButton).css({'margin-left': marginL, 'margin-right': marginR});

  resetGameButton();
}

function resetGameButton() {
  $(gameButton).removeClass('btn-dead');
  $(gameButton).removeClass('btn-cool');
}

/**
 * Sets the blocks of the Game
 * @param {number} rows
 * @param {number} cols
 */
function setupBlocks(rows, cols) {
  console.log(cols);

  for (let i = 0; i < rows; i++) {
    // create row div
    $(fieldContainer).append(`<div class="row" id="r${i}"></div>`);
    const rowid = '#r' + i;

    // left border
    $(rowid).append('<div class="border-vertical"></div>');

    // blocks loop
    for (let j = 0; j < cols; j++) {
      // block
      const div = `<div id="${i}-${j}" class="block field"></div>`;
      $(rowid).append(div);
    }

    // right border
    $(rowid).append('<div class="border-vertical"></div>');
  }
}

/**
 * Creates vertical Border
 * @param {number} cols
 * @param {id} id
 * @param {string} letter
 */
function createBorder(cols, id, letter) {
  $(id).append(`<div class="border-${letter}l"></div>`);
  for (let i = 1; i <= cols; i++) {
    $(id).append('<div class="border-horizontal"></div>');
  }
  $(id).append(`<div class="border-${letter}r"></div>`);
}

/**
 * Creates a two dimensional array of the board
 * @param  {number} rows
 * @param  {number} cols
 * @param  {array}  bombsArray
 * @return {array}  board array
 */
function createBoardArray(rows, cols, bombsArray) {
  let boardArray = [];

  console.log(cols);

  for (let r = 0; r < rows; r++) {
    boardArray[r] = [];
    for (let c = 0; c < cols; c++) {
      boardArray[r][c] = cBlock;
    }
  }


  for (let i = 0; i < bombsArray.length; i++) {
    const row = bombsArray[i].row;
    const col = bombsArray[i].col;
    boardArray[row][col] = cBomb;
    boardArray = counterUpAround(rows, cols, row, col, boardArray);
  }

  return boardArray;
}

/**
 * Calls to count up all fields around a block
 * @param  {number} boardRows
 * @param  {number} boardCols
 * @param  {number} row
 * @param  {number} col
 * @param  {array}  boardArray
 * @return {array}  boardArray
 */
function counterUpAround(boardRows, boardCols, row, col, boardArray) {
  boardArray = counterUp(boardRows, boardCols, row+1, col-1, boardArray);
  boardArray = counterUp(boardRows, boardCols, row+1, col, boardArray);
  boardArray = counterUp(boardRows, boardCols, row+1, col+1, boardArray);

  boardArray = counterUp(boardRows, boardCols, row, col-1, boardArray);
  boardArray = counterUp(boardRows, boardCols, row, col+1, boardArray);

  boardArray = counterUp(boardRows, boardCols, row-1, col-1, boardArray);
  boardArray = counterUp(boardRows, boardCols, row-1, col, boardArray);
  boardArray = counterUp(boardRows, boardCols, row-1, col+1, boardArray);

  return boardArray;
}

/**
 * Counts up a value in the bomb Array
 * @param  {number} boardRows
 * @param  {number} boardCols
 * @param  {number} row
 * @param  {number} col
 * @param  {array}  boardArray
 * @return {array}  boardArray
 */
function counterUp(boardRows, boardCols, row, col, boardArray) {
  if ( row >= 0 && row < boardRows &&
       col >= 0 && col < boardCols &&
       typeof boardArray[row][col] === 'number') {
    boardArray[row][col] = boardArray[row][col] + 1;
  }

  return boardArray;
}

/**
 * Clears all Dom elements which are dependet of board size
 * to generate them again on a new game
 */
function clearBorad() {
  $(topBorder).empty();
  $(middleBorder).empty();
  $(fieldContainer).empty();
  $(bottomBorder).empty();
}

export {cBlock, cBomb, cFlag, setupBorad, createBoardArray, clearBorad};
