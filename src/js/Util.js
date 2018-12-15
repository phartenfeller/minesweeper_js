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

export {splitNumber};
