import { newGame } from '../../index.js';
import { btnClickClass, btnSmileyClass, btnWowClass } from './DomObjects.js';
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

  const fieldContainer = document.getElementById('field-container');
  fieldContainer.addEventListener('mousedown', () => {
    changeClass(gameButton, btnSmileyClass, btnWowClass);
  });

  const blocks = gameDiv.querySelectorAll('.block');

  const handleClick = e => {
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    console.log({ row, col });
    // click
    game.blockClicked(row, col);
    e.target.removeEventListener('click', handleClick);
  };

  blocks.forEach(blockElement => {
    blockElement.addEventListener('click', handleClick);

    blockElement.addEventListener('contextmenu', e => {
      e.preventDefault();
      const row = parseInt(e.target.dataset.row);
      const col = parseInt(e.target.dataset.col);
      console.log({ row, col });
      game.flagField(row, col);
    });
  });
}
