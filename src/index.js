import '@pwabuilder/pwaupdate';
import './css/ui.css';
import './customElements/StatsPopup';
import { initDarkMode } from './js/darkMode';
import Game from './js/Game';

const debug = false;

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
  // eslint-disable-next-line no-new
  new Game(initialZoom, debug);
}

// Web-Component to notify on updates (and loads service worker)
const el = document.createElement('pwa-update');
document.body.appendChild(el);
initDarkMode();
newGame();
