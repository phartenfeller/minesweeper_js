const debug = true;
const showBombs = false;

let rows = 10;
let columns = 10;
let bombs = 10;

let bombArray = [];
let gameWon = false;

class Bomb{
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
}

// Function that runs on page load and setups game
$( document ).ready(function() {
    bindJquerys();
    newGame();  
    initGameButtonFunctions();
    initSettingsFunctions();
});

function newGame() {
  createField();
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
  rows = $("#input-rows").val();
  columns = $("#input-columns").val();
  bombs = $("#input-bombs").val();
  newGame();
}

// Debug Log
function debugLog(message) {
  if(debug) {
    console.log(message);
  }
}