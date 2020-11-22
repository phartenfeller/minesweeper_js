const setLightMode = () => {
  document.querySelector('html').classList.remove('dark');
  localStorage.theme = 'light';
};

const setDarkMode = () => {
  document.querySelector('html').classList.add('dark');
  localStorage.theme = 'dark';
};

const initDarkMode = () => {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    setDarkMode();
  } else {
    setLightMode();
  }
};

export { setDarkMode, setLightMode, initDarkMode };
