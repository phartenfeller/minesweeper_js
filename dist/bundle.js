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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_js_Timer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/js/Timer.js */ \"./src/js/Timer.js\");\n/* harmony import */ var _src_js_UI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/js/UI.js */ \"./src/js/UI.js\");\n/* harmony import */ var _src_js_Points_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/js/Points.js */ \"./src/js/Points.js\");\n/* harmony import */ var _src_js_Game_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/js/Game.js */ \"./src/js/Game.js\");\n/* harmony import */ var _src_js_Field_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/js/Field.js */ \"./src/js/Field.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst debug = true;\r\nconst showBombs = false;\r\n\r\nlet rows = 10;\r\nlet columns = 10;\r\nlet bombs = 10;\r\n\r\nlet bombArray = [];\r\nlet gameWon = false;\r\n\r\n\r\n// Function that runs on page load and setups game\r\n$( document ).ready(function() {\r\n  $(game).css('zoom', 3);\r\n  Object(_src_js_UI_js__WEBPACK_IMPORTED_MODULE_1__[\"bindJquerys\"])();\r\n  newGame();\r\n  Object(_src_js_UI_js__WEBPACK_IMPORTED_MODULE_1__[\"initUIFunctions\"])();\r\n  Object(_src_js_UI_js__WEBPACK_IMPORTED_MODULE_1__[\"initSettingsFunctions\"])();\r\n});\r\n\r\nfunction newGame() {\r\n  Object(_src_js_Field_js__WEBPACK_IMPORTED_MODULE_4__[\"createField\"])();\r\n  Object(_src_js_UI_js__WEBPACK_IMPORTED_MODULE_1__[\"setZoom\"])();\r\n  Object(_src_js_Game_js__WEBPACK_IMPORTED_MODULE_3__[\"createBombs\"])();\r\n  Object(_src_js_Points_js__WEBPACK_IMPORTED_MODULE_2__[\"setupPoints\"])();\r\n  Object(_src_js_UI_js__WEBPACK_IMPORTED_MODULE_1__[\"initFieldFunctions\"])();\r\n  Object(_src_js_Game_js__WEBPACK_IMPORTED_MODULE_3__[\"setAmountFields\"])();\r\n  Object(_src_js_UI_js__WEBPACK_IMPORTED_MODULE_1__[\"resetButton\"])();\r\n  gameWon = false;\r\n  Object(_src_js_Timer_js__WEBPACK_IMPORTED_MODULE_0__[\"resetTimer\"])();\r\n}\r\n\r\nfunction deleteGame() {\r\n  $(topBorder).empty();\r\n  $(middleBorder).empty();\r\n  $(fieldContainer).empty();\r\n  $(bottomBorder).empty();\r\n}\r\n\r\nfunction resetGame() {\r\n  deleteGame();\r\n  rows = parseInt($(inputRows).val());\r\n  columns = parseInt($(inputColumns).val());\r\n  bombs = parseInt($(inputBombs).val());\r\n\r\n  if (rows < 8) {\r\n    rows = 8;\r\n    $(inputRows).val(8);\r\n  }\r\n\r\n  if (columns < 8) {\r\n    columns = 8;\r\n    $(inputColumns).val(8);\r\n  }\r\n\r\n  if (bombs < 1) {\r\n    bombs = 1;\r\n    $(inputBombs).val(1);\r\n  }\r\n\r\n  newGame();\r\n}\r\n\r\n// Debug Log\r\nfunction debugLog(message) {\r\n  if (debug) {\r\n    console.log(message);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./index.js?");

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

/***/ "./src/js/Field.js":
/*!*************************!*\
  !*** ./src/js/Field.js ***!
  \*************************/
/*! exports provided: createField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createField\", function() { return createField; });\nconst blockSize = 16;\r\nconst borderSize = 10;\r\n\r\nfunction createField() {\r\n  // set width an height of game\r\n  const gameHeight = blockSize * rows + 3 * borderSize + 32;\r\n  const gameWidth = blockSize * columns + 2 * borderSize;\r\n  $('#game').css({'height': gameHeight, 'width': gameWidth});\r\n  $('#gamebar').css('width', blockSize*columns + 2*borderSize);\r\n  $(fieldContainer).css('height', blockSize*rows);\r\n\r\n  // button and timer               half of the columns - half of button - lenth of first timer\r\n  $(gameButton).css({'margin-left': blockSize * columns / 2 - 13 - 49, 'margin-right': blockSize * columns / 2 - 13 - 49});\r\n\r\n  createTopBorder();\r\n  createMiddleBorder();\r\n  createBlocks();\r\n  createBottomBorder();\r\n}\r\n\r\nfunction createBlocks() {\r\n  for (let i = 1; i <= rows; i++) {\r\n    // create row div\r\n    $(fieldContainer).append('<div class=\"row\" id=\"r' + i + '\"></div>');\r\n    let rowid = '#r' + i;\r\n\r\n    // left border\r\n    $(rowid).append('<div class=\"border-vertical\"></div>');\r\n\r\n    // blocks loop\r\n    for (let j = 1; j <= columns; j++) {\r\n      // block\r\n      $(rowid).append('<div id=\"' + i + '-' + j +'\" class=\"block field\"></div>');\r\n    }\r\n\r\n    // right border\r\n    $(rowid).append('<div class=\"border-vertical\"></div>');\r\n  }\r\n}\r\n\r\nfunction createTopBorder() {\r\n  $(topBorder).append('<div class=\"border-tl\"></div>');\r\n  for (i = 1; i <= columns; i++) {\r\n    $(topBorder).append('<div class=\"border-horizontal\"></div>');\r\n  }\r\n  $(topBorder).append('<div class=\"border-tr\"></div>');\r\n}\r\n\r\nfunction createMiddleBorder() {\r\n  $(middleBorder).append('<div class=\"border-il\"></div>');\r\n  for (i = 1; i <= columns; i++) {\r\n    $(middleBorder).append('<div class=\"border-horizontal\"></div>');\r\n  }\r\n  $(middleBorder).append('<div class=\"border-ir\"></div>');\r\n}\r\n\r\nfunction createBottomBorder() {\r\n  $(bottomBorder).append('<div class=\"border-bl\"></div>');\r\n  for (i = 1; i <= columns; i++) {\r\n    $(bottomBorder).append('<div class=\"border-horizontal\"></div>');\r\n  }\r\n  $(bottomBorder).append('<div class=\"border-br\"></div>');\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/Field.js?");

/***/ }),

/***/ "./src/js/Game.js":
/*!************************!*\
  !*** ./src/js/Game.js ***!
  \************************/
/*! exports provided: setAmountFields, createBombs, checkBomb, fieldClicked, flagField, checkSurroundings, winGame, clickFieldsAround, bombClicked, getID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setAmountFields\", function() { return setAmountFields; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createBombs\", function() { return createBombs; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkBomb\", function() { return checkBomb; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fieldClicked\", function() { return fieldClicked; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"flagField\", function() { return flagField; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkSurroundings\", function() { return checkSurroundings; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"winGame\", function() { return winGame; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clickFieldsAround\", function() { return clickFieldsAround; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bombClicked\", function() { return bombClicked; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getID\", function() { return getID; });\n/* harmony import */ var _Points_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Points.js */ \"./src/js/Points.js\");\n/* harmony import */ var _Bomb_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Bomb.js */ \"./src/js/Bomb.js\");\n\r\n\r\n\r\nfunction setAmountFields() {\r\n  amountFields = rows * columns - bombs;\r\n}\r\n\r\nfunction createBombs() {\r\n  bombArray = [];\r\n\r\n  for (let i = 1; i <= bombs; i++) {\r\n    uniqueBomb = false;\r\n    // Generate random Bombs and check if they are unique\r\n    while (!uniqueBomb) {\r\n      randRow = Math.floor(Math.random() * columns) + 1;\r\n      randCol = Math.floor(Math.random() * rows) + 1;\r\n\r\n      if (checkBomb(randRow, randCol)) {\r\n        uniqueBomb = true;\r\n      }\r\n    }\r\n\r\n    // Add Bomb to the bombArray\r\n    bombArray.push(new _Bomb_js__WEBPACK_IMPORTED_MODULE_1__[\"Bomb\"](randRow, randCol));\r\n\r\n    // Debug\r\n    if (showBombs) {\r\n      block = '#' + randRow + '-' + randCol;\r\n      $(block).toggleClass('field bomb');\r\n    }\r\n  }\r\n}\r\n\r\n// Returns true if field is no bomb\r\nfunction checkBomb(row, col) {\r\n  amountBombs = bombArray.length;\r\n\r\n  // Error handling\r\n  if (isNaN(row)) {\r\n    error = new Error('Row is NaN');\r\n    throw error;\r\n  }\r\n\r\n  if (isNaN(col)) {\r\n    error = new Error('Col is NaN');\r\n    throw error;\r\n  }\r\n\r\n  for (let i=0; i<amountBombs; i++) {\r\n    if (bombArray[i].row === row && bombArray[i].col === col) {\r\n      return false;\r\n    }\r\n  }\r\n  return true;\r\n}\r\n\r\n// process that runs if a field is clicked\r\nfunction fieldClicked(row, col, field='') {\r\n  if (field === '') {\r\n    id = getID(row, col);\r\n    field = $(id);\r\n  }\r\n\r\n  // returns if field is not on gamefield\r\n  // needed because function cluckFieldsAround() could process fields that are not on gamefield\r\n  if (row < 1 || row > rows || col < 1 || col > columns) {\r\n    return;\r\n  }\r\n\r\n  // if field was not clicked before\r\n  if (field.hasClass('field')) {\r\n    // if this field is a bomb\r\n    if (!checkBomb(row, col)) {\r\n      bombClicked(row, col, field);\r\n    } else {\r\n      amountFields--;\r\n      number = checkSurroundings(row, col);\r\n      $(field).toggleClass('field f' + number + ' clicked');\r\n      $(field).attr('data-value', number);\r\n\r\n      // if zero bombs around reveal the fields around\r\n      if (number === 0) {\r\n        clickFieldsAround(row, col);\r\n      }\r\n\r\n      // win game when all fields which are not bombs are clicked\r\n      if (amountFields === 0) {\r\n        winGame();\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n// flags a field on rightclick\r\nfunction flagField(field) {\r\n  if ($(field).hasClass('flag')) {\r\n    Object(_Points_js__WEBPACK_IMPORTED_MODULE_0__[\"addPoint\"])();\r\n  } else {\r\n    Object(_Points_js__WEBPACK_IMPORTED_MODULE_0__[\"removePoint\"])();\r\n  }\r\n\r\n  $(field).toggleClass('field flag');\r\n}\r\n\r\n// calculates how many bombs are around a field\r\nfunction checkSurroundings(row, col) {\r\n  number = 0;\r\n  // row\r\n  for (let r = -1; r <= 1; r++) {\r\n    for (let c =- 1; c <= 1; c++) {\r\n      if (!checkBomb(row+r, col+c)) {\r\n        number++;\r\n      }\r\n    }\r\n  }\r\n  return number;\r\n}\r\n\r\nfunction winGame() {\r\n  if (!gameWon) {\r\n    // show win button\r\n    $(gameButton).toggleClass('btn-smiley btn-cool');\r\n\r\n    // show not flagged bombs as flagged\r\n    for (let i=0; i < bombs; i++) {\r\n      row = bombArray[i].row;\r\n      col = bombArray[i].col;\r\n\r\n      field = getID(row, col);\r\n\r\n      if (!$(field).hasClass('flag')) {\r\n        flagField($(field));\r\n      }\r\n    }\r\n\r\n    addTime(rows + 'x' + columns + ', ' + bombs + ' Bombs', seconds);\r\n    stopTimer();\r\n  }\r\n\r\n  gameWon = true;\r\n}\r\n\r\n// opens fields around a field with 0 bombs around\r\nfunction clickFieldsAround(row, col) {\r\n  fieldClicked(row-1, col-1);\r\n  fieldClicked(row-1, col);\r\n  fieldClicked(row-1, col+1);\r\n\r\n  fieldClicked(row+1, col-1);\r\n  fieldClicked(row+1, col);\r\n  fieldClicked(row+1, col+1);\r\n\r\n  fieldClicked(row, col-1);\r\n  fieldClicked(row, col+1);\r\n}\r\n\r\n// process that runs if the player clicks on a bomb\r\nfunction bombClicked(row, col, field) {\r\n  // mark clicked bomb red\r\n  $(field).toggleClass('field bomb-red clicked');\r\n\r\n  // stop timer\r\n  stopTimer();\r\n\r\n  // dead button\r\n  $(gameButton).toggleClass('btn-smiley btn-dead');\r\n\r\n  // show all other bombs\r\n  for (let i=0; i<bombs; i++) {\r\n    if (bombArray[i].row !== row || bombArray[i].col !== col) {\r\n      id = getID(bombArray[i].row, bombArray[i].col);\r\n      $(id).toggleClass('field bomb');\r\n    }\r\n  }\r\n\r\n  // check if all flagged fields are really bombs\r\n  $('.flag').each(function() {\r\n    id = $(this).attr('id');\r\n    row = parseInt(id.split('-')[0]);\r\n    col = parseInt(id.split('-')[1]);\r\n\r\n    id = '#' + id;\r\n\r\n    // if no bomb\r\n    if (checkBomb(row, col)) {\r\n      $(id).toggleClass('flag no-bomb');\r\n    }\r\n  });\r\n\r\n  // lock all fields\r\n  for (let r=1; r<= rows; r++) {\r\n    for (let c=1; c<= columns; c++) {\r\n      id = getID(r, c);\r\n      $(id).addClass('clicked');\r\n    }\r\n  }\r\n}\r\n\r\n// returns the ID of a field\r\nfunction getID(row, col) {\r\n  return '#' + row + '-' + col;\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/Game.js?");

/***/ }),

/***/ "./src/js/Points.js":
/*!**************************!*\
  !*** ./src/js/Points.js ***!
  \**************************/
/*! exports provided: setupPoints, addPoint, removePoint, pointerClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setupPoints\", function() { return setupPoints; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addPoint\", function() { return addPoint; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removePoint\", function() { return removePoint; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pointerClass\", function() { return pointerClass; });\n\r\nfunction setupPoints() {\r\n  points = bombs;\r\n\r\n  pointsArray = splitNumber(points);\r\n\r\n  pointerClass(3, pointsArray[0]);\r\n  pointerClass(2, pointsArray[1]);\r\n  pointerClass(1, pointsArray[2]);\r\n}\r\n\r\nfunction addPoint() {\r\n  points++;\r\n  pointsArray = splitNumber(points);\r\n\r\n  pointerClass(3, pointsArray[0]);\r\n  pointerClass(2, pointsArray[1]);\r\n  pointerClass(1, pointsArray[2]);\r\n\r\n  if (points < 0) {\r\n    pointerClass(1, '-');\r\n  }\r\n}\r\n\r\nfunction removePoint() {\r\n  points--;\r\n  pointsArray = splitNumber(points);\r\n\r\n  pointerClass(3, pointsArray[0]);\r\n  pointerClass(2, pointsArray[1]);\r\n  pointerClass(1, pointsArray[2]);\r\n\r\n  if (points < 0) {\r\n    pointerClass(1, '-');\r\n  }\r\n}\r\n\r\nfunction pointerClass(display, number) {\r\n  number = (number === undefined) ? 0 : number;\r\n  pointsID = '#points-' + display;\r\n\r\n  $(pointsID).removeClass('d-');\r\n  for (let i=0; i<=9; i++) {\r\n    $(pointsID).removeClass('d' + i);\r\n  }\r\n\r\n  // add new class\r\n  $(pointsID).addClass('d' + number);\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/Points.js?");

/***/ }),

/***/ "./src/js/Timer.js":
/*!*************************!*\
  !*** ./src/js/Timer.js ***!
  \*************************/
/*! exports provided: resetTimer, startTimer, timerClass, stopTimer, setTimerToZero */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"resetTimer\", function() { return resetTimer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"startTimer\", function() { return startTimer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"timerClass\", function() { return timerClass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"stopTimer\", function() { return stopTimer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setTimerToZero\", function() { return setTimerToZero; });\nlet interval;\r\n\r\nfunction resetTimer() {\r\n  seconds = 0;\r\n  stopTimer();\r\n  setTimerToZero();\r\n  startTimer();\r\n}\r\n\r\nfunction startTimer() {\r\n  interval = setInterval(function() {\r\n    seconds++;\r\n\r\n    if (seconds === 999) {\r\n      stopTimer();\r\n    }\r\n\r\n    secondsArray = splitNumber(seconds);\r\n\r\n    timerClass(3, secondsArray[0]);\r\n    timerClass(2, secondsArray[1]);\r\n    timerClass(1, secondsArray[2]);\r\n  }, 1000);\r\n}\r\n\r\nfunction timerClass(digit, number) {\r\n  number = (number === undefined) ? 0 : number;\r\n  timerID = '#timer-' + digit;\r\n\r\n  currentstate = parseInt($(timerID).attr('class').split('d')[2]);\r\n  if (currentstate !== number) {\r\n    for (let i=0; i<=9; i++) {\r\n      $(timerID).removeClass('d' + i);\r\n    }\r\n    $(timerID).addClass('d' + number);\r\n  }\r\n}\r\n\r\nfunction stopTimer() {\r\n  clearInterval(interval);\r\n}\r\n\r\nfunction setTimerToZero() {\r\n  timerClass(3, 0);\r\n  timerClass(2, 0);\r\n  timerClass(1, 0);\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/Timer.js?");

/***/ }),

/***/ "./src/js/UI.js":
/*!**********************!*\
  !*** ./src/js/UI.js ***!
  \**********************/
/*! exports provided: initUIFunctions, initFieldFunctions, initSettingsFunctions, resetButton, bindJquerys, setZoom, splitNumber, addTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initUIFunctions\", function() { return initUIFunctions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initFieldFunctions\", function() { return initFieldFunctions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initSettingsFunctions\", function() { return initSettingsFunctions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"resetButton\", function() { return resetButton; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bindJquerys\", function() { return bindJquerys; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setZoom\", function() { return setZoom; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"splitNumber\", function() { return splitNumber; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addTime\", function() { return addTime; });\nfunction initUIFunctions() {\r\n  $(gameButton).mousedown(function() {\r\n    $(gameButton).toggleClass('btn-smiley btn-click');\r\n  });\r\n\r\n  $(document).mouseup(function() {\r\n    if ($(gameButton).hasClass('btn-wow')) {\r\n      $(gameButton).toggleClass('btn-smiley btn-wow');\r\n    }\r\n\r\n    if ($(gameButton).hasClass('btn-click')) {\r\n      $(gameButton).toggleClass('btn-smiley btn-click');\r\n    }\r\n  });\r\n\r\n  $(gameButton).click(function() {\r\n    resetGame();\r\n  });\r\n\r\n  $('input:radio').click(function() {\r\n    value = parseInt($(this).val());\r\n    $(game).css('zoom', value);\r\n  });\r\n}\r\n\r\nfunction initFieldFunctions() {\r\n  field = $('.field');\r\n  field.click(function() {\r\n    id = $(this).attr('id');\r\n    row = parseInt(id.split('-')[0]);\r\n    col = parseInt(id.split('-')[1]);\r\n    fieldClicked(row, col, $(this));\r\n  });\r\n\r\n  field.on('contextmenu', function() {\r\n    id = $(this).attr('id');\r\n    row = parseInt(id.split('-')[0]);\r\n    col = parseInt(id.split('-')[1]);\r\n    flagField($(this));\r\n  });\r\n\r\n  field.mousedown(function() {\r\n    $(gameButton).toggleClass('btn-smiley btn-wow');\r\n  });\r\n}\r\n\r\nfunction initSettingsFunctions() {\r\n  $(newGameButton).click(function() {\r\n    resetGame();\r\n  });\r\n\r\n  $(settingsContainer).css({'margin-left': 100% - gameWidth / 2, 'margin-right': 100% - gameWidth / 2});\r\n}\r\n\r\nfunction resetButton() {\r\n  if ($(gameButton).hasClass('btn-smiley')) {\r\n    return;\r\n  } else if ($(gameButton).hasClass('btn-dead')) {\r\n    $(gameButton).toggleClass('btn-dead btn-smiley');\r\n  } else if ($(gameButton).hasClass('btn-cool')) {\r\n    $(gameButton).toggleClass('btn-cool btn-smiley');\r\n  }\r\n}\r\n\r\nfunction bindJquerys() {\r\n  const game = $('#game');\r\n\r\n  const newGameButton = $('#newgame-btn');\r\n  const gameButton = $('#game-button');\r\n\r\n  const topBorder = $('.top-border');\r\n  const middleBorder = $('.middle-border');\r\n  const bottomBorder = $('.bottom-border');\r\n\r\n  const fieldContainer = $('#field-container');\r\n  const settingsContainer = $('#settings-container');\r\n\r\n  const inputRows = $('#input-rows');\r\n  const inputColumns = $('#input-columns');\r\n  const inputBombs = $('#input-bombs');\r\n\r\n  const scores = $('#scores');\r\n}\r\n\r\nfunction setZoom() {\r\n  documentHeight = $( document ).height();\r\n  documentWidth = $( document ).width();\r\n  zoom = (documentWidth - 16) / gameWidth;\r\n  console.log(documentWidth + '-16 / ' + gameWidth);\r\n\r\n  if (documentWidth > documentHeight) {\r\n    if (zoom > 3) {\r\n      zoom = 3;\r\n    }\r\n  }\r\n\r\n  $('#game').css({'zoom': zoom});\r\n}\r\n\r\n// DisplayFunctions\r\nfunction splitNumber(number) {\r\n  const numberArray = [];\r\n\r\n  number = Math.abs(number);\r\n\r\n  while (number > 0) {\r\n    numberArray[numberArray.length] = number % 10;\r\n    number = parseInt(number / 10);\r\n  }\r\n\r\n  return numberArray;\r\n}\r\n\r\n// Times Table\r\nfunction addTime(settings, time) {\r\n  if ($(scores).hasClass('hidden')) {\r\n    $(scores).toggleClass('hidden visible');\r\n  }\r\n\r\n  $(scores).find('tbody:last-child').append('<tr><td>' + settings + '</td><td>' + time + '</td></tr>');\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/UI.js?");

/***/ })

/******/ });