18:31-08/05/2026 : [Batch DOM Appends with DocumentFragment]
Learning: Appending DOM elements inside a loop causes multiple reflows, which is a common performance bottleneck in SPAs. Using a DocumentFragment allows batching these appends into a single 'live' DOM update.
Action: Always use DocumentFragment when generating table rows or lists dynamically from data arrays.

20:12-09/05/2026 : [Stale-While-Revalidate Service Worker]
Learning: A Cache-First strategy provides fast initial loads from cache but leaves content stale indefinitely unless cache keys are manually managed. A Stale-While-Revalidate strategy is better for PWA assets that update frequently, as it returns the fast cached response immediately while silently updating the cache in the background for the next load.
Action: Use Stale-While-Revalidate as the default caching strategy in sw.js for assets that can afford to be one version behind on the initial load but require background updates.

20:21-09/05/2026 : [Service Worker waitUntil()]
Learning: When implementing background updates in a Service Worker, such as updating the cache in a Stale-While-Revalidate pattern, the browser can terminate the Service Worker immediately after the `event.respondWith()` promise resolves. This can lead to race conditions where the cache never updates.
Action: Always wrap the background fetch promise in `event.waitUntil()` to ensure the Service Worker stays alive until the cache update completes.
