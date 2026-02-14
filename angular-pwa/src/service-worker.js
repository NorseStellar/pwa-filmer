const STATIC_CACHE = 'angular-static-v1';
const DYNAMIC_CACHE = 'angular-dynamic-v1';

// App shell (statiska filer)
const APP_SHELL = [
  './',
  './index.html',
  './assets/manifest.webmanifest',
  './assets/icons/icon-192x192.png',
  './assets/icons/icon-512x512.png',
];

// INSTALL – cachea statiska filer
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(APP_SHELL);
    }),
  );

  self.skipWaiting();
});

// ACTIVATE – rensa gamla cacher
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
            return caches.delete(key);
          }
        }),
      );
    }),
  );

  self.clients.claim();
});

// FETCH – network first + dynamisk cache
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkRes) => {
        return caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(event.request, networkRes.clone());
          return networkRes;
        });
      })
      .catch(() => {
        return caches.match(event.request).then((cachedRes) => {
          return cachedRes || caches.match('./index.html');
        });
      }),
  );
});
