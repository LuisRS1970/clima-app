const CACHE_NAME = "clima-app-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/icono.png"
];

// Instalar cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Interceptar peticiones
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});