function initUIFunctions() {
  $(gameButton).mousedown(function() {
    $(gameButton).toggleClass('btn-smiley btn-click');
  });

  $(document).mouseup(function() {
    if ($(gameButton).hasClass('btn-wow')) {
      $(gameButton).toggleClass('btn-smiley btn-wow');
    }

    if ($(gameButton).hasClass('btn-click')) {
      $(gameButton).toggleClass('btn-smiley btn-click');
    }
  });

  $(gameButton).click(function() {
    resetGame();
  });

  $('input:radio').click(function() {
    value = parseInt($(this).val());
    $(game).css('zoom', value);
  });
}

function initFieldFunctions() {
  field = $('.field');
  field.click(function() {
    id = $(this).attr('id');
    row = parseInt(id.split('-')[0]);
    col = parseInt(id.split('-')[1]);
    fieldClicked(row, col, $(this));
  });

  field.on('contextmenu', function() {
    id = $(this).attr('id');
    row = parseInt(id.split('-')[0]);
    col = parseInt(id.split('-')[1]);
    flagField($(this));
  });

  field.mousedown(function() {
    $(gameButton).toggleClass('btn-smiley btn-wow');
  });
}

function initSettingsFunctions() {
  $(newGameButton).click(function() {
    resetGame();
  });

  $(settingsContainer).css({'margin-left': 100% - gameWidth / 2, 'margin-right': 100% - gameWidth / 2});
}

function resetButton() {
  if ($(gameButton).hasClass('btn-smiley')) {
    return;
  } else if ($(gameButton).hasClass('btn-dead')) {
    $(gameButton).toggleClass('btn-dead btn-smiley');
  } else if ($(gameButton).hasClass('btn-cool')) {
    $(gameButton).toggleClass('btn-cool btn-smiley');
  }
}

function bindJquerys() {
  const game = $('#game');

  const newGameButton = $('#newgame-btn');
  const gameButton = $('#game-button');

  const topBorder = $('.top-border');
  const middleBorder = $('.middle-border');
  const bottomBorder = $('.bottom-border');

  const fieldContainer = $('#field-container');
  const settingsContainer = $('#settings-container');

  const inputRows = $('#input-rows');
  const inputColumns = $('#input-columns');
  const inputBombs = $('#input-bombs');

  const scores = $('#scores');
}

function setZoom() {
  documentHeight = $( document ).height();
  documentWidth = $( document ).width();
  zoom = (documentWidth - 16) / gameWidth;
  console.log(documentWidth + '-16 / ' + gameWidth);

  if (documentWidth > documentHeight) {
    if (zoom > 3) {
      zoom = 3;
    }
  }

  $('#game').css({'zoom': zoom});
}

// DisplayFunctions
function splitNumber(number) {
  const numberArray = [];

  number = Math.abs(number);

  while (number > 0) {
    numberArray[numberArray.length] = number % 10;
    number = parseInt(number / 10);
  }

  return numberArray;
}

// Times Table
function addTime(settings, time) {
  if ($(scores).hasClass('hidden')) {
    $(scores).toggleClass('hidden visible');
  }

  $(scores).find('tbody:last-child').append('<tr><td>' + settings + '</td><td>' + time + '</td></tr>');
}

export {initUIFunctions, initFieldFunctions, initSettingsFunctions, resetButton, bindJquerys, setZoom, splitNumber, addTime};
