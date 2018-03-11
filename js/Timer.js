let interval;

function resetTimer() {
  seconds = 0;
  stopTimer();
  setTimerToZero();
  startTimer();
}

function startTimer() {
  interval = setInterval(function() {
    seconds++;

    if (seconds === 999) {
      stopTimer();
    }
  
    secondsArray = splitNumber(seconds);
  
    timerClass(3, secondsArray[0]);
    timerClass(2, secondsArray[1]);
    timerClass(1, secondsArray[2]);
  }, 1000);
}

function timerClass(digit, number) {
  number = (number === undefined) ? 0 : number;
  timerID = "#timer-" + digit

  currentstate = parseInt($(timerID).attr('class').split('d')[2]);
  if(currentstate !== number) {
    for(let i=0; i<=9; i++) {
      $(timerID).removeClass("d" + i);
    }
    $(timerID).addClass("d" + number);
  }
}

function stopTimer() {
  clearInterval(interval);
}

function setTimerToZero() {
  timerClass(3, 0);
  timerClass(2, 0);
  timerClass(1, 0);
}
