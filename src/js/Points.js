import { changeClass, splitNumber } from './util';

class Points {
  /**
   * Constructor
   * @param {number} bombs
   */
  constructor(bombs) {
    this.points = bombs;
    this.initPontDomElements();
    this.resetScore();
    this.updateScore();
  }

  /**
   * Get Timer Dom Elements
   */
  initPontDomElements() {
    this.domElements = {};
    for (let i = 0; i <= 2; i += 1) {
      const domElement = document.getElementById(`points-${i + 1}`);
      this.domElements[i + 1] = { domElement, value: 0 };
    }
  }

  /**
   * Update current score display
   */
  updateScore() {
    const points = splitNumber(this.points);

    this.scoreClass(3, points[3]);
    this.scoreClass(2, points[2]);

    if (this.points < 0) {
      this.scoreClass(1, '-minus');
    } else {
      this.scoreClass(1, points[1]);
    }
  }

  /**
   * Add one point to the score
   */
  addPoint() {
    this.points += 1;
    this.updateScore();
  }

  /**
   * Remove one point from the score
   */
  removePoint() {
    this.points -= 1;
    this.updateScore();
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
      changeClass(domElement, `sprite-d${value}`, `sprite-d${number}`);
      this.domElements[display].value = number;
    }
  }

  /**
   * Set all displays to zero at the start of the game
   */
  resetScore() {
    for (let i = 1; i < 4; i += 1) {
      const { domElement } = this.domElements[i];
      for (let j = 0; j < 10; j += 1) {
        domElement.classList.remove(`sprite-d${j}`);
      }
      domElement.classList.add(`sprite-d${0}`);
    }
  }
}

export default Points;
