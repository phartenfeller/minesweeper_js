const debug = true;
const showBombs = false;

const rows = 10;
const columns = 10;
const bombs = 10;
let amountFields = rows * columns - bombs;
let bombArray = [];
let points = bombs;
let gameWon = false;

class Bomb{
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
}

// Function that runs on page load and setups game
$( document ).ready(function() {

    // set width an height of game
    //                       rows * 16xp                2 * border
    $("#game").css({"height":16*rows + 2*10, "width":16*rows + 2*10});
    $("#gamebar").css("width",16*rows + 2*10);

    // button and timer                 half of the rows - half of button - lenth of first timer
    $("#game-button").css({"margin-left":16*rows/2 - 13 - 49, "margin-right":16*rows/2 - 13 - 49})

    //create field
    createField();
    createBombs();
    setupPoints();

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
      $("#game-button").toggleClass('btn-smiley btn-wow')
    });

    $("#game-button").mousedown(function() {
      $("#game-button").toggleClass('btn-smiley btn-click')
    })

    $(document).mouseup(function () {
      if($("#game-button").hasClass("btn-wow")) {
        $("#game-button").toggleClass('btn-smiley btn-wow');
      }

      if($("#game-button").hasClass("btn-click")) {
        $("#game-button").toggleClass('btn-smiley btn-click')
      }

    })
});

// Setup Functions
function createField() {
  // top border
  // corner left
  $(".top-border").append('<div class="border-tl"></div>') 
  // middle border
    for(i=1; i<=rows; i++) {
      $(".top-border").append('<div class="border-horizontal"></div>'); 
    }
  // corner right
  $(".top-border").append('<div class="border-tr"></div>') 

  // gamebar border
  $("#gamebar").prepend('<div class="border-vertical-32" style="float:left"></div>');
  $("#gamebar").append('<div class="border-vertical-32" style="float:right"></div>');

    // middle border
        //bottom border
    $("#game").append('<div class="middle-border"></div>');
        // corner left
    $(".middle-border").append('<div class="border-il"></div>') 
        // middle border
    for(i=1; i<=rows; i++) {
        $(".middle-border").append('<div class="border-horizontal"></div>'); 
    }
        // corner right
    $(".middle-border").append('<div class="border-ir"></div>') 


    for(i=1; i<=rows; i++) {
        // row
        $("#game").append('<div class="row" id="r' + i + '"></div>');
        rowid = '#r'+i;
        //left border
        $(rowid).append('<div class="border-vertical"></div>');
        for(j=1; j<=columns; j++) {
            // block
            $(rowid).append('<div id="'+i+'-'+j+'" class="block field"></div>');
        }
        // right border
        $(rowid).append('<div class="border-vertical"></div>');
    }

    //bottom border
    $("#game").append('<div class="bottom-border"></div>');
        // corner left
    $(".bottom-border").append('<div class="border-bl"></div>') 
        // middle border
    for(i=1; i<=rows; i++) {
        $(".bottom-border").append('<div class="border-horizontal"></div>'); 
    }
        // corner right
    $(".bottom-border").append('<div class="border-br"></div>') 
}

function createBombs() {
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
    debugLog(bombArray);
}

// Game Functions

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
            return false
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
        // if normal field
        else {
            amountFields--;
            number = checkSurroundings(row, col);
            $(field).toggleClass('field f' + number + ' clicked');

            if (number === 0) {
                clickFieldsAround(row, col);
            }
            
            // win game
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
  $("#game-button").toggleClass("btn-smiley btn-cool")

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
    $("#game-button").toggleClass("btn-smiley btn-dead");

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

// Timer
seconds = 0;
var setInterval = setInterval(function() {
  seconds++;

  if (seconds === 999) {
    stopTimer();
  }

  secondsArray = splitNumber(seconds);

  timerClass(3, secondsArray[0]);
  timerClass(2, secondsArray[1]);
  timerClass(1, secondsArray[2]);
}, 1000);

function timerClass(digit, number) {
  number = (number === undefined) ? 0 : number;
  timerID = "#timer-" + digit

  currentstate = parseInt($(timerID).attr('class').split('d')[2]);
  if(currentstate !== number) {
    for(i=0; i<=9; i++) {
      $(timerID).removeClass("d" + i);
    }
    $(timerID).addClass("d" + number);
  }
}

function stopTimer() {
  clearInterval(setInterval);
}

//points display
function setupPoints() {
  pointsArray = splitNumber(points);

  pointerClass(3, pointsArray[0]);
  pointerClass(2, pointsArray[1]);
  pointerClass(1, pointsArray[2]);
}

function addPoint() {
  points++;
  pointsArray = splitNumber(points);

  pointerClass(3, pointsArray[0]);
  pointerClass(2, pointsArray[1]);
  pointerClass(1, pointsArray[2]);

  if (points < 0) {
    pointerClass(1, "-");
  }
}

function removePoint() {
  points--;
  pointsArray = splitNumber(points);

  pointerClass(3, pointsArray[0]);
  pointerClass(2, pointsArray[1]);
  pointerClass(1, pointsArray[2]);

  if (points < 0) {
    pointerClass(1, "-");
  }
}

function pointerClass(display, number) {
  number = (number === undefined) ? 0 : number;
  pointsID = "#points-" + display;

  $(pointsID).removeClass("d-");
  for(i=0; i<=9; i++) {
    $(pointsID).removeClass("d" + i);
  }
  
  // add new class
  $(pointsID).addClass("d" + number);
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
