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

export {splitNumber, getID};
