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
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                const fetchPromise = fetch(event.request).then(networkResponse => {
                    // Optionally, we can put the new response in the cache
                    if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    }
                    return networkResponse;
                }).catch(() => {
                    // Network failed, we might handle offline fallbacks here if necessary
                });

                // Return the cached response immediately if there is one, otherwise wait for the network response
                return cachedResponse || fetchPromise;
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
