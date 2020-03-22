const borders = {
  top: { letter: 't', rootElementId: '#top-border' },
  middle: { letter: 'i', rootElementId: '#middle-border' },
  bottom: { letter: 'b', rootElementId: '#bottom-border' }
};

/**
 * Creates top middle or bottom borderline
 * @param {string} border
 * @param {Board} board
 */
export default function createBorder(border, board) {
  const { letter } = borders[border];
  const rootElement = document.querySelector(borders[border].rootElementId);

  const borderDivLeft = document.createElement('div');
  borderDivLeft.classList.add('sprite', `sprite-border-${letter}l`);
  rootElement.appendChild(borderDivLeft);

  for (let i = 1; i <= board.cols; i += 1) {
    const borderDivMiddle = document.createElement('div');
    borderDivMiddle.classList.add('sprite', 'sprite-border-horizontal');
    rootElement.appendChild(borderDivMiddle);
  }

  const borderDivRight = document.createElement('div');
  borderDivRight.classList.add('sprite', `sprite-border-${letter}r`);
  rootElement.appendChild(borderDivRight);
}
