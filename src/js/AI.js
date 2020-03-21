import { getID, debugLog } from './Util2.js';

import {
  field,
  flagClass,
  clicked,
  blockClass,
  clickedClass
} from './DomObjects.js';

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

    debugLog('start AI');

    while (
      !this.Game.gameWon &&
      iterations < this.Game.rows * this.Game.columns
    ) {
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
    $(field).each(function() {
      $(this).click();
    });
  }

  /**
   * Clicks a random Block
   */
  randomClick() {
    const unclickedIDs = [];

    $(field).each(function() {
      unclickedIDs.push(`#${$(this).attr('id')}`);
    });

    const randomID = Math.floor(Math.random() * unclickedIDs.length);
    const randomElement = unclickedIDs[randomID];

    debugLog('random click => ', randomElement);

    $(randomElement).click();

    changes++;
  }

  /**
   * Loop through all clicked blocks
   */
  goThroughClicked() {
    const AI = this;

    $(clicked).each(function() {
      const number = parseInt($(this).data('value'));

      if (number > 0) {
        const id = $(this).attr('id');
        const row = parseInt(id.split('-')[0]);
        const col = parseInt(id.split('-')[1]);

        const surroundIDs = AI.countUnclickedBlocksAround(row, col);
        const flags = AI.countFlagsAround(row, col);

        if (surroundIDs.length === number && surroundIDs.length > 0) {
          flagArray(surroundIDs);
          debugLog('flag array =>', surroundIDs.length, number);
          changes++;
        } else if (flags === number && flags !== 0) {
          clickBlocksAround(row, col);
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

    this.checkClicked(row - 1, col - 1);
    this.checkClicked(row - 1, col);
    this.checkClicked(row - 1, col + 1);

    this.checkClicked(row + 1, col - 1);
    this.checkClicked(row + 1, col);
    this.checkClicked(row + 1, col + 1);

    this.checkClicked(row, col - 1);
    this.checkClicked(row, col + 1);

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

    flags = this.checkFlag(row - 1, col - 1, flags);
    flags = this.checkFlag(row - 1, col, flags);
    flags = this.checkFlag(row - 1, col + 1, flags);

    flags = this.checkFlag(row + 1, col - 1, flags);
    flags = this.checkFlag(row + 1, col, flags);
    flags = this.checkFlag(row + 1, col + 1, flags);

    flags = this.checkFlag(row, col - 1, flags);
    flags = this.checkFlag(row, col + 1, flags);

    return flags;
  }

  /**
   * I dont know actually
   * @param {number} row
   * @param {number} col
   * @param {array} surroundIDs
   */
  checkClicked(row, col, surroundIDs) {
    const id = getID(row, col);

    if ($(id).hasClass('tile')) {
      surroundIDs.push(getID(row, col));
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

    if ($(id).hasClass(blockClass) && $(id).hasClass(flagClass)) {
      flags++;
    }

    return flags;
  }

  /**
   * Flags each id in array
   * @param {array} surroundIDs
   */
  flagArray(surroundIDs) {
    surroundIDs.forEach(element => {
      flag(element);
    });
  }

  /**
   * Flags a block
   * @param {id} id
   */
  flag(id) {
    if (!$(id).hasClass(flagClass)) {
      flagField($(id));
    }
  }

  /**
   * Clicks a field
   * @param {number} row
   * @param {number} col
   */
  clickBlock(row, col) {
    const id = getID(row, col);

    if (
      $(id).hasClass(blockClass) &&
      !$(id).hasClass(clickedClass) &&
      !$(id).hasClass(flagClass)
    ) {
      $(id).click();
      debugLog('click =>', id);
      changes++;
    }
  }

  /**
   * Clicks all blocks around a block
   * @param {number} row
   * @param {number} col
   */
  clickBlocksAround(row, col) {
    clickBlock(row - 1, col - 1);
    clickBlock(row - 1, col);
    clickBlock(row - 1, col + 1);

    clickBlock(row + 1, col - 1);
    clickBlock(row + 1, col);
    clickBlock(row + 1, col + 1);

    clickBlock(row, col - 1);
    clickBlock(row, col + 1);
  }
}

export { AI };
