import {
  game,
  gameBar,
  fieldContainer,
  gameButton,
  topBorder,
  middleBorder,
  bottomBorder,
  blockClass,
} from './DomObjects';

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
  const gameBarWidth = cBlockSize * cols + 2 * cBorderSize;
  const marginL = (cBlockSize * cols) / 2 - 13 - 49;
  const marginR = (cBlockSize * cols) / 2 - 13 - 49;

  $(game).css('zoom', 3);
  $(game).css({ height: gameHeight, width: gameWidth });
  $(gameBar).css('width', gameBarWidth);
  $(fieldContainer).css('height', cBlockSize * rows);
  $(gameButton).css({ 'margin-left': marginL, 'margin-right': marginR });

  resetGameButton();
}

/**
 * Resets state of Game button from old game
 */
function resetGameButton() {
  $(gameButton).removeClass('sprite-btn-dead');
  $(gameButton).removeClass('sprite-btn-cool');
}

/**
 * Sets the blocks of the Game
 * @param {number} rows
 * @param {number} cols
 */
function setupBlocks(rows, cols) {
  for (let i = 0; i < rows; i++) {
    // create row div
    $(fieldContainer).append(`<div class="row" id="r${i}"></div>`);
    const rowid = '#r' + i;

    // left border
    $(rowid).append('<div class="sprite sprite-border-vertical"></div>');

    // blocks loop
    for (let j = 0; j < cols; j++) {
      // block
      const div = `<div id="${i}-${j}" class="${blockClass} sprite sprite-blank"></div>`;
      $(rowid).append(div);
    }

    // right border
    $(rowid).append('<div class="sprite sprite-border-vertical"></div>');
  }
}

/**
 * Creates vertical Border
 * @param {number} cols
 * @param {id} id
 * @param {string} letter
 */
function createBorder(cols, id, letter) {
  $(id).append(`<div class="sprite sprite-border-${letter}l"></div>`);
  for (let i = 1; i <= cols; i++) {
    $(id).append('<div class="sprite sprite-border-horizontal"></div>');
  }
  $(id).append(`<div class="sprite sprite-border-${letter}r"></div>`);
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

export { setupBorad, clearBorad };
