const CACHE_NAME = 'peakload-cache-v12';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/main.js',
    '/js/calculator.js',
    '/js/i18n.js',
    '/manifest.json',
    '/404.html',
    '/privacy',
    '/terms',
    '/squat-1rm-calculator',
    '/bench-press-warm-up-planner',
    '/rpe-rir-translator',
    '/assets/icons/icon-192.png',
    '/assets/icons/icon-512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    // Only handle GET requests for caching
    if (event.request.method !== 'GET') {
        return;
    }

    // Optimization: Stale-While-Revalidate caching strategy
    // Returns cached response immediately for fast load times,
    // while simultaneously fetching the latest version from network to update cache in the background.
    event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
            return cache.match(event.request).then(cachedResponse => {
                const fetchPromise = fetch(event.request).then(networkResponse => {
                    // Update cache with new response
                    if (networkResponse && networkResponse.status === 200) {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                }).catch(() => {
                    // Optional: Return an offline fallback page here if applicable
                });

                // Ensure the Service Worker stays alive until the cache is updated
                event.waitUntil(fetchPromise);

                // Return cached response if available, otherwise wait for network fetch
                return cachedResponse || fetchPromise;
            });
        })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = new Set([CACHE_NAME]);
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.has(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
