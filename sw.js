const CACHE_NAME = 'atlas-pc-cache-v1';

// Assets to cache immediately on installation (index, manifest, main icon, dynamic quiz data)
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './quiz-questions.json'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event (Cleanup of old caches)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting obsolete cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Handle same-origin requests
  if (requestUrl.origin === self.location.origin) {
    // Special handling for dynamic quiz data (quiz-questions.json)
    if (requestUrl.pathname.endsWith('quiz-questions.json')) {
      event.respondWith(
        fetch(event.request)
          .then((response) => {
            // Save inside cache for offline use
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
            console.log('[Service Worker] Updated dynamic quiz questions in cache');
            return response;
          })
          .catch(() => {
            // Offline fallback: serve from cache
            console.log('[Service Worker] Offline: serving quiz questions from cache');
            return caches.match(event.request).then((cachedResponse) => {
              if (cachedResponse) return cachedResponse;
              return caches.match('./quiz-questions.json') || caches.match('quiz-questions.json');
            });
          })
      );
      return;
    }

    // For HTML navigation requests, use a network-first falling back to cache strategy
    if (event.request.mode === 'navigate') {
      event.respondWith(
        fetch(event.request)
          .then((response) => {
            // Save inside cache
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
            return response;
          })
          .catch(() => {
            // Offline fallback: try exact HTML request or fallback to root index.html
            return caches.match(event.request).then((cachedResponse) => {
              if (cachedResponse) return cachedResponse;
              return caches.match('./index.html') || caches.match('index.html');
            });
          })
      );
      return;
    }

    // For static files (js, css, images, fetch, json), use Stale-While-Revalidate
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // Fire a background fetch to update the cache with the fresh version
          fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse.status === 200) {
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, networkResponse);
                });
              }
            })
            .catch(() => { /* Ignore background network errors */ });
          
          return cachedResponse;
        }

        // Cache miss: request from network and save to cache
        return fetch(event.request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        }).catch((err) => {
          console.log('[Service Worker] Fetch failed (offline & not cached):', err);
          // If offline and request fails, try matching index.html if it looks like a path
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('./index.html') || caches.match('index.html');
          }
        });
      })
    );
  }
});
