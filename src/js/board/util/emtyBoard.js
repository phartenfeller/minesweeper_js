import { removeChildElements } from '../../util';

/**
 * Removes all relevant elements from the board to start a new game
 */
export default function emptyBoard() {
  removeChildElements(document.getElementById('top-border'));
  removeChildElements(document.getElementById('middle-border'));
  removeChildElements(document.getElementById('field-container'));
  removeChildElements(document.getElementById('bottom-border'));
}
