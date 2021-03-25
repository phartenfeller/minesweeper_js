/* eslint-disable max-statements */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["handleClick"] }] */
import updateStatsData from './db/statsData';
import domObjects from './DomObjects';
import { changeClass, hasClass } from './util';

let wasAlreadyInitialized = false;
let globalGame;
let actionToggleStateClear = true; // click action on touchscreens (flag or clear)

/**
 * Handle a click on a block
 * @param {Event} e
 */
function handleClick(e) {
  const row = parseInt(e.target.dataset.row);
  const col = parseInt(e.target.dataset.col);
  if (actionToggleStateClear) {
    globalGame.blockClicked(row, col);
  } else {
    globalGame.flagField(row, col);
    e.target.addEventListener('click', handleClick, { once: true });
  }
}

export default class DomListener {
  /**
   * Init all listening events to the dom
   * @param {Game} game
   */
  constructor(game) {
    this.game = game;
    globalGame = game;
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
      changeClass(
        gameButton,
        domObjects.btnSmileyClass,
        domObjects.btnClickClass
      );
    });

    document.getElementById('newgame-btn').addEventListener('click', () => {
      this.game.newGame();
    });

    gameButton.addEventListener('click', () => {
      this.game.newGame();
    });

    this.gameDiv = document.getElementById('game');
    this.gameDiv.addEventListener('mouseup', () => {
      if (hasClass(gameButton, domObjects.btnWowClass)) {
        changeClass(
          gameButton,
          domObjects.btnWowClass,
          domObjects.btnSmileyClass
        );
      } else if (hasClass(gameButton, domObjects.btnClickClass)) {
        changeClass(
          gameButton,
          domObjects.btnClickClass,
          domObjects.btnSmileyClass
        );
      }
    });

    const radioGroup = document.querySelectorAll('input[type="radio"]');
    radioGroup.forEach(node => {
      node.addEventListener('click', e => {
        const value = parseInt(e.target.value);
        console.log('value', value);
        this.game.applyZoom(value);
      });
    });

    const fieldContainer = document.getElementById('field-container');
    fieldContainer.addEventListener('mousedown', () => {
      changeClass(
        gameButton,
        domObjects.btnSmileyClass,
        domObjects.btnWowClass
      );
    });

    let collapseHelpHidden = true;
    const collapseHelp = document.getElementById('collapse-help');
    const collapseHelpContainer = document.getElementById(
      'collapse-help-container'
    );
    const chevronSvg = document.getElementById('chevron-svg');
    collapseHelp.addEventListener('click', () => {
      if (collapseHelpHidden) {
        collapseHelpContainer.classList.remove('hidden');
        chevronSvg.classList.add('rotate-180');
      } else {
        collapseHelpContainer.classList.add('hidden');
        chevronSvg.classList.remove('rotate-180');
      }
      collapseHelpHidden = !collapseHelpHidden;
    });

    this.initBlockListeners();

    /* Touch device action toggle listeners */
    const actionToggleRegion = document.getElementById('click-action-toggle');
    const actionToggle = document.getElementById('action-toggle');
    const actionToggleThumb = document.getElementById('action-toggle-thumb');
    const defuseTranslate = 'translate-x-0';
    const flagTranslate = 'translate-x-7';

    actionToggle.addEventListener('click', () => {
      actionToggleStateClear = !actionToggleStateClear;
      if (actionToggleStateClear) {
        changeClass(actionToggleThumb, flagTranslate, defuseTranslate);
        actionToggle.setAttribute('aria-checked', false);
      } else {
        changeClass(actionToggleThumb, defuseTranslate, flagTranslate);
        actionToggle.setAttribute('aria-checked', true);
      }
    });

    /* Stats modal listeners */
    const statsButton = document.getElementById('stats-btn');
    const statsPopup = document.querySelector('stats-popup');
    statsButton.addEventListener('click', () => {
      updateStatsData();
      statsPopup.setAttribute('show', 'true');
      actionToggleRegion.classList.add('invisible');
    });

    const statsCloseBtn = document.getElementById('stats-close-btn');
    statsCloseBtn.addEventListener('click', () => {
      statsPopup.removeAttribute('show');
      actionToggleRegion.classList.remove('invisible');
    });
  }

  /**
   * Listeners for blocks
   */
  initBlockListeners() {
    const blocks = this.gameDiv.querySelectorAll(`.${domObjects.blockClass}`);

    blocks.forEach(blockElement => {
      blockElement.addEventListener('contextmenu', e => {
        e.preventDefault();
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        console.log({ row, col });
        if (!this.preventDoubleRightclick(row, col)) {
          this.game.flagField(row, col);
        }
      });

      blockElement.addEventListener('click', handleClick, {
        once: true
      });
    });
  }
}
