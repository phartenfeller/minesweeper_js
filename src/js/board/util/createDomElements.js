import {
  blockClass,
  fieldClass,
  spriteBorderVerticalClass,
  spriteClass
} from '../../DomObjects';

const createBlockDiv = (row, col) => {
  const blockDiv = document.createElement('div');
  blockDiv.classList.add(blockClass, spriteClass, fieldClass);
  blockDiv.dataset.row = row;
  blockDiv.dataset.col = col;
  return blockDiv;
};

const createRow = row => {
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');
  rowDiv.id = `r${row}`;
  return rowDiv;
};

const createRowBorder = () => {
  const borderDiv = document.createElement('div');
  borderDiv.classList.add(spriteClass, spriteBorderVerticalClass);
  return borderDiv;
};

export { createBlockDiv, createRow, createRowBorder };
