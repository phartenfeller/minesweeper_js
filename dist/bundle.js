/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_js_Game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/js/Game.js */ \"./src/js/Game.js\");\n\r\n\r\nconst debug = true;\r\n\r\nlet rows = 10;\r\nlet columns = 10;\r\nlet bombs = 10;\r\n\r\n// Function that runs on page load and setups game\r\n$( document ).ready(function() {\r\n  // bindJquerys();\r\n  const game = new _src_js_Game_js__WEBPACK_IMPORTED_MODULE_0__[\"Game\"](rows, columns, bombs, debug);\r\n  // initUIFunctions();\r\n  // initSettingsFunctions();\r\n});\r\n\r\n/*\r\nfunction newGame() {\r\n  createField();\r\n  setZoom();\r\n  createBombs();\r\n  setupPoints();\r\n  initFieldFunctions();\r\n  setAmountFields();\r\n  resetButton();\r\n  gameWon = false;\r\n  resetTimer();\r\n}\r\n\r\nfunction deleteGame() {\r\n  $(topBorder).empty();\r\n  $(middleBorder).empty();\r\n  $(fieldContainer).empty();\r\n  $(bottomBorder).empty();\r\n}\r\n\r\nfunction resetGame() {\r\n  deleteGame();\r\n  rows = parseInt($(inputRows).val());\r\n  columns = parseInt($(inputColumns).val());\r\n  bombs = parseInt($(inputBombs).val());\r\n\r\n  if (rows < 8) {\r\n    rows = 8;\r\n    $(inputRows).val(8);\r\n  }\r\n\r\n  if (columns < 8) {\r\n    columns = 8;\r\n    $(inputColumns).val(8);\r\n  }\r\n\r\n  if (bombs < 1) {\r\n    bombs = 1;\r\n    $(inputBombs).val(1);\r\n  }\r\n\r\n  newGame();\r\n}\r\n\r\n// Debug Log\r\nfunction debugLog(message) {\r\n  if (debug) {\r\n    console.log(message);\r\n  }\r\n}\r\n*/\r\n\r\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./src/js/Board.js":
/*!*************************!*\
  !*** ./src/js/Board.js ***!
  \*************************/
/*! exports provided: Board */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Board\", function() { return Board; });\n/* harmony import */ var _DomObjects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DomObjects */ \"./src/js/DomObjects.js\");\n\r\n\r\nconst cBlockSize = 16;\r\nconst cBorderSize = 10;\r\n\r\nclass Board {\r\n  /**\r\n   * Constructor for Board\r\n   * @param {Game} Game\r\n   */\r\n  constructor(Game) {\r\n    this.gameHeight = cBlockSize * Game.rows + 3 * cBorderSize + 32;\r\n    this.gameWidth = cBlockSize * Game.columns + 2 * cBorderSize;\r\n    this.game = Game;\r\n\r\n    this.setBoardProperties();\r\n  }\r\n\r\n  /** Sets properties of the Board */\r\n  setBoardProperties() {\r\n    $(_DomObjects__WEBPACK_IMPORTED_MODULE_0__[\"DomObjects\"].game).css('zoom', 3);\r\n    $(_DomObjects__WEBPACK_IMPORTED_MODULE_0__[\"DomObjects\"].game).css({'height': this.gameHeight, 'width': this.gameWidth});\r\n    $(_DomObjects__WEBPACK_IMPORTED_MODULE_0__[\"DomObjects\"].gameBar).css('width', cBlockSize * this.game.columns + 2 *cBorderSize);\r\n    $(_DomObjects__WEBPACK_IMPORTED_MODULE_0__[\"DomObjects\"].fieldContainer).css('height', cBlockSize * this.game.rows);\r\n  }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/Board.js?");

/***/ }),

/***/ "./src/js/Bomb.js":
/*!************************!*\
  !*** ./src/js/Bomb.js ***!
  \************************/
/*! exports provided: Bomb */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Bomb\", function() { return Bomb; });\nclass Bomb {\r\n  constructor(row, col) {\r\n    this.row = row;\r\n    this.col = col;\r\n  }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/Bomb.js?");

/***/ }),

/***/ "./src/js/DomObjects.js":
/*!******************************!*\
  !*** ./src/js/DomObjects.js ***!
  \******************************/
/*! exports provided: DomObjects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DomObjects\", function() { return DomObjects; });\nclass DomObjects {\r\n  constructor() {\r\n    this.game = $('#game');\r\n\r\n    this.newGameButton = $('#newgame-btn');\r\n    this.gameButton = $('#game-button');\r\n    this.gameBar = $('#gamebar');\r\n\r\n    this.topBorder = $('.top-border');\r\n    this.middleBorder = $('.middle-border');\r\n    this.bottomBorder = $('.bottom-border');\r\n\r\n    this.fieldContainer = $('#field-container');\r\n    this.settingsContainer = $('#settings-container');\r\n\r\n    this.inputRows = $('#input-rows');\r\n    this.inputColumns = $('#input-columns');\r\n    this.inputBombs = $('#input-bombs');\r\n\r\n    this.scores = $('#scores');\r\n  }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/DomObjects.js?");

/***/ }),

/***/ "./src/js/Game.js":
/*!************************!*\
  !*** ./src/js/Game.js ***!
  \************************/
/*! exports provided: Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Game\", function() { return Game; });\n/* harmony import */ var _Points_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Points.js */ \"./src/js/Points.js\");\n/* harmony import */ var _Bomb_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Bomb.js */ \"./src/js/Bomb.js\");\n/* harmony import */ var _Board_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Board.js */ \"./src/js/Board.js\");\n\r\n\r\n\r\nclass Game {\r\n  /**\r\n   * Setups a Game\r\n   * @param {number}  rows\r\n   * @param {number}  columns\r\n   * @param {number}  amountBombs\r\n   * @param {boolean} debug\r\n   */\r\n  constructor(rows, columns, amountBombs, debug) {\r\n    // Game Board\r\n    this.rows = rows;\r\n    this.columns = columns;\r\n    this.amountBombs = amountBombs;\r\n    this.amountFields = this.rows * this.columns - this.amountBombs;\r\n    this.bombArray = this.createBombs();\r\n\r\n    // Settings\r\n    this.debug = debug;\r\n    this.showBombs = debug;\r\n\r\n    this.gameWon = false;\r\n    this.seconds = 0;\r\n\r\n    this.board = new _Board_js__WEBPACK_IMPORTED_MODULE_2__[\"Board\"](this);\r\n  }\r\n\r\n  /**\r\n   * Randomly creates the Bombs\r\n   * @return {array} Bomb Objects.\r\n   */\r\n  createBombs() {\r\n    const bombArray = [];\r\n\r\n    for (let i = 1; i <= this.amountBombs; i++) {\r\n      let uniqueBomb = false;\r\n      let randRow;\r\n      let randCol;\r\n      // Generate random Bombs and check if they are unique\r\n      while (!uniqueBomb) {\r\n        randRow = Math.floor(Math.random() * this.rows) + 1;\r\n        randCol = Math.floor(Math.random() * this.columns) + 1;\r\n\r\n        if (this.checkNoBomb(randRow, randCol, bombArray)) {\r\n          uniqueBomb = true;\r\n        }\r\n      }\r\n\r\n      // Add Bomb to the bombArray\r\n      bombArray.push(new _Bomb_js__WEBPACK_IMPORTED_MODULE_1__[\"Bomb\"](randRow, randCol));\r\n\r\n      // Debug\r\n      if (this.showBombs) {\r\n        const block = '#' + randRow + '-' + randCol;\r\n        $(block).toggleClass('field bomb');\r\n      }\r\n    }\r\n\r\n    return bombArray;\r\n  }\r\n\r\n  /**\r\n   * Returns true if field is no bomb\r\n   * @param  {number}  row\r\n   * @param  {number}  col\r\n   * @param  {array}   bombArray\r\n   * @return {boolean} true = no bomb, false = bomb\r\n   */\r\n  checkNoBomb(row, col, bombArray = this.bombArray) {\r\n    const amountBombs = bombArray.length;\r\n\r\n    // Error handling\r\n    if (isNaN(row)) {\r\n      const error = new Error('Row is NaN');\r\n      throw error;\r\n    }\r\n\r\n    if (isNaN(col)) {\r\n      const error = new Error('Col is NaN');\r\n      throw error;\r\n    }\r\n\r\n    for (let i = 0; i < amountBombs; i++) {\r\n      if (bombArray[i].row === row && bombArray[i].col === col) {\r\n        return false;\r\n      }\r\n    }\r\n    return true;\r\n  }\r\n\r\n  /**\r\n   * process that runs if a field is clicked\r\n   * @param {number} row\r\n   * @param {number} col\r\n   * @param {id}     field\r\n   */\r\n  fieldClicked(row, col, field = '') {\r\n    if (field === '') {\r\n      field = this.getID(row, col);\r\n    }\r\n\r\n    // returns if field is not on gamefield\r\n    // needed because function cluckFieldsAround() could process fields that are not on gamefield\r\n    if (row < 1 || row > rows || col < 1 || col > columns) {\r\n      return;\r\n    }\r\n\r\n    // if field was not clicked before\r\n    if (field.hasClass('field')) {\r\n      // if this field is a bomb\r\n      if (!checkNoBomb(row, col)) {\r\n        bombClicked(row, col, field);\r\n      } else {\r\n        this.amountFields--;\r\n        const number = this.checkSurroundings(row, col);\r\n        $(field).toggleClass('field f' + number + ' clicked');\r\n        $(field).attr('data-value', number);\r\n\r\n        // if zero bombs around reveal the fields around\r\n        if (number === 0) {\r\n          this.clickFieldsAround(row, col);\r\n        }\r\n\r\n        // win game when all fields which are not bombs are clicked\r\n        if (this.amountFields === 0) {\r\n          winGame();\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  /**\r\n   * flags a field on rightclick\r\n   * @param {id} field\r\n   */\r\n  flagField(field) {\r\n    if ($(field).hasClass('flag')) {\r\n      Object(_Points_js__WEBPACK_IMPORTED_MODULE_0__[\"addPoint\"])(); // todo\r\n    } else {\r\n      Object(_Points_js__WEBPACK_IMPORTED_MODULE_0__[\"removePoint\"])(); // todo\r\n    }\r\n\r\n    $(field).toggleClass('field flag');\r\n  }\r\n\r\n  /**\r\n   * calculates how many bombs are around a field\r\n   * @param  {number} row\r\n   * @param  {number} col\r\n   * @return {number} amount sourrounding bombs\r\n   */\r\n  checkSurroundings(row, col) {\r\n    let amount = 0;\r\n    // row\r\n    for (let r = -1; r <= 1; r++) {\r\n      for (let c =- 1; c <= 1; c++) {\r\n        if (!this.checkNoBomb(row+r, col+c)) {\r\n          amount++;\r\n        }\r\n      }\r\n    }\r\n    return amount;\r\n  }\r\n\r\n  /**\r\n   * procedure which sets the game to won\r\n   */\r\n  winGame() {\r\n    if (!this.gameWon) {\r\n      // show win button\r\n      $(gameButton).toggleClass('btn-smiley btn-cool');\r\n\r\n      // show not flagged bombs as flagged\r\n      for (let i=0; i < bombs; i++) {\r\n        const row = bombArray[i].row;\r\n        const col = bombArray[i].col;\r\n\r\n        const field = getID(row, col);\r\n\r\n        if (!$(field).hasClass('flag')) {\r\n          flagField($(field));\r\n        }\r\n      }\r\n\r\n      addTime(this.rows + 'x' + this.columns + ', ' + this.bombs + ' Bombs', this.seconds);\r\n      stopTimer(); // todo\r\n    }\r\n\r\n    this.gameWon = true;\r\n  }\r\n\r\n  /**\r\n   * reveals fields around a field with 0 bombs around\r\n   * @param {number} row\r\n   * @param {number} col\r\n   */\r\n  clickFieldsAround(row, col) {\r\n    this.fieldClicked(row - 1, col - 1);\r\n    this.fieldClicked(row - 1, col);\r\n    this.fieldClicked(row - 1, col + 1);\r\n\r\n    this.fieldClicked(row + 1, col - 1);\r\n    this.fieldClicked(row + 1, col);\r\n    this.fieldClicked(row + 1, col + 1);\r\n\r\n    this.fieldClicked(row, col - 1);\r\n    this.fieldClicked(row, col + 1);\r\n  }\r\n\r\n  /**\r\n   * process that runs if the player clicks on a bomb\r\n   * @param {number} row\r\n   * @param {number} col\r\n   * @param {field} field\r\n   */\r\n  bombClicked(row, col, field) {\r\n    // mark clicked bomb red\r\n    $(field).toggleClass('field bomb-red clicked');\r\n\r\n    // stop timer\r\n    stopTimer(); // todo\r\n\r\n    // dead button\r\n    $(gameButton).toggleClass('btn-smiley btn-dead');\r\n\r\n    // show all other bombs\r\n    for (let i = 0; i < bombs; i++) {\r\n      if (bombArray[i].row !== row || bombArray[i].col !== col) {\r\n        const id = getID(bombArray[i].row, bombArray[i].col);\r\n        $(id).toggleClass('field bomb');\r\n      }\r\n    }\r\n\r\n    // check if all flagged fields are really bombs\r\n    $('.flag').each(function() {\r\n      let id = $(this).attr('id');\r\n      const row = parseInt(id.split('-')[0]);\r\n      const col = parseInt(id.split('-')[1]);\r\n\r\n      id = '#' + id;\r\n\r\n      // if no bomb\r\n      if (this.checkNoBomb(row, col)) {\r\n        $(id).toggleClass('flag no-bomb');\r\n      }\r\n    });\r\n\r\n    // lock all fields\r\n    for (let r = 1; r <= rows; r++) {\r\n      for (let c = 1; c <= columns; c++) {\r\n        const id = getID(r, c);\r\n        $(id).addClass('clicked');\r\n      }\r\n    }\r\n  }\r\n\r\n  /**\r\n   * returns the id corresponding to row and col\r\n   * @param  {*} row\r\n   * @param  {*} col\r\n   * @return {id}\r\n   */\r\n  getID(row, col) {\r\n    return '#' + row + '-' + col;\r\n  }\r\n}\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/Game.js?");

/***/ }),

/***/ "./src/js/Points.js":
/*!**************************!*\
  !*** ./src/js/Points.js ***!
  \**************************/
/*! exports provided: setupPoints, addPoint, removePoint, pointerClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setupPoints\", function() { return setupPoints; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addPoint\", function() { return addPoint; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removePoint\", function() { return removePoint; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pointerClass\", function() { return pointerClass; });\n\r\nfunction setupPoints() {\r\n  points = bombs;\r\n\r\n  pointsArray = splitNumber(points);\r\n\r\n  pointerClass(3, pointsArray[0]);\r\n  pointerClass(2, pointsArray[1]);\r\n  pointerClass(1, pointsArray[2]);\r\n}\r\n\r\nfunction addPoint() {\r\n  points++;\r\n  pointsArray = splitNumber(points);\r\n\r\n  pointerClass(3, pointsArray[0]);\r\n  pointerClass(2, pointsArray[1]);\r\n  pointerClass(1, pointsArray[2]);\r\n\r\n  if (points < 0) {\r\n    pointerClass(1, '-');\r\n  }\r\n}\r\n\r\nfunction removePoint() {\r\n  points--;\r\n  pointsArray = splitNumber(points);\r\n\r\n  pointerClass(3, pointsArray[0]);\r\n  pointerClass(2, pointsArray[1]);\r\n  pointerClass(1, pointsArray[2]);\r\n\r\n  if (points < 0) {\r\n    pointerClass(1, '-');\r\n  }\r\n}\r\n\r\nfunction pointerClass(display, number) {\r\n  number = (number === undefined) ? 0 : number;\r\n  pointsID = '#points-' + display;\r\n\r\n  $(pointsID).removeClass('d-');\r\n  for (let i=0; i<=9; i++) {\r\n    $(pointsID).removeClass('d' + i);\r\n  }\r\n\r\n  // add new class\r\n  $(pointsID).addClass('d' + number);\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/Points.js?");

/***/ })

/******/ });