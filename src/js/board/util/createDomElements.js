const createBlockDiv = board => {
  const blockDiv = document.createElement('div');
  blockDiv.classList.add('block', 'sprite', 'sprite-blank');
  blockDiv.dataset.row = board.row;
  blockDiv.dataset.col = board.col;
  return blockDiv;
};

const createRow = board => {
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');
  rowDiv.id = `r${board.row}`;
  return rowDiv;
};

const createRowBorder = () => {
  const borderDiv = document.createElement('div');
  borderDiv.classList.add('sprite', 'sprite-border-vertical');
  return borderDiv;
};

module.exports = { createBlockDiv, createRow, createRowBorder };
