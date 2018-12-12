class DomObjects {
  constructor() {
    this.game = $('#game');

    this.newGameButton = $('#newgame-btn');
    this.gameButton = $('#game-button');
    this.gameBar = $('#gamebar');

    this.topBorder = $('.top-border');
    this.middleBorder = $('.middle-border');
    this.bottomBorder = $('.bottom-border');

    this.fieldContainer = $('#field-container');
    this.settingsContainer = $('#settings-container');

    this.inputRows = $('#input-rows');
    this.inputColumns = $('#input-columns');
    this.inputBombs = $('#input-bombs');

    this.scores = $('#scores');
  }
}

export {DomObjects};
