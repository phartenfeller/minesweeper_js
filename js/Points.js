
function setupPoints() {
  points = bombs;

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
