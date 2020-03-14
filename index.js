import { Game } from './src/js/Game.js';
import { DomListener } from './src/js/DomListener.js';
import { AI } from './src/js/AI.js';
import { checkDebug } from './src/js/Util.js';
import { newGameButton } from './src/js/DomObjects.js';

const debug = checkDebug();
let game;

// Function that runs on page load and setups game
$(document).ready(function() {
  // bindJquerys();
  newGame();
  // initUIFunctions();
  // initSettingsFunctions();
});

/**
 * Function to start a new Game
 */
function newGame() {
  if (typeof game !== 'undefined') {
    game.clearGame();
    game.setupGame();
  } else {
    game = new Game(debug);
    new DomListener(game);

    /* AI Specific Code */
    const ai = new AI(game);

    document.querySelector('#AI').addEventListener('click', () => {
      ai.startAI();
    });
  }
}

$(newGameButton).click(function() {
  newGame();
});

export { newGame, debug };
