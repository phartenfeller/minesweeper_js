import './src/css/minesweeper.css';
import './src/css/ui.css';
import { AI } from './src/js/AI';
import Game from './src/js/Game';
import { checkDebug } from './src/js/Util2';

const debug = checkDebug();

/**
 * Get initial zoom value
 * @return {Number} zoomLevel
 */
const getInitialZoom = () => {
  const width = window.innerWidth;
  let zoom;
  if (width > 1000) {
    zoom = 3;
  } else if (width > 374) {
    zoom = 2;
  } else {
    zoom = 1;
  }

  document.getElementById(`zoom_${zoom}`).checked = true;

  return zoom;
};

/**
 * Function to start a new Game
 */
function newGame() {
  const initialZoom = getInitialZoom();
  const game = new Game(initialZoom, debug);

  /* AI Specific Code */
  const ai = new AI(game);

  document.getElementById('AI').addEventListener('click', () => {
    ai.startAI();
  });
}

newGame();
