import {Game} from './src/js/Game.js';

const debug = true;

let rows = 10;
let columns = 10;
let bombs = 10;

// Function that runs on page load and setups game
$( document ).ready(function() {
  // bindJquerys();
  const game = new Game(rows, columns, bombs, debug);
  // initUIFunctions();
  // initSettingsFunctions();
});

/*
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
*/

