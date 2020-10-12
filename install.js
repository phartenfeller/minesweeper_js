const installButton = document.getElementById('btn-install');
let deferredInstallPrompt;

const urlParams = new URLSearchParams(window.location.search);
const startedParam = urlParams.get('started');
const startedAsPwa = startedParam === 'pwa';

const hideInstallButton = () => {
  installButton.classList.add('hidden');
  installButton.classList.remove('inline-flex');
};

const showInstallButton = () => {
  if (startedAsPwa) return;
  installButton.classList.add('inline-flex');
  installButton.classList.remove('hidden');
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
