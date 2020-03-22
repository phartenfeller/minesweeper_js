/**
 * Removes all children of an element
 * @param {domElement} domElement
 */
export default function removeChildElements(domElement) {
  let child = domElement.lastElementChild;
  while (child) {
    domElement.removeChild(child);
    child = domElement.lastElementChild;
  }
}
