import { changeClass } from './src/js/util';

const installButton = document.getElementById('btn-install');
let deferredInstallPrompt;

const urlParams = new URLSearchParams(window.location.search);
const startedParam = urlParams.get('started');
const startedAsPwa = startedParam === 'pwa';

const hideInstallButton = () => {
  changeClass(installButton, 'inline-flex', 'hidden');
};

const showInstallButton = () => {
  if (startedAsPwa) return;
  changeClass(installButton, 'hidden', 'inline-flex');
};

const installPWA = () => {
  deferredInstallPrompt.prompt();

  deferredInstallPrompt.userChoice.then(choice => {
    if (choice.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt', choice);
      hideInstallButton();
    } else {
      console.log('User dismissed the A2HS prompt', choice);
    }
    deferredInstallPrompt = null;
  });
};

const saveBeforeInstallPromptEvent = event => {
  deferredInstallPrompt = event;
  showInstallButton();
  installButton.addEventListener('click', () => {
    installPWA();
  });
};

const logAppInstalled = event => {
  console.log('Minesweeper App was installed.', event);
};

window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);
window.addEventListener('appinstalled', logAppInstalled);
