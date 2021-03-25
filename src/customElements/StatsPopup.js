import changeBestGame from '../js/db/changeBestGames';

/* eslint-disable require-jsdoc */
const template = document.createElement('template');
template.innerHTML = `
<div id="stats-popup"
class="fixed h-screen bottom-0 md:bottom-auto inset-x-0 px-4 py-6 sm:inset-0 invisible overflow-y-auto">
<div class="sm:p-0 sm:flex sm:items-center sm:justify-center h-screen">
  <div class="fixed inset-0 transition-opacity">
    <div class="absolute inset-0 bg-gray-500 opacity-75 dark:bg-coal"></div>
  </div>
  <div
    class="bg-white bg-opacity-75 rounded-lg px-4 pt-5 pb-4 shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6 background-blur-5 dark:bg-darkCoalTransparent"
    role="dialog" aria-modal="true" aria-labelledby="Stats">
    <div class="overflow-auto">
      <div class="text-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-coolGray-300" id="modal-headline">
          Stats
        </h3>
        <div class="my-5 grid grid-cols-3 rounded-lg bg-gray-50 overflow-hidden shadow dark:bg-gray-900">
          <div>
            <div class="px-2 py-5">
              <dl>
                <dt class="text-base leading-6 font-normal text-gray-900 dark:text-cool-gray-300">
                  Total Games
                </dt>
                <dd class="mt-1">
                  <div id="stats-total-games" class="text-2xl leading-8 font-semibold text-indigo-600 text-center">
                  </div>
                </dd>
              </dl>
            </div>
          </div>
          <div class="border-gray-200 md:border-0 md:border-l dark:border-trueGray-900">
            <div class="px-2 py-5">
              <dl>
                <dt class="text-base leading-6 font-normal text-gray-900 dark:text-cool-gray-300">
                  Won
                </dt>
                <dd class="mt-1 justify-between items-baseline flex">
                  <div id="stats-won-games"
                    class="items-baseline text-2xl leading-8 font-semibold text-indigo-600 w-1/2">
                  </div>
                  <div id="stats-won-ratio"
                    class="text-sm leading-5 font-medium text-gray-500 w-1/2 dark:text-cool-gray-400">
                  </div>
                </dd>
              </dl>
            </div>
          </div>
          <div class="border-gray-200 md:border-0 md:border-l dark:border-trueGray-900">
            <div class="px-2 py-5">
              <dl>
                <dt class=" text-base leading-6 font-normal text-gray-900 dark:text-cool-gray-300">
                  Lost
                </dt>
                <dd class="mt-1 justify-between items-baseline flex">
                  <div id="stats-lost-games"
                    class="items-baseline text-2xl leading-8 font-semibold text-indigo-600 w-1/2"></div>
                  <div id="stats-lose-ratio"
                    class="text-sm leading-5 font-medium text-gray-500 w-1/2 dark:text-cool-gray-400">
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="mb-2">
          <h4 class="inline-block text-gray-800 font-semibold float-left dark:text-cool-gray-400">Best 5 games:</h4>
          <div class="inline-block relative w-64 mt-1">
            <select id="stats-mode-select"
              class="block appearance-none h-8 w-full bg-white border border-gray-400 hover:border-gray-500 dark:bg-coolGray-700 dark:border-coolGray-800 dark:text-cool-gray-400
              px-4 py-1 pr-8 rounded shadow leading-tight focus:outline-none focus:ring focus:ring-green-200 dark:focus:ring-blueGray-600">
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-cool-gray-400">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="stats-table-container">
          <table id="best-scores" class="stats-table">
            <thead class="stats-table-head">
              <tr>
                <th class="stats-table-header-cell">W/L</th>
                <th class="stats-table-header-cell">Mode</th>
                <th class="stats-table-header-cell">Time</th>
                <th class="stats-table-header-cell">Date</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
        <h4 class="text-gray-800 font-semibold text-left my-2 dark:text-cool-gray-400">Last 5 games:</h4>
        <div class="stats-table-container">
          <table id="scores" class="stats-table">
            <thead class="stats-table-head">
              <tr>
                <th class="stats-table-header-cell">W/L</th>
                <th class="stats-table-header-cell">Mode</th>
                <th class="stats-table-header-cell">Time</th>
                <th class="stats-table-header-cell">Date</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="mt-5 sm:mt-6">
      <span class="flex w-full rounded-md shadow-sm sm:col-start-2">
        <button id="stats-close-btn" type="button"
          class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200 dark:focus:ring-blueGray-600 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
          Close
        </button>
      </span>
    </div>
  </div>
</div>
</div>
`;

class StatsPopup extends HTMLElement {
  constructor() {
    super();
    this.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.statsPopup = document.getElementById('stats-popup');
    this.statsModeSelect = document.getElementById('stats-mode-select');

    this.initListeners();
  }

  static get observedAttributes() {
    return ['show'];
  }

  initListeners() {
    this.statsModeSelect.addEventListener('change', e => {
      console.log('sl changed');
      changeBestGame(e.target.value);
    });
  }

  showPopup() {
    this.statsPopup.classList.remove('invisible');
  }

  hidePopup() {
    this.statsPopup.classList.add('invisible');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'show':
        if (newValue) {
          this.showPopup();
        } else {
          this.hidePopup();
        }
        break;
      default:
        console.log(`Unknown attribute "${name}" in stats-popup`);
    }
  }
}

window.customElements.define('stats-popup', StatsPopup);
