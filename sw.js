// Ersetzt den alten Offline-Speicher von app.nasuvia.ch: Zwischenspeicher leeren, sich selbst abmelden,
// damit jede Seite die Weiterleitung auf app.ordasio.ch bekommt.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) await caches.delete(k);
    await self.registration.unregister();
    for (const c of await self.clients.matchAll({ type: 'window' })) c.navigate(c.url);
  })());
});
