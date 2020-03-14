import createBorder from './createBorder';
import {
  createBlockDiv,
  createRow,
  createRowBorder
} from './createDomElements';

const board = {};

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
  createBorder(cols, 'top');
  generateCentralBoard(rows, cols);
  createBorder(cols, 'middle');
  createBorder(cols, 'bottom');
}
