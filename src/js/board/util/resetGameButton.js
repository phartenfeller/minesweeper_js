/**
 * Resets state of Game button from old game
 * @param {domElement} gameButton
 */
function resetGameButton(gameButton) {
  gameButton.classList.remove('sprite-btn-dead', 'sprite-btn-cool');
  gameButton.classList.add('sprite-btn-smiley');
}

module.exports = resetGameButton;
