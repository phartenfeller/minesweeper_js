const scores = document.getElementById('scores');

/**
 * Adds time in results table
 * @param {string} settings
 * @param {string} time
 */
function showTime(settings, time) {
  if (scores.classList.contains('hidden')) {
    scores.classList.remove('hidden');
  }

  const tableRef = document.querySelector('#scores tbody');
  const row = tableRef.insertRow();
  const settingsCell = row.insertCell(0);
  const timeCell = row.insertCell(1);

  settingsCell.appendChild(document.createTextNode(settings));
  timeCell.appendChild(document.createTextNode(time));
}

export default showTime;
