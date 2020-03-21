import { splitNumber, changeClass } from './util';

const allDigits = [
  'sprite-d0',
  'sprite-d1',
  'sprite-d2',
  'sprite-d3',
  'sprite-d4',
  'sprite-d5',
  'sprite-d6',
  'sprite-d7',
  'sprite-d8',
  'sprite-d9'
];
class Timer {
  /**
   * Constructor
   */
  constructor() {
    this.seconds = 0;
    this.secondsArray = [];

    this.initTimerDomElements();

    this.interval = setInterval(() => {
      this.seconds += 1;

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
   * Get Timer Dom Elements
   */
  initTimerDomElements() {
    this.domElements = {};
    for (let i = 0; i <= 2; i += 1) {
      const domElement = document.getElementById(`timer-${i + 1}`);
      this.domElements[i + 1] = { domElement, value: 0 };
    }
  }

  /**
   * Sets one digit of the ingame Timer to a value
   * @param {number} digit
   * @param {number} num
   */
  timerClass(digit, num) {
    const number = num || 0;
    console.log({ digit, number });
    const { domElement, value } = this.domElements[digit];

    if (value !== number) {
      domElement.classList.remove(`sprite-d${value}`);
      domElement.classList.add(`sprite-d${number}`);
      this.domElements[digit].value = number;
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

export default Timer;
