/**
 * Splits each digit of a number to an array
 * @param  {number} number
 * @return {array}
 */
export default function splitNumber(number) {
  const numberArray = [];

  let unsigned = Math.abs(number);

  while (unsigned > 0) {
    numberArray[numberArray.length] = unsigned % 10;
    unsigned = parseInt(unsigned / 10);
  }

  return numberArray;
}
