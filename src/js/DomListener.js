import {gameButton, field, block} from './DomObjects.js';
import {newGame} from '../../index.js';

const btnSmiley = 'btn-smiley';
const btnClick = 'btn-click';
const btnWow = 'btn-wow';

let Game;

class DomListener {
  /**
   * Constructor
   * @param {Game} game
   */
  constructor(game) {
    Game = game;

    console.log('DOMListener');
    this.initDomListener();
  }

  /**
   * Initialistion Function
   */
  initDomListener() {
    console.log('init');

    $(gameButton).mousedown(function() {
      $(gameButton).removeClass(btnSmiley);
      $(gameButton).addClass(btnClick);
    });

    $(game).mouseup(function() {
      if ($(gameButton).hasClass(btnWow)) {
        $(gameButton).removeClass(btnWow);
        $(gameButton).addClass(btnSmiley);
      } else if ($(gameButton).hasClass(btnClick)) {
        $(gameButton).removeClass(btnClick);
        $(gameButton).addClass(btnSmiley);
      }
    });

    $(gameButton).click(function() {
      newGame();
    });

    $('input:radio').click(function() {
      const value = parseInt($(this).val());
      console.log(value);
      $(game).css('zoom', value);
    });

    $(game).on('click', field, function() {
      const id = $(this).attr('id');
      const row = parseInt(id.split('-')[0]);
      const col = parseInt(id.split('-')[1]);
      Game.blockClicked(row, col, `#${id}`);
    });

    $(game).on('contextmenu', block, function() {
      const id = $(this).attr('id');
      Game.flagField(`#${id}`);
    });

    $(game).on('mousedown', field, function() {
      $(gameButton).removeClass(btnSmiley);
      $(gameButton).addClass(btnWow);
    });
  }
}


export {DomListener};
