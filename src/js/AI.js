import {getID} from './Util.js';

let changes = 0;
let iterations = 0;

class AI {
  /**
   * AI construnctor
   * @param {Game} Game
   */
  constructor(Game) {
    this.Game = Game;
  }

  /**
   * Function which starts the AI Process
   */
  startAI() {
    iterations = 0;
    changes = 0;

    console.log('start AI');

    while ( !this.Game.gameWon
            && iterations < this.Game.rows * this.Game.columns) {
      if (points === 0) {
        this.clickAllBlocks();
      } else if (changes === 0) {
        this.randomClick();
      } else {
        changes = 0;
        this.goThroughClicked();
      }

      iterations++;
    }
  }

  /**
   * Clicks all Blocks
   */
  clickAllBlocks() {
    $('.field').each(function() {
      $(this).click();
    });
  }

  /**
   * Clicks a random Block
   */
  randomClick() {
    const unclickedIDs = [];

    $('.field').each(function() {
      unclickedIDs.push('#' + $(this).attr('id'));
    });

    const randomID = Math.floor(Math.random() * unclickedIDs.length);
    const randomElement = unclickedIDs[randomID];

    console.log('random click: ', randomElement);

    $(randomElement).click();

    changes++;
  }

  goThroughClicked() {
    const AI = this;

    $('.clicked').each(function() {
      const number = parseInt($(this).data('value'));

      if (number > 0) {
        const id = $(this).attr('id');
        const row = parseInt(id.split('-')[0]);
        const col = parseInt(id.split('-')[1]);

        const surroundIDs = AI.countUnclickedBlocksAround(row, col);
        const flags = AI.countFlagsAround(row, col);

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

  /**
   * Counts how many Blocks around a speficic Block are unclicked
   * @param  {number} row
   * @param  {number} col
   * @return {array}
   */
  countUnclickedBlocksAround(row, col) {
    const surroundIDs = [];

    this.checkClicked(row-1, col-1);
    this.checkClicked(row-1, col);
    this.checkClicked(row-1, col+1);

    this.checkClicked(row+1, col-1);
    this.checkClicked(row+1, col);
    this.checkClicked(row+1, col+1);

    this.checkClicked(row, col-1);
    this.checkClicked(row, col+1);

    return surroundIDs;
  }

  /**
   * Counts how many Flags are around a specific Block
   * @param  {number} row
   * @param  {number} col
   * @return {number} flags
   */
  countFlagsAround(row, col) {
    let flags = 0;

    flags = this.checkFlag(row-1, col-1, flags);
    flags = this.checkFlag(row-1, col, flags);
    flags = this.checkFlag(row-1, col+1, flags);

    flags = this.checkFlag(row+1, col-1, flags);
    flags = this.checkFlag(row+1, col, flags);
    flags = this.checkFlag(row+1, col+1, flags);

    flags =this.checkFlag(row, col-1, flags);
    flags =this.checkFlag(row, col+1, flags);

    return flags;
  }

  /**
   * Returns 
   * @param  {number} row
   * @param  {number} col
   * @return {id}
   */
  checkClicked(row, col, surroundIDs) {
    const id = getID(row, col);

    if ($(id).hasClass('tile')) {
      surroundIDs.pu
    }
  }

  /**
   * Adds flag counter if blokc has a flag
   * @param  {number} row 
   * @param  {number} col 
   * @param  {number} flags
   * @return {number}
   */
  checkFlag(row, col, flags) {
    const id = getID(row, col);

    if ($(id).hasClass('block') &&
        $(id).hasClass('flag')) {
      flags++;
    }

    return flags;
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
