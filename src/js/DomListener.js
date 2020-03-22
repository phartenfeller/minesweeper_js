import { newGame } from '../../index';
import { btnClickClass, btnSmileyClass, btnWowClass } from './DomObjects';
import { changeClass, hasClass } from './util';

let wasAlreadyInitialized = false;

export default class DomListenerHandler {
  /**
   * Init all listening events to the dom
   * @param {Game} game
   */
  constructor(game) {
    console.log('domlistener');
    this.game = game;
    this.rightClickCooldown = {};
  }

  /**
   * Called from outside
   */
  init() {
    if (!wasAlreadyInitialized) {
      this.initDomListeners();
      wasAlreadyInitialized = true;
    } else {
      this.initBlockListeners();
    }
  }

  /**
   * Remove double rightclicks cooldown
   * @param {string} selector
   */
  removeCooldown(selector) {
    this.rightClickCooldown[selector] = false;
  }

  /**
   * Prevents to fast rightclicks
   * @param {number} row
   * @param {number} col
   * @return {boolean} prevented
   */
  preventDoubleRightclick(row, col) {
    const selector = `${row}-${col}`;
    if (!this.rightClickCooldown[selector]) {
      this.rightClickCooldown[selector] = true;
      setTimeout(() => this.removeCooldown(selector), 200);
      return false;
    }
    console.log('right click prevented');
    return true;
  }

  /**
   * Setup all required listeners
   */
  initDomListeners() {
    const gameButton = document.getElementById('game-button');
    gameButton.addEventListener('mousedown', () => {
      changeClass(gameButton, btnSmileyClass, btnClickClass);
    });

    gameButton.addEventListener('click', () => {
      newGame();
    });

    this.gameDiv = document.getElementById('game');
    this.gameDiv.addEventListener('mouseup', () => {
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
        this.gameDiv.style.zoom = value;
      });
    });

    const fieldContainer = document.getElementById('field-container');
    fieldContainer.addEventListener('mousedown', () => {
      changeClass(gameButton, btnSmileyClass, btnWowClass);
    });

    this.initBlockListeners();
  }

  /**
   * Listeners for blocks
   */
  initBlockListeners() {
    const blocks = this.gameDiv.querySelectorAll('.block');

    const handleClick = e => {
      console.log('clickhandler');
      const row = parseInt(e.target.dataset.row);
      const col = parseInt(e.target.dataset.col);
      console.log({ row, col });
      // click
      const flag = this.game.blockClicked(row, col);
      console.log('flag', flag);
      if (!flag) {
        console.log('removeEventListener');
        e.target.removeEventListener('click', handleClick);
      }
    };

    blocks.forEach(blockElement => {
      blockElement.addEventListener('click', handleClick);

      blockElement.addEventListener('contextmenu', e => {
        e.preventDefault();
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        console.log({ row, col });
        if (!this.preventDoubleRightclick(row, col)) {
          this.game.flagField(row, col);
        }
      });
    });
  }
}
