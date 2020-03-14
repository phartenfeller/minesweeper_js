import { createBlockDiv, createBorder, createRow } from './createDomElements';

let boardArray;

/**
 * Initializes an array which contains html divs of the block
 * @param {number} rows
 * @param {number} cols
 */
function initBoardArray(rows, cols) {
  boardArray = [...Array(rows)].map(e => Array(cols));
}

/**
 * generate minesweeper board in the dom
 * @param {number} rows
 * @param {number} cols
 */
export default function generateBoard(rows, cols) {
  initBoardArray(rows, cols);
  const fieldContainerElement = document.querySelector('#field-container');
  for (let i = 0; i < rows; i++) {
    // create row div
    const rowElement = createRow(i);
    fieldContainerElement.appendChild(rowElement);

    // left border
    rowElement.appendChild(createBorder());

    // blocks loop
    for (let j = 0; j < cols; j++) {
      // block
      const div = createBlockDiv(i, j);
      rowElement.appendChild(div);
      boardArray[i][j] = div;
    }

    // right border
    rowElement.append(createBorder());
  }
}
