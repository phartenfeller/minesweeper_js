import {splitNumber} from './Util.js';

class Points {
  constructor(bombs) {
    this.points = bombs;

    const pointsArray = splitNumber(this.points);

    this.pointerClass(3, pointsArray[0]);
    this.pointerClass(2, pointsArray[1]);
    this.pointerClass(1, pointsArray[2]);
  }

  addPoint() {
    this.points++;
    const pointsArray = splitNumber(this.points);

    this.pointerClass(3, pointsArray[0]);
    this.pointerClass(2, pointsArray[1]);
    this.pointerClass(1, pointsArray[2]);

    if (this.points < 0) {
      this.pointerClass(1, '-');
    }
  }

  removePoint() {
    this.points--;
    const pointsArray = splitNumber(this.points);

    this.pointerClass(3, pointsArray[0]);
    this.pointerClass(2, pointsArray[1]);
    this.pointerClass(1, pointsArray[2]);

    if (this.points < 0) {
      this.pointerClass(1, '-');
    }
  }

  pointerClass(display, number) {
    number = (number === undefined) ? 0 : number;
    const pointsID = `#points-${display}`;

    $(pointsID).removeClass('d-');
    for (let i = 0; i <= 9; i++) {
      $(pointsID).removeClass(`d${i}`);
    }

    // add new class
    $(pointsID).addClass(`d${number}`);
  }
}

export {Points};
