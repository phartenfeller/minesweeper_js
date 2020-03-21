import { splitNumber } from './util';

class Points {
  /**
   * Constructor
   * @param {number} bombs
   */
  constructor(bombs) {
    this.points = bombs;

    const pointsArray = splitNumber(this.points);

    this.scoreClass(3, pointsArray[0]);
    this.scoreClass(2, pointsArray[1]);
    this.scoreClass(1, pointsArray[2]);
  }

  /**
   * Add one point to the score
   */
  addPoint() {
    this.points++;
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
    this.points--;
    const pointsArray = splitNumber(this.points);

    this.scoreClass(3, pointsArray[0]);
    this.scoreClass(2, pointsArray[1]);
    this.scoreClass(1, pointsArray[2]);

    if (this.points < 0) {
      this.scoreClass(1, '-');
    }
  }

  /**
   * Changes the digit at the points score
   * @param {number} display which of the three digits
   * @param {number} number  number to display
   */
  scoreClass(display, number) {
    number = number === undefined ? 0 : number;
    const pointsID = `#points-${display}`;

    $(pointsID).removeClass('d-');
    for (let i = 0; i <= 9; i++) {
      $(pointsID).removeClass(`sprite-d${i}`);
    }

    // add new class
    $(pointsID).addClass(`sprite-d${number}`);
  }
}

export { Points };
