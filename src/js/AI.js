import {getID} from './Util.js';

let flags = 0;
let surroundIDs = [];
let changes = 0;
let iterations = 0;

class AI {
  constructor(Game) {
    this.Game = Game;
  }

  startAI() {
    iterations = 0;
    changes = 0;

    console.log('start AI');

    while (!this.Game.gameWon && iterations < this.Game.rows * this.Game.columns) {
      if (points === 0) {
        this.clickAllTiles();
      } else if (changes === 0) {
        this.randomClick();
      } else {
        changes = 0;
        this.goThroughClicked();
      }

      iterations++;
    }
  }

  clickAllTiles() {
    $('.field').each(function() {
      $(this).click();
    });
  }

  randomClick() {
    const unclickedIDs = [];

    $('.field').each(function() {
      unclickedIDs.push('#' + $(this).attr('id'));
    });

    const randomElement = unclickedIDs[Math.floor(Math.random()*unclickedIDs.length)];

    console.log('random click: ', randomElement);

    $(randomElement).click();

    changes++;
  }

  goThroughClicked() {
    const AI = this;

    $('.clicked').each(function() {
      const number = parseInt($(this).attr('data-value'));

      if (number > 0) {
        const id = $(this).attr('id');
        const row = parseInt(id.split('-')[0]);
        const col = parseInt(id.split('-')[1]);

        AI.countUnclickedFieldsAround(row, col);
        AI.countFlagsAround(row, col);

        if (surroundIDs.length === number && surroundIDs.length > 0) {
          flagArray(surroundIDs);
          console.log('flag array:', surroundIDs.length, number);
          changes++;
        } else if (flags === number && flags !== 0) {
          clickTilesAround(row, col);
        }
      }
    });
  }

  countUnclickedFieldsAround(row, col) {
    surroundIDs = [];

    this.checkClicked(row-1, col-1);
    this.checkClicked(row-1, col);
    this.checkClicked(row-1, col+1);

    this.checkClicked(row+1, col-1);
    this.checkClicked(row+1, col);
    this.checkClicked(row+1, col+1);

    this.checkClicked(row, col-1);
    this.checkClicked(row, col+1);
  }

  countFlagsAround(row, col) {
    flags = 0;

    this.checkFlag(row-1, col-1);
    this.checkFlag(row-1, col);
    this.checkFlag(row-1, col+1);

    this.checkFlag(row+1, col-1);
    this.checkFlag(row+1, col);
    this.checkFlag(row+1, col+1);

    this.checkFlag(row, col-1);
    this.checkFlag(row, col+1);
  }

  checkClicked(row, col) {
    const id = getID(row, col);

    if ($(id).hasClass('tile')) {
      surroundIDs.push(getID(row, col));
    }
  }

  checkFlag(row, col) {
    const id = getID(row, col);

    if ($(id).hasClass('block') &&
        $(id).hasClass('flag')) {
      flags++;
    }
  }

  flagArray(surroundIDs) {
    surroundIDs.forEach(element => {
      flag(element);
    });
  }

  flag(id) {
    if (!$(id).hasClass('flag')) {
      flagField($(id));
    }
  }

  clickTile(row, col) {
    const id = getID(row, col);

    if ($(id).hasClass('block')
        && !$(id).hasClass('clicked')
        && !$(id).hasClass('flag')) {
      $(id).click();
      console.log('click:', id);
      changes++;
    }
  }

  clickTilesAround(row, col) {
    clickTile(row-1, col-1);
    clickTile(row-1, col);
    clickTile(row-1, col+1);

    clickTile(row+1, col-1);
    clickTile(row+1, col);
    clickTile(row+1, col+1);

    clickTile(row, col-1);
    clickTile(row, col+1);
  }
}


export {AI};
