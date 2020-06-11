/**
 * Splits each digit of a number to an array
 * @param  {number} number
 * @return {object}
 */
export default function splitNumber(number) {
  const numberObj = {};

  const unsigned = Math.abs(number);
  numberObj[1] = Math.floor((unsigned / 100) % 10);
  numberObj[2] = Math.floor((unsigned / 10) % 10);
  numberObj[3] = unsigned % 10;

  return numberObj;
}
