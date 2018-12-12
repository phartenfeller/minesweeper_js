import {DomObjects} from './DomObjects';

const cBlockSize = 16;
const cBorderSize = 10;

class Board {
  /**
   * Constructor for Board
   * @param {Game} Game
   */
  constructor(Game) {
    this.gameHeight = cBlockSize * Game.rows + 3 * cBorderSize + 32;
    this.gameWidth = cBlockSize * Game.columns + 2 * cBorderSize;
    this.game = Game;

    this.setBoardProperties();
  }

  /** Sets properties of the Board */
  setBoardProperties() {
    $(DomObjects.game).css('zoom', 3);
    $(DomObjects.game).css({'height': this.gameHeight, 'width': this.gameWidth});
    $(DomObjects.gameBar).css('width', cBlockSize * this.game.columns + 2 *cBorderSize);
    $(DomObjects.fieldContainer).css('height', cBlockSize * this.game.rows);
  }
}

export {Board};
