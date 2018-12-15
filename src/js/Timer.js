class Timer {
  constructor() {
    this.seconds = 0;
    this.secondsArray = [];

    this.interval = setInterval(() => {
      this.seconds++;

      if (this.seconds === 999) {
        this.stopTimer();
      }

      const secondsArray = this.splitNumber(this.seconds);

      this.timerClass(3, secondsArray[0]);
      this.timerClass(2, secondsArray[1]);
      this.timerClass(1, secondsArray[2]);
    }, 1000);

    this.startInterval = new Date();
  }

  /**
   * Sets one digit of the ingame Timer to a value
   * @param {number} digit
   * @param {number} number
   */
  timerClass(digit, number) {
    number = (number === undefined) ? 0 : number;
    const timerID = `#timer-${digit}`;
    const currentstate = parseInt($(timerID).attr('class').split('d')[2]);

    if (currentstate !== number) {
      for (let i=0; i<=9; i++) {
        $(timerID).removeClass(`d${i}`);
      }
      $(timerID).addClass(`d${number}`);
    }
  }

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
   * Splits each digit of a number to an array
   * @param  {number} number
   * @return {array}
   */
  splitNumber(number) {
    const numberArray = [];

    number = Math.abs(number);

    while (number > 0) {
      numberArray[numberArray.length] = number % 10;
      number = parseInt(number / 10);
    }

    return numberArray;
  }
}

export {Timer};
