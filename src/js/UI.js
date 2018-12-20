/**
 * Adds time in results table
 * @param {string} settings
 * @param {string} time
 */
function showTime(settings, time) {
  if ($(scores).hasClass('hidden')) {
    $(scores).removeClass('hidden');
    $(scores).addClass('visible');
  }

  $(scores)
    .find('tbody:last-child')
    .append(`<tr><td>${settings}</td><td>${time}</td></tr>`);
}

export { showTime };
