import domObjects from '../../DomObjects';

/**
 * Resets state of Game button from old game
 * @param {domElement} gameButton
 */
function resetGameButton(gameButton) {
  gameButton.classList.remove(domObjects.btnDeadClass, domObjects.btnCoolClass);
  gameButton.classList.add(domObjects.btnSmileyClass);
}

export default resetGameButton;
