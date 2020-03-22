import { splitNumber } from './util';

class Points {
  /**
   * Constructor
   * @param {number} bombs
   */
  constructor(bombs) {
    this.points = bombs;

    this.initPontDomElements();

    const pointsArray = splitNumber(this.points);

    this.scoreClass(3, pointsArray[0]);
    this.scoreClass(2, pointsArray[1]);
    this.scoreClass(1, pointsArray[2]);
  }

  /**
   * Get Timer Dom Elements
   */
  initPontDomElements() {
    this.domElements = {};
    for (let i = 0; i <= 2; i += 1) {
      const domElement = document.getElementById(`points-${i + 1}`);
      this.domElements[i + 1] = { domElement, value: undefined };
    }
  }

  /**
   * Add one point to the score
   */
  addPoint() {
    this.points += 1;
    const pointsArray = splitNumber(this.points);

    this.scoreClass(3, pointsArray[0]);
    this.scoreClass(2, pointsArray[1]);
    this.scoreClass(1, pointsArray[2]);

    if (this.points < 0) {
      this.scoreClass(1, '-');
    }
  }

  /**
   * Remove one point from the score
   */
  removePoint() {
    this.points -= 1;
    const pointsArray = splitNumber(this.points);

    this.scoreClass(3, pointsArray[0]);
    this.scoreClass(2, pointsArray[1]);

    if (this.points < 0) {
      this.scoreClass(1, '-');
    } else {
      this.scoreClass(1, pointsArray[2]);
    }
  }

  /**
   * Changes the digit at the points score
   * @param {number} display which of the three digits
   * @param {number} num  number to display
   */
  scoreClass(display, num) {
    const number = num || 0;
    console.log({ display, number, domElements: this.domElements });
    const { domElement, value } = this.domElements[display];

    if (value !== number) {
      domElement.classList.remove(`sprite-d${value}`);
      domElement.classList.add(`sprite-d${number}`);
      this.domElements[display].value = number;
    }
  }
}

export default Points;
