import { newGame } from '../../index.js';
import {
  block,
  btnClickClass,
  btnSmileyClass,
  btnWowClass
} from './DomObjects.js';
import { changeClass, hasClass } from './Util.js';

/**
 * Init all listening events to the dom
 * @param {Game} game
 */
export default function initDomListeners(game) {
  const gameButton = document.getElementById('game-button');
  gameButton.addEventListener('mousedown', () => {
    changeClass(gameButton, btnSmileyClass, btnClickClass);
  });

  gameButton.addEventListener('click', () => {
    newGame();
  });

  const gameDiv = document.getElementById('game');
  gameDiv.addEventListener('mouseup', () => {
    if (hasClass(gameButton, btnWowClass)) {
      changeClass(gameButton, btnWowClass, btnSmileyClass);
    } else if (hasClass(gameButton, btnClickClass)) {
      changeClass(gameButton, btnClickClass, btnSmileyClass);
    }
  });

  const radioGroup = document.querySelectorAll('input[type="radio"]');
  radioGroup.forEach(node => {
    node.addEventListener('click', e => {
      const value = parseInt(e.target.value);
      console.log('value', value);
      gameDiv.style.zoom = value;
    });
  });

  // $(game).on('click', field, function() {
  //   const id = $(this).attr('id');
  //   const row = parseInt(id.split('-')[0]);
  //   const col = parseInt(id.split('-')[1]);
  //   Game.blockClicked(row, col, `#${id}`);
  // });

  $(game).on('contextmenu', block, function() {
    const id = $(this).attr('id');
    Game.flagField(`#${id}`);
  });

  const blocks = gameDiv.querySelectorAll('.block');
  blocks.forEach(blockElement => {
    blockElement.addEventListener('mousedown', () => {
      changeClass(gameButton, btnSmileyClass, btnWowClass);
    });

    blockElement.addEventListener('click', e => {
      const { row, col } = e.target.dataset;
      console.log({ row, col });
    });
  });
}
