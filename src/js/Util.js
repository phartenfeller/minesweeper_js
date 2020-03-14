import { debug } from '../../index.js';
import { clickedClass } from './DomObjects.js';

/**
 * Splits each digit of a number to an array
 * @param  {number} number
 * @return {array}
 */
function splitNumber(number) {
  const numberArray = [];

  number = Math.abs(number);

  while (number > 0) {
    numberArray[numberArray.length] = number % 10;
    number = parseInt(number / 10);
  }

  return numberArray;
}

/**
 * returns the id corresponding to row and col
 * @param  {number} row
 * @param  {number} col
 * @return {id}
 */
function getID(row, col) {
  return '#' + row + '-' + col;
}

/**
 * returns the selector corresponding to row and col
 * @param  {number} row
 * @param  {number} col
 * @return {string}
 */
function getSelector(row, col) {
  return `div[data-coords="${row}-${col}"]`;
}

/**
 * Returns true if you play locallay
 * @return {boolean}
 */
function checkDebug() {
  if (window.location.href.indexOf('localhost') > 0) {
    return true;
  } else {
    return false;
  }
}

/**
 * Logs if debug is on
 * @param {string} msg1
 * @param {string} msg2
 * @param {string} msg3
 * @param {string} msg4
 */
function debugLog(msg1, msg2 = '', msg3 = '', msg4 = '') {
  if (debug) {
    console.log(msg1, msg2, msg3, msg4);
  }
}

/**
 * Remove and Add class to element
 * @param {string} selector
 * @param {string} removeClass class which will get removed
 * @param {string} addClass class which will get added
 * @param {boolean} markClicked
 */
function changeClass(selector, removeClass, addClass, markClicked = false) {
  const classList = document.querySelector(selector).classList;
  console.log('classList', classList);
  classList.remove(removeClass);
  classList.add(addClass);

  if (markClicked) {
    classList.add(clickedClass);
  }
}

export { splitNumber, getID, checkDebug, debugLog, changeClass, getSelector };
