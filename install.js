const installButton = document.getElementById('btn-install');
let deferredInstallPrompt;

const installPWA = () => {
  deferredInstallPrompt.prompt();

  deferredInstallPrompt.userChoice.then(choice => {
    if (choice.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt', choice);
      installButton.hidden = true;
    } else {
      console.log('User dismissed the A2HS prompt', choice);
    }
    deferredInstallPrompt = null;
  });
};

const saveBeforeInstallPromptEvent = event => {
  deferredInstallPrompt = event;
  installButton.hidden = false;
  installButton.addEventListener('click', () => {
    installPWA();
  });
};

const logAppInstalled = event => {
  console.log('Minesweeper App was installed.', event);
};

window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);
window.addEventListener('appinstalled', logAppInstalled);
