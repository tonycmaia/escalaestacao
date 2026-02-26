const CACHE_NAME = 'escala-estacao-v1';
const ASSETS = [
    '/escalaestacao/',
    '/escalaestacao/index.html',
    '/escalaestacao/escala.html',
    '/escalaestacao/saldodefolgas.html',
    '/escalaestacao/style.css',
    '/escalaestacao/main.js',
    '/escalaestacao/352401712_1005867357243527_3584881947950458227_n.png',
    'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});

self.addEventListener('activate', (e) => {
    const cacheWhitelist = [CACHE_NAME];
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
