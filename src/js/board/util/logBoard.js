/**
 * Logs the borad in a readable format
 * @param {Board} board
 */
function logBoard(board) {
  board.forEach(row => {
    let str = '';
    row.forEach(block => {
      const val = block.value ? block.value : 0;
      str += `${val} `;
    });
    console.log(str);
  });
}

module.exports = logBoard;
