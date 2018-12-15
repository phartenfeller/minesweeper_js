import {gameButton} from './DomObjects.js';
import {newGame} from '../../index.js';

const btnSmiley = 'btn-smiley';
const btnClick = 'btn-click';
const btnWow = 'btn-wow';

function initDomListener() {
  $(gameButton).mousedown(function() {
    $(gameButton).toggleClass(btnSmiley, btnClick);
  });

  $(document).mouseup(function() {
    if ($(gameButton).hasClass(btnWow)) {
      $(gameButton).toggleClass(btnSmiley, btnWow);
    }

    if ($(gameButton).hasClass(btnClick)) {
      $(gameButton).toggleClass(btnSmiley, btnClick);
    }
  });

  $(gameButton).click(function() {
    newGame();
  });

  $('input:radio').click(function() {
    const value = parseInt($(this).val());
    $(game).css('zoom', value);
  });
}

export {initDomListener};
