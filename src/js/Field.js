const blockSize = 16;
const borderSize = 10;

function createField() {
  // set width an height of game
  gameHeight = blockSize*rows + 3*borderSize + 32;
  gameWidth = blockSize*columns + 2*borderSize;
  $('#game').css({'height': gameHeight, 'width': gameWidth});
  $('#gamebar').css('width', blockSize*columns + 2*borderSize);
  $(fieldContainer).css('height', blockSize*rows);

  // button and timer               half of the columns - half of button - lenth of first timer
  $(gameButton).css({'margin-left': blockSize * columns / 2 - 13 - 49, 'margin-right': blockSize * columns / 2 - 13 - 49});

  createTopBorder();
  createMiddleBorder();
  createBlocks();
  createBottomBorder();
}

function createBlocks() {
  for (let i = 1; i <= rows; i++) {
    // create row div
    $(fieldContainer).append('<div class="row" id="r' + i + '"></div>');
    rowid = '#r' + i;

    // left border
    $(rowid).append('<div class="border-vertical"></div>');

    // blocks loop
    for (let j = 1; j <= columns; j++) {
      // block
      $(rowid).append('<div id="' + i + '-' + j +'" class="block field"></div>');
    }

    // right border
    $(rowid).append('<div class="border-vertical"></div>');
  }
}

function createTopBorder() {
  $(topBorder).append('<div class="border-tl"></div>');
  for (i = 1; i <= columns; i++) {
    $(topBorder).append('<div class="border-horizontal"></div>');
  }
  $(topBorder).append('<div class="border-tr"></div>');
}

function createMiddleBorder() {
  $(middleBorder).append('<div class="border-il"></div>');
  for (i = 1; i <= columns; i++) {
    $(middleBorder).append('<div class="border-horizontal"></div>');
  }
  $(middleBorder).append('<div class="border-ir"></div>');
}

function createBottomBorder() {
  $(bottomBorder).append('<div class="border-bl"></div>');
  for (i = 1; i <= columns; i++) {
    $(bottomBorder).append('<div class="border-horizontal"></div>');
  }
  $(bottomBorder).append('<div class="border-br"></div>');
}
