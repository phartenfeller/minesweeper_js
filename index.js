import {resetTimer, startTimer, timerClass, stopTimer, setTimerToZero} from './src/js/Timer.js';
import {initUIFunctions, initFieldFunctions, initSettingsFunctions, resetButton, bindJquerys, setZoom, splitNumber, addTime} from './src/js/UI.js';
import {setupPoints} from './src/js/Points.js';
import {setAmountFields, createBombs, checkBomb, fieldClicked, flagField, checkSurroundings, winGame, clickFieldsAround, bombClicked, getID} from './src/js/Game.js';
import {createField} from './src/js/Field.js';

const debug = true;
const showBombs = false;

let rows = 10;
let columns = 10;
let bombs = 10;

let bombArray = [];
let gameWon = false;


// Function that runs on page load and setups game
$( document ).ready(function() {
  $(game).css('zoom', 3);
  bindJquerys();
  newGame();
  initUIFunctions();
  initSettingsFunctions();
});

function newGame() {
  createField();
  setZoom();
  createBombs();
  setupPoints();
  initFieldFunctions();
  setAmountFields();
  resetButton();
  gameWon = false;
  resetTimer();
}

function deleteGame() {
  $(topBorder).empty();
  $(middleBorder).empty();
  $(fieldContainer).empty();
  $(bottomBorder).empty();
}

function resetGame() {
  deleteGame();
  rows = parseInt($(inputRows).val());
  columns = parseInt($(inputColumns).val());
  bombs = parseInt($(inputBombs).val());

  if (rows < 8) {
    rows = 8;
    $(inputRows).val(8);
  }

  if (columns < 8) {
    columns = 8;
    $(inputColumns).val(8);
  }

  if (bombs < 1) {
    bombs = 1;
    $(inputBombs).val(1);
  }

  newGame();
}

// Debug Log
function debugLog(message) {
  if (debug) {
    console.log(message);
  }
}
