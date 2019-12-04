if (workbox) {
  // adjust log level for displaying workbox logs
  workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

  // apply precaching. In the built version, the precacheManifest will
  // be imported using importScripts (as is workbox itself) and we can
  // precache this. This is all we need for precaching
  workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

  // Make sure to return a specific response for all navigation requests.
  // Since we have a SPA here, this should be index.html always.
  // https://stackoverflow.com/questions/49963982/vue-router-history-mode-with-pwa-in-offline-mode
  workbox.routing.registerNavigationRoute("/index.html");

  workbox.routing.registerRoute(
    new RegExp("/api"),
    new workbox.strategies.NetworkOnly()
  );
  
  const bgSyncPlugin = new workbox.backgroundSync.Plugin("medicalsOffline", {
    maxRetentionTime: 24 * 60 // Retry for max of 24 Hours
  });

  workbox.routing.registerRoute(
    new RegExp("/api/medicals"),
    workbox.strategies.networkOnly({
      plugins: [bgSyncPlugin]
    }),
    "POST"
  );
}
