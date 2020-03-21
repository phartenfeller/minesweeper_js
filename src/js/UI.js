import { changeClass } from 'util';
import { hiddenClass, visibleClass } from './DomObjects';

/**
 * Adds time in results table
 * @param {string} settings
 * @param {string} time
 */
function showTime(settings, time) {
  if ($(scores).hasClass(hiddenClass)) {
    changeClass(scores, hiddenClass, visibleClass);
  }

  $(scores)
    .find('tbody:last-child')
    .append(`<tr><td>${settings}</td><td>${time}</td></tr>`);
}

export { showTime };
