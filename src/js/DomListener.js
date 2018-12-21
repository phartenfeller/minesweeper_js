import {
  gameButton,
  field,
  btnSmileyClass,
  btnClickClass,
  btnWowClass,
  block,
} from './DomObjects.js';
import { newGame } from '../../index.js';
import { changeClass } from './Util.js';

let Game;
class DomListener {
  /**
   * Constructor
   * @param {Game} game
   */
  constructor(game) {
    Game = game;

    this.initDomListener();
  }

  /**
   * Initialistion Function
   */
  initDomListener() {
    $(gameButton).mousedown(function() {
      changeClass(gameButton, btnSmileyClass, btnClickClass);
    });

    $(game).mouseup(function() {
      if ($(gameButton).hasClass(btnWowClass)) {
        changeClass(gameButton, btnWowClass, btnSmileyClass);
      } else if ($(gameButton).hasClass(btnClickClass)) {
        changeClass(gameButton, btnClickClass, btnSmileyClass);
      }
    });

    $(gameButton).click(function() {
      newGame();
    });

    $('input:radio').click(function() {
      const value = parseInt($(this).val());
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
      changeClass(gameButton, btnSmileyClass, btnWowClass);
    });
  }
}

export { DomListener };
