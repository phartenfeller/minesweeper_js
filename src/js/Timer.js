import { splitNumber } from './Util.js';

class Timer {
  /**
   * Constructor
   */
  constructor() {
    this.seconds = 0;
    this.secondsArray = [];

    this.interval = setInterval(() => {
      this.seconds++;

      if (this.seconds === 999) {
        this.stopTimer();
      }

      const secondsArray = splitNumber(this.seconds);

      this.timerClass(3, secondsArray[0]);
      this.timerClass(2, secondsArray[1]);
      this.timerClass(1, secondsArray[2]);
    }, 1000);

    this.startTs = new Date();
  }

  /**
   * Sets one digit of the ingame Timer to a value
   * @param {number} digit
   * @param {number} number
   */
  timerClass(digit, number) {
    number = number === undefined ? 0 : number;
    const timerID = `#timer-${digit}`;
    const currentstate = parseInt(
      $(timerID)
        .attr('class')
        .split('d')[2]
    );

    if (currentstate !== number) {
      for (let i = 0; i <= 9; i++) {
        $(timerID).removeClass(`sprite-d${i}`);
      }
      $(timerID).addClass(`sprite-d${number}`);
    }
  }

  /**
   * Resets the timer
   */
  setTimerToZero() {
    this.timerClass(3, 0);
    this.timerClass(2, 0);
    this.timerClass(1, 0);
  }

  /**
   * Stops the interval
   */
  stopTimer() {
    clearInterval(this.interval);
  }

  /**
   * Gets the time needed to finish for a win
   * @return {number}
   */
  getFinishTime() {
    const currTs = new Date();
    const diff = (currTs - this.startTs) / 1000;

    return diff;
  }
}

export { Timer };
