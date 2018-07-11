let flags = 0;
let surroundIDs = [];
let changes = 0;
let iterations = 0;

function startAI() {
  iterations = 0;
  changes = 0;

  console.log("start AI");
  
  while (!gameWon && iterations < rows * columns) {
    if (points === 0) {
      clickAllTiles()
    }

    else if (changes === 0) {
      randomClick();
    }

    else {
      changes = 0;
      goThroughClicked();
    }

    iterations++;
    
  }
}

function clickAllTiles() {
  $(".field").each(function() {
    $(this).click();
  });
}

function randomClick() {
  let unclickedIDs = [];

  $(".field").each(function() {
    unclickedIDs.push("#" + $(this).attr('id'));
  });

  randomElement = unclickedIDs[Math.floor(Math.random()*unclickedIDs.length)];

  console.log("random click: ", randomElement);

  $(randomElement).click();

  changes++;
}

function goThroughClicked() {
  $(".clicked").each(function() {
    number = parseInt($(this).attr('data-value'));
    
    if (number > 0) {
      id = $(this).attr('id');
      row = parseInt(id.split("-")[0]);
      col = parseInt(id.split("-")[1]);
  
      countUnclickedFieldsAround(row, col);
      countFlagsAround(row, col);

      if(surroundIDs.length === number && surroundIDs.length > 0) {
        flagArray(surroundIDs);
        console.log("flag array:", surroundIDs.length, number);
        changes++;
      }

      else if(flags === number && flags !== 0) {
        clickTilesAround(row, col)
      }

    }
  })
}

function countUnclickedFieldsAround(row, col) {
  surroundIDs = [];

  checkClicked(row-1, col-1);
  checkClicked(row-1, col);
  checkClicked(row-1, col+1);

  checkClicked(row+1, col-1);
  checkClicked(row+1, col);
  checkClicked(row+1, col+1);

  checkClicked(row, col-1);
  checkClicked(row, col+1);
}

function countFlagsAround(row, col) {
  flags = 0;

  checkFlag(row-1, col-1);
  checkFlag(row-1, col);
  checkFlag(row-1, col+1);

  checkFlag(row+1, col-1);
  checkFlag(row+1, col);
  checkFlag(row+1, col+1);

  checkFlag(row, col-1);
  checkFlag(row, col+1);

}

function checkClicked(row, col) {
  id = getID(row, col);

  if ($(id).hasClass("tile")) {
        surroundIDs.push(getID(row, col));
  }
}

function checkFlag(row, col) {
  id = getID(row, col);

  if ($(id).hasClass("block") &&
      $(id).hasClass("flag")) {
    flags++;
  }
}

function flagArray(surroundIDs) {
  surroundIDs.forEach(element => {
    flag(element);
  });
}

function flag(id){
  if (!$(id).hasClass("flag")) {
    flagField($(id));
  }
}

function clickTile(row, col) {
  id = getID(row, col);

  if($(id).hasClass("block") && !$(id).hasClass("clicked") && !$(id).hasClass("flag")) {
    $(id).click();
    console.log("click:", id);
    changes++;
  }
}

function clickTilesAround(row, col) {
  clickTile(row-1, col-1);
  clickTile(row-1, col);
  clickTile(row-1, col+1);

  clickTile(row+1, col-1);
  clickTile(row+1, col);
  clickTile(row+1, col+1);

  clickTile(row, col-1);
  clickTile(row, col+1);
}
