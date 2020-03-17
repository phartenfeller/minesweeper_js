/**
 * Replace fieldcontainer to get rid of all event listeners
 */
export default function killEventListeners() {
  const fieldContainer = document.getElementById('field-container');
  const clone = fieldContainer.cloneNode(true);
  fieldContainer.parentNode.replaceChild(clone, fieldContainer);
}
