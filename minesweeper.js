const debug = true;
const showBombs = false;

let rows = 10;
let columns = 10;
let bombs = 10;

let amountFields = rows * columns - bombs;
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
    newGame();
    initGameButtonFunctions();
    initSettingsFunctions();
});

function newGame() {
  createField();
  createBombs();
  setupPoints();
  initFieldFunctions();
  resetTimer();
}

function deleteGame() {
  $(".top-border").empty();
  $(".middle-border").empty();
  $("#field-container").empty();
  $(".bottom-border").empty();
}

function resetGame(newRows = 10, newColumns = 10, newBombs = 10) {
  deleteGame();
  rows = newRows;
  columns = newColumns;
  bombs = newBombs;
  newGame();
}

function initFieldFunctions() {
  field = $('.field');
  field.click(function() {
      id = $(this).attr('id');
      row = parseInt(id.split("-")[0]);
      col = parseInt(id.split("-")[1]);
      fieldClicked(row, col, $(this));
  });

  field.on("contextmenu", function() {
      id = $(this).attr('id');
      row = parseInt(id.split("-")[0]);
      col = parseInt(id.split("-")[1]);
      flagField($(this));
  });

  field.mousedown(function() {
    $(gameButton).toggleClass('btn-smiley btn-wow')
  });
}

function initGameButtonFunctions() {
  gameButton = $("#game-button");

  $(gameButton).mousedown(function() {
    $(gameButton).toggleClass('btn-smiley btn-click')
  })

  $(document).mouseup(function () {
    if($(gameButton).hasClass("btn-wow")) {
      $(gameButton).toggleClass('btn-smiley btn-wow');
    }

    if($(gameButton).hasClass("btn-click")) {
      $(gameButton).toggleClass('btn-smiley btn-click')
    }
  })

  $(gameButton).click(function () {
    resetGame();
  })
}

function initSettingsFunctions() {
  $("#settings").click(function() {
    $(".input-container").toggleClass("hidden show");
  });
}

// Setup Functions
function createBombs() {
  bombArray = [];

  for(i=1; i<bombs; i++) {
    uniqueBomb = false;
    // Generate random Bombs and check if they are unique
    while (!uniqueBomb) {
      randRow = Math.floor(Math.random() * columns) + 1;
      randCol = Math.floor(Math.random() * rows) + 1;

      if (checkBomb(randRow, randCol)) {
        uniqueBomb = true;
      }
    }
        
    // Add Bomb to the bombArray
    bombArray.push(new Bomb(randRow, randCol));

    // Debug
    if(showBombs) {
      block = '#' + randRow + '-' + randCol;
      $(block).toggleClass('field bomb');
    }
  }
}

// Returns true if field is no bomb
function checkBomb(row, col) {
  amountBombs = bombArray.length;

  // Error handling
  if(isNaN(row)) {
    error = new Error("Row is NaN");
    throw error;
  } 

  if (isNaN(col)) {
    error = new Error("Col is NaN");
    throw error;
  }

  for(i=0; i<amountBombs; i++) {
    if (bombArray[i].row === row && bombArray[i].col === col) {
      return false;
    }
  }
  return true;
}

// calculates how many bombs are around a field
function checkSurroundings(row, col) {
  number = 0;
  //row
  for(r=-1; r<=1; r++){
    for(c=-1; c<=1; c++) {
      if(!checkBomb(row+r, col+c)) {
        number++;
      }
    }
  }
  return number;
}

// process that runs if a field is clicked
function fieldClicked(row, col, field="") {
  if (field === "") {
    id = getID(row, col);
    field = $(id);
  }

  // returns if field is not on gamefield
  // needed because function cluckFieldsAround() could process fields that are not on gamefield
  if(row < 1 || row > rows || col < 1 || col > columns) {
    return;
  }

  // if field was not clicked before
  if (field.hasClass("field")) {
    // if this field is a bomb
    if(!checkBomb(row, col)) {
      bombClicked(row, col, field);
    }
    // else when normal field
    else {
      amountFields--;
      number = checkSurroundings(row, col);
      $(field).toggleClass('field f' + number + ' clicked');

      // if zero bombs around reveal the fields around
      if (number === 0) {
        clickFieldsAround(row, col);
      }
            
      // win game when all fields which are not bombs are clicked
      if (amountFields === 0) {
        winGame();
      }
    }
  }
}

// flags a field on rightclick
function flagField(field) {
  if ($(field).hasClass('flag')) {
    addPoint();
  }
  else {
    removePoint();
  }

  $(field).toggleClass('field flag');

}

function winGame() {
  if (!gameWon) {
  // show win button
  $(gameButton).toggleClass("btn-smiley btn-cool")

  // show not flagged bombs as flagged
  for(i=0; i<bombs; i++) {
    row = bombArray[i].row;
    col = bombArray[i].col;

    field = getID(row, col);

    if (!$(field).hasClass('flag')) {
      flagField($(field));
    }
  }

  $("#game").append("<div>Congratulations! You won in " + seconds + " seconds!</div>")
  stopTimer();
  }

  gameWon = true;
}


// opens fields around a field with 0 bombs around
function clickFieldsAround(row, col) {
  fieldClicked(row-1, col-1);
  fieldClicked(row-1, col);
  fieldClicked(row-1, col+1);

  fieldClicked(row+1, col-1);
  fieldClicked(row+1, col);
  fieldClicked(row+1, col+1);

  fieldClicked(row, col-1);
  fieldClicked(row, col+1);
}

// process that runs if the player clicks on a bomb
function bombClicked(row, col, field) {
  // mark clicked bomb red
  $(field).toggleClass('field bomb-red clicked');

  // stop timer
  stopTimer();

  // dead button
  $(gameButton).toggleClass("btn-smiley btn-dead");

  // show all other bombs
  for(i=0; i<bombs; i++) {
    if (bombArray[i].row !== row || bombArray[i].col !== col) {
      id = getID(bombArray[i].row, bombArray[i].col);
      $(id).toggleClass('field bomb');
    }
  }

  //check if all flagged fields are really bombs
  $(".flag").each(function() {
    id = $(this).attr('id');
    row = parseInt(id.split("-")[0]);
    col = parseInt(id.split("-")[1]);

    id = "#" + id;

    // if no bomb
    if (checkBomb(row, col)) {
      $(id).toggleClass('flag no-bomb');
    }
  });

  // lock all fields
  for(r=1; r<= rows; r++) {
    for(c=1; c<= columns; c++) {
      id = getID(r, c);
      $(id).addClass("clicked");
    }
  }
}

// Debug Log
function debugLog(message) {
  if(debug) {
    console.log(message);
  }
}

// returns the ID of a field
function getID(row, col) {
  return "#" + row + "-" + col;
}

// DisplayFunctions
function splitNumber(number) {
  numberArray = []

  number = Math.abs(number);

  while (number > 0) {
    numberArray[numberArray.length] = number % 10;
    number = parseInt(number / 10);
  }

  return numberArray;
}
