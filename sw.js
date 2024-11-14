// Establish a cache name
const cacheName = 'assets_v1';

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(cacheName));
});

self.addEventListener("fetch", (event) => {
    // Let the browser do its default thing
    // for non-GET requests.
    if (event.request.method !== "GET") return;
  
    console.log({'fetch':event});
    // Prevent the default, and handle the request ourselves.
    event.respondWith(
      (async () => {
        // Try to get the response from a cache.
        const cache = await caches.open("dynamic-v1");
        console.log({'fetch_cache':cache});
        const cachedResponse = await cache.match(event.request);
  
        if (cachedResponse) {
          // If we found a match in the cache, return it, but also
          // update the entry in the cache in the background.
          event.waitUntil(cache.add(event.request));
          return cachedResponse;
        }
        event.waitUntil(cache.add(event.request));
        // If we didn't find a match in the cache, use the network.
        return fetch(event.request);
      })(),
    );
  });

self.addEventListener("activate", (event) => {
  console.log({'activate':event});});
self.addEventListener("message", (event) => {
  console.log({'message':event});});