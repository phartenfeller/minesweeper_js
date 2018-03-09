const blockSize = 16
const borderSize = 10

function createField() {
    // set width an height of game
    $("#game").css({"height":blockSize*rows + 2*borderSize, "width":blockSize*rows + 2*borderSize});
    $("#gamebar").css("width",blockSize*rows + 2*borderSize);

    // button and timer                 half of the rows - half of button - lenth of first timer
    $("#game-button").css({"margin-left":blockSize*rows/2 - 13 - 49, "margin-right":blockSize*rows/2 - 13 - 49})

  createTopBorder();
  createMiddleBorder();
  createBlocks();
  createBottomBorder();
}

function createBlocks() {
  for(i=1; i<=rows; i++) {
    // create row div
    $("#field-container").append('<div class="row" id="r' + i + '"></div>');
    rowid = '#r'+i;

    //left border
    $(rowid).append('<div class="border-vertical"></div>');

    //blocks loop
    for(j=1; j<=columns; j++) {
        // block
        $(rowid).append('<div id="'+i+'-'+j+'" class="block field"></div>');
    }

    // right border
    $(rowid).append('<div class="border-vertical"></div>');
  }
}

function createTopBorder() {
  topBorder = $(".top-border");

  $(topBorder).append('<div class="border-tl"></div>');
  for(i=1; i<=rows; i++) {
    $(topBorder).append('<div class="border-horizontal"></div>'); 
  }
  $(topBorder).append('<div class="border-tr"></div>');
}

function createMiddleBorder() {
  middleBorder = $(".middle-border");
  
  $(middleBorder).append('<div class="border-il"></div>');
  for(i=1; i<=rows; i++) {
    $(middleBorder).append('<div class="border-horizontal"></div>'); 
  }
  $(middleBorder).append('<div class="border-ir"></div>');
}

function createBottomBorder() {
  bottomBorder = $(".bottom-border");

  $(bottomBorder).append('<div class="border-bl"></div>');
  for(i=1; i<=rows; i++) {
    $(bottomBorder).append('<div class="border-horizontal"></div>'); 
  }
  $(bottomBorder).append('<div class="border-br"></div>');
}
