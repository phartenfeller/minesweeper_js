const borders = {
  top: { letter: 't', rootElementId: '#top-border' },
  middle: { letter: 'i', rootElementId: '#middle-border' },
  bottom: { letter: 'b', rootElementId: '#bottom-border' }
};

/**
 * Creates top middle or bottom borderline
 * @param {number} cols
 * @param {string} border
 */
export default function createBorder(cols, border) {
  const letter = borders[border].letter;
  console.log('letter');
  const rootElement = document.querySelector(borders[border].rootElementId);

  const borderDivLeft = document.createElement('div');
  borderDivLeft.classList.add('sprite', `sprite-border-${letter}l`);
  rootElement.appendChild(borderDivLeft);

  for (let i = 1; i <= cols; i++) {
    const borderDivMiddle = document.createElement('div');
    borderDivMiddle.classList.add('sprite', 'sprite-border-horizontal');
    rootElement.appendChild(borderDivMiddle);
  }

  const borderDivRight = document.createElement('div');
  borderDivRight.classList.add('sprite', `sprite-border-${letter}r`);
  rootElement.appendChild(borderDivRight);
}
