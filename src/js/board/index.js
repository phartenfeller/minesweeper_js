import { createBlockDiv, createBorder, createRow } from './createDomElements';

const board = {};

/**
 * generate minesweeper board in the dom
 * @param {number} rows
 * @param {number} cols
 */
export default function generateBoard(rows, cols) {
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
      board[`${i}-${j}`] = {
        domElement: div,
        value: undefined,
        clicked: false
      };
    }

    // right border
    rowElement.append(createBorder());
  }
  console.log(board);
}
