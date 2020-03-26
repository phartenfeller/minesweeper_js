const CACHE_NAME = 'mnswpr-v1';
const FILES_TO_CACHE = [
  '/index.html',
  '/bundle.js',
  '/assets/sprites/spritesheet.png',
  '/src/css/minesweeper.css',
  '/src/css/ui.css',
  '/install.js',
  '/manifest.json'
];

self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
          return undefined;
        })
      )
    )
  );

  self.clients.claim();
});

self.addEventListener('fetch', event => {
  console.log('[ServiceWorker] Fetch');
  event.respondWith(
    caches.match(event.request).then(response => {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
