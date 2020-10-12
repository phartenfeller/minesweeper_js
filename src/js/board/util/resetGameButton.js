import { btnCoolClass, btnDeadClass, btnSmileyClass } from '../../DomObjects';

/**
 * Resets state of Game button from old game
 * @param {domElement} gameButton
 */
function resetGameButton(gameButton) {
  gameButton.classList.remove(btnDeadClass, btnCoolClass);
  gameButton.classList.add(btnSmileyClass);
}

export default resetGameButton;
