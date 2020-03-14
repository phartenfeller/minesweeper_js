import createBorder from './createBorder';
import {
  createBlockDiv,
  createRow,
  createRowBorder
} from './createDomElements';

const board = {};

const BLOCK_SIZE = 16;
const BORDER_SIZE = 10;

/**
 * Resets state of Game button from old game
 * @param {domElement} gameButton
 */
function resetGameButton(gameButton) {
  gameButton.classList.remove('sprite-btn-dead', 'sprite-btn-cool');
  gameButton.classList.add('sprite-btn-smiley');
}

/**
 * Sets the widths and heights of the board
 * @param {number} rows
 * @param {number} cols
 */
function initBoardProperties(rows, cols) {
  const gameHeight = BLOCK_SIZE * rows + 3 * BORDER_SIZE + 32;
  const gameWidth = BLOCK_SIZE * cols + 2 * BORDER_SIZE;
  const gameBarWidth = BLOCK_SIZE * cols + 2 * BORDER_SIZE;
  const margin = `${(BLOCK_SIZE * cols) / 2 - 13 - 49}px`;

  const game = document.getElementById('game');
  game.style.zoom = 3;
  game.style.height = gameHeight;
  game.style.width = gameWidth;

  const gameBar = document.getElementById('gamebar');
  gameBar.style.width = gameBarWidth;

  const fieldContainer = document.getElementById('field-container');
  fieldContainer.style.height = BLOCK_SIZE * rows;

  const gameButton = document.getElementById('game-button');
  gameButton.style.marginLeft = margin;
  gameButton.style.marginRight = margin;

  resetGameButton(gameButton);
}

/**
 * generate blocks for the board
 * @param {number} rows
 * @param {number} cols
 */
function generateCentralBoard(rows, cols) {
  const fieldContainerElement = document.querySelector('#field-container');
  for (let i = 0; i < rows; i++) {
    // create row div
    const rowElement = createRow(i);
    fieldContainerElement.appendChild(rowElement);

    // left border
    rowElement.appendChild(createRowBorder());

    // blocks loop
    for (let j = 0; j < cols; j++) {
      // block
      const div = createBlockDiv(i, j);
      rowElement.appendChild(div);
      board[`${i}-${j}`] = {
        domElement: div,
        value: undefined,
        clicked: false
      };
    }

    // right border
    rowElement.append(createRowBorder());
  }
  console.log(board);
}

/**
 * generate minesweeper board in the dom
 * @param {number} rows
 * @param {number} cols
 */
export default function generateBoard(rows, cols) {
  initBoardProperties(cols, rows);
  createBorder(cols, 'top');
  generateCentralBoard(rows, cols);
  createBorder(cols, 'middle');
  createBorder(cols, 'bottom');
}
