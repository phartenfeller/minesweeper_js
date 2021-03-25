/**
 * Adds time in results table
 * @param {array} times
 */
function showTime(times, selector) {
  console.log({ times, selector });
  const tableRef = document.querySelector(selector);

  // clear all rows
  tableRef.innerText = '';

  times.forEach(time => {
    const row = tableRef.insertRow();
    const winLose = row.insertCell(0);
    const mode = row.insertCell(1);
    const seconds = row.insertCell(2);
    const date = row.insertCell(3);

    row.className = 'stats-table-row';

    winLose.appendChild(document.createTextNode(time.result.toUpperCase()));
    mode.appendChild(document.createTextNode(time.mode));
    seconds.appendChild(document.createTextNode(`${time.time}s`));
    date.appendChild(
      document.createTextNode(new Date(time.date).toLocaleString())
    );
  });
}

export default showTime;
