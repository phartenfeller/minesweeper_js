const debug = true;
const showBombs = false;

const rows = 10;
const columns = 10;
const bombs = 10;
let amountFields = rows * columns - bombs;
let bombArray = [];

class Bomb{
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
}

// Function that runs on page load and setups game
$( document ).ready(function() {

    // set width an height of game
    $("#game").css({"height":16*rows, "width":16*rows});

    //create field
    for(i=1; i<=rows; i++) {
        $("#game").append('<div class="row" id="r' + i + '"></div>');
        rowid = '#r'+i;
        for(j=1; j<=columns; j++) {
            $(rowid).append('<div id="'+i+'-'+j+'" class="block field"></div>');
        }
    }

    createBombs();

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
});

// Setup Functions
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

            if (amountFields === 0) {
              $("#game").append("<div>Congratulations! You won in " + seconds + " seconds!</div>")
              stopTimer();
            }
        }
    }
}

// flags a field on rightclick
function flagField(field) {
    $(field).toggleClass('field flag');
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

    // show all other bombs
    for(i=0; i<bombs; i++) {
        console.log(i, bombs);
        console.log(bombArray[i].row + " : " + row +  "   |   " +  bombArray[i].col + " : " + col);
        if (bombArray[i].row !== row || bombArray[i].col !== col) {
            id = getID(bombArray[i].row, bombArray[i].col);
            console.log(id);
            $(id).toggleClass('field bomb');
        }
    }

    //check if all flagged fields are really bombs
    $(".flag").each(function() {
        id = "#" + $(this).attr('id');
        row = parseInt(id.split("-")[0]);
        col = parseInt(id.split("-")[1]);

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

  num = seconds;
  secondsArray = [];

  while (num > 0) {
    secondsArray[secondsArray.length] = num % 10;
    num = parseInt(num / 10);
  }

  digitClass(3, secondsArray[0]);
  digitClass(2, secondsArray[1]);
  digitClass(1, secondsArray[2]);
}, 1000);

function digitClass(digit, number) {
  number = (number === undefined) ? 0 : number;
  digitID = "#digit-" + digit

  currentstate = parseInt($(digitID).attr('class').split('d')[2]);
  if(currentstate !== number) {
    for(i=0; i<=9; i++) {
      $(digitID).removeClass("d" + i);
    }
    $(digitID).addClass("d" + number);
  }
}

function stopTimer() {
  clearInterval(setInterval);
}