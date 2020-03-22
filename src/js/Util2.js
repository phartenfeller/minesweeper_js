const debug = true;

/** delete
 * returns the id corresponding to row and col
 * @param  {number} row
 * @param  {number} col
 * @return {id}
 */
function getID(row, col) {
  return `#${row}-${col}`;
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
  }
  return false;
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

export { getID, checkDebug, debugLog, getSelector };
