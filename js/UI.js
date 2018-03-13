function initUIFunctions() {
  $(gameButton).mousedown(function() {
    $(gameButton).toggleClass('btn-smiley btn-click')
  })

  $(document).mouseup(function () {
    if($(gameButton).hasClass("btn-wow")) {
      $(gameButton).toggleClass('btn-smiley btn-wow');
    }

    if($(gameButton).hasClass("btn-click")) {
      $(gameButton).toggleClass('btn-smiley btn-click')
    }
  })

  $(gameButton).click(function () {
    resetGame();
  })

  $("input:radio").click(function() {
    value = parseInt($(this).val());
    $(game).css("zoom", value);
  })
}

function initFieldFunctions() {
  field = $('.field');
  field.click(function() {
      id = $(this).attr('id');
      row = parseInt(id.split("-")[0]);
      col = parseInt(id.split("-")[1]);
      fieldClicked(row, col, $(this));
  });

  field.on("contextmenu", function() {
      id = $(this).attr('id');
      row = parseInt(id.split("-")[0]);
      col = parseInt(id.split("-")[1]);
      flagField($(this));
  });

  field.mousedown(function() {
    $(gameButton).toggleClass('btn-smiley btn-wow')
  });
}

function initSettingsFunctions() {
  $(newGameButton).click(function() {
    resetGame();
  });

  $(settingsContainer).css({"margin-left":100% - gameWidth / 2, "margin-right":100% - gameWidth / 2})
}

function resetButton() {
  if ($(gameButton).hasClass('btn-smiley')) {
    return;
  }
  else if ($(gameButton).hasClass('btn-dead')) {
    $(gameButton).toggleClass('btn-dead btn-smiley');
  }
  else if ($(gameButton).hasClass('btn-cool')) {
    $(gameButton).toggleClass('btn-cool btn-smiley');
  }
}

function bindJquerys() {
  game = $("#game");

  newGameButton = $("#newgame-btn");
  gameButton = $("#game-button");

  topBorder = $(".top-border");
  middleBorder = $(".middle-border");
  bottomBorder = $(".bottom-border");

  fieldContainer = $("#field-container");
  settingsContainer = $("#settings-container");

  inputRows = $("#input-rows");
  inputColumns = $("#input-columns");
  inputBombs = $("#input-bombs");

  scores = $("#scores");
}

// DisplayFunctions
function splitNumber(number) {
  numberArray = []

  number = Math.abs(number);

  while (number > 0) {
    numberArray[numberArray.length] = number % 10;
    number = parseInt(number / 10);
  }

  return numberArray;
}

// Times Table
function addTime(settings, time) {
  if($(scores).hasClass('hidden')) {
    $(scores).toggleClass('hidden visible');
  }

  $(scores).find("tbody:last-child").append('<tr><td>' + settings + '</td><td>' + time + '</td></tr>');
}
