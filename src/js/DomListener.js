/* eslint-disable max-statements */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["handleClick"] }] */
import changeBestGame from './db/changeBestGames';
import updateStatsData from './db/statsData';
import { btnClickClass, btnSmileyClass, btnWowClass } from './DomObjects';
import { changeClass, hasClass } from './util';

let wasAlreadyInitialized = false;
let globalGame;
let actionToggleStateActivate = true; // click action on touchscreens (flag or activate)

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
      changeClass(gameButton, btnSmileyClass, btnClickClass);
    });

    document.getElementById('newgame-btn').addEventListener('click', () => {
      this.game.newGame();
    });

    gameButton.addEventListener('click', () => {
      this.game.newGame();
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
        this.game.applyZoom(value);
      });
    });

    const fieldContainer = document.getElementById('field-container');
    fieldContainer.addEventListener('mousedown', () => {
      changeClass(gameButton, btnSmileyClass, btnWowClass);
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
        chevronSvg.classList.add('r-180');
      } else {
        collapseHelpContainer.classList.add('hidden');
        chevronSvg.classList.remove('r-180');
      }
      collapseHelpHidden = !collapseHelpHidden;
    });

    const statsButton = document.getElementById('stats-btn');
    const statsPopup = document.getElementById('stats-popup');
    statsButton.addEventListener('click', () => {
      updateStatsData();
      statsPopup.classList.remove('invisible');
    });

    const statsCloseBtn = document.getElementById('stats-close-btn');
    statsCloseBtn.addEventListener('click', () => {
      statsPopup.classList.add('invisible');
    });

    this.initBlockListeners();

    const statsModeSelect = document.getElementById('stats-mode-select');
    statsModeSelect.addEventListener('change', e => {
      changeBestGame(e.target.value);
    });

    const actionToggle = document.getElementById('action-toggle');
    const actionToggleThumb = document.getElementById('action-toggle-thumb');
    const defuseTranslate = 'translate-x-0';
    const flagTranslate = 'translate-x-5';

    actionToggle.addEventListener('click', () => {
      actionToggleStateActivate = !actionToggleStateActivate;
      if (actionToggleStateActivate) {
        actionToggleThumb.classList.remove(flagTranslate);
        actionToggleThumb.classList.add(defuseTranslate);
        actionToggle.setAttribute('aria-checked', false);
      } else {
        actionToggleThumb.classList.add(flagTranslate);
        actionToggleThumb.classList.remove(defuseTranslate);
        actionToggle.setAttribute('aria-checked', true);
      }
    });
  }

  /**
   * Listeners for blocks
   */
  initBlockListeners() {
    const blocks = this.gameDiv.querySelectorAll('.block');

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

      blockElement.addEventListener('click', this.handleClick, { once: true });
    });
  }

  /**
   * Handle a click on a block
   * @param {Event} e
   */
  handleClick(e) {
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    if (actionToggleStateActivate) {
      globalGame.blockClicked(row, col);
    } else {
      globalGame.flagField(row, col);
    }
  }
}
