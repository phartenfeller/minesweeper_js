import { changeClass } from './util';

let darkState;
let themeToggle;
let themeToggleThumb;
const lightTranslate = 'translate-x-0';
const darkTranslate = 'translate-x-7';

const setLightMode = () => {
  document.querySelector('html').classList.remove('dark');
  localStorage.theme = 'light';
};

const setDarkMode = () => {
  document.querySelector('html').classList.add('dark');
  localStorage.theme = 'dark';
};

const applySetting = () => {
  if (darkState) {
    changeClass(themeToggleThumb, lightTranslate, darkTranslate);
    themeToggle.setAttribute('aria-checked', true);
    setDarkMode();
  } else {
    changeClass(themeToggleThumb, darkTranslate, lightTranslate);
    themeToggle.setAttribute('aria-checked', false);
    setLightMode();
  }
};

const initListeners = () => {
  /* Touch device theme toggle listeners */
  themeToggle = document.getElementById('theme-toggle');
  themeToggleThumb = document.getElementById('theme-toggle-thumb');
  applySetting();

  themeToggle.addEventListener('click', () => {
    darkState = !darkState;
    applySetting();
  });
};

const initDarkMode = () => {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    darkState = true;
    setDarkMode();
  } else {
    darkState = false;
    setLightMode();
  }

  initListeners();
};

export { setDarkMode, setLightMode, initDarkMode };
