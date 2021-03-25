import domObjects from '../DomObjects';

/**
 * Remove and Add class to element
 * @param {string} selector
 * @param {string} removeClass class which will get removed
 * @param {string} addClass class which will get added
 * @param {boolean} markClicked
 */
export default function changeClass(
  element,
  removeClass,
  addClass,
  markClicked = false
) {
  const { classList } = element;
  classList.remove(removeClass);
  classList.add(addClass);

  if (markClicked) {
    classList.add(domObjects.clickedClass);
  }
}
