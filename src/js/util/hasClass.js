/**
 * Remove and Add class to element
 * @param {string} selector
 * @param {string} cssClass class which is checked
 */
export default function hasClass(element, cssClass) {
  const { classList } = element;
  return classList.contains(cssClass);
}
