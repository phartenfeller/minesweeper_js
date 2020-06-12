/**
 * Adds time in results table
 * @param {array} times
 */
function showTime(times, selector = '#scores tbody') {
  const tableRef = document.querySelector(selector);
  for (let i = tableRef.rows.length - 1; i > 0; i -= 1) {
    tableRef.deleteRow(i);
  }
  times.forEach(time => {
    const row = tableRef.insertRow();
    const winLose = row.insertCell(0);
    const mode = row.insertCell(1);
    const seconds = row.insertCell(2);
    const date = row.insertCell(3);

    row.className =
      'px-6 py-4 whitespace-normal border-b border-gray-200 text-sm leading-5 text-gray-500';

    winLose.appendChild(document.createTextNode(time.result.toUpperCase()));
    mode.appendChild(document.createTextNode(time.mode));
    seconds.appendChild(document.createTextNode(`${time.time}s`));
    date.appendChild(
      document.createTextNode(new Date(time.date).toLocaleString())
    );
  });
}

export default showTime;
