const createBlockDiv = (row, col) => {
  const blockDiv = document.createElement('div');
  blockDiv.classList.add('block', 'sprite', 'sprite-blank');
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
  borderDiv.classList.add('sprite', 'sprite-border-vertical');
  return borderDiv;
};

module.exports = { createBlockDiv, createRow, createRowBorder };
