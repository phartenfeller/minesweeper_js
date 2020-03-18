import { AI } from './src/js/AI.js';
import { Game } from './src/js/Game.js';
import { checkDebug } from './src/js/Util.js';

const debug = checkDebug();
let game;

/**
 * Function to start a new Game
 */
function newGame() {
  if (typeof game !== 'undefined') {
    game.clearGame();
    game.setupGame();
  } else {
    game = new Game(debug);

    /* AI Specific Code */
    const ai = new AI(game);

    document.getElementById('AI').addEventListener('click', () => {
      ai.startAI();
    });

    document.getElementById('newgame-btn').addEventListener('click', () => {
      newGame();
    });
  }
}

newGame();

export { newGame, debug };
