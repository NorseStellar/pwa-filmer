const CACHE_NAME = 'angular-pwa-cache-v1';

const APP_SHELL = [
  './',
  './index.html',
  './assets/manifest.webmanifest',
  './assets/icons/icon-192x192.png',
  './assets/icons/icon-512x512.png',
];

// Install - cachea statiska filer.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const file of APP_SHELL) {
        try {
          await cache.add(file);
          console.log('Cached:', file);
        } catch (err) {
          console.log('Could not cache:', file);
        }
      }
    }),
  );

  self.skipWaiting();
});

// Activate – rensa gamla cacher.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      ),
  );

  self.clients.claim();
});

// Fetch – cache first (app-shell), network fallback.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).catch(() => {
        // Offline fallback till index (SPA routing).
        return caches.match('./index.html');
      });
    }),
  );
});
