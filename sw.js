/**
 * Rescue-Net Service Worker
 * Enables offline caching, PWA installation, and offline disaster response operation.
 */

const CACHE_NAME = 'rescuenet-cache-v1.0';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon.svg',
  './css/style.css',
  './js/firebase-config.js',
  './js/app.js',
  './js/sos.js',
  './js/weather.js',
  './js/tracking.js',
  './js/drones.js',
  './js/mesh.js',
  './js/shelters.js'
];

// Install event - Cache core static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Rescue-Net SW] Pre-caching offline assets');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Rescue-Net SW] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - Cache-first with network fallback for static assets
self.addEventListener('fetch', (event) => {
  // Ignore non-GET requests or chrome-extension schemes
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached asset immediately
        return cachedResponse;
      }

      // Otherwise fetch from network and opportunistically cache
      return fetch(event.request).then((networkResponse) => {
        // Only cache valid basic responses for local assets
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          event.request.url.includes(self.location.origin)
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // If offline and request is for an HTML page, return index.html
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
