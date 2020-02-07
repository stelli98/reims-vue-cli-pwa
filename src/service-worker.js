importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

if (workbox) {
  // workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

  workbox.precaching.precacheAndRoute(self.__precacheManifest);

  // workbox.routing.registerNavigationRoute("/index.html");

  workbox.routing.registerRoute(
    new RegExp("/api"),
    new workbox.strategies.NetworkOnly()
  );

  // const bgSyncPlugin = new workbox.backgroundSync.Plugin("medicalsOffline", {
  //   maxRetentionTime: 24 * 60 // Retry for max of 24 Hours
  // });

  // workbox.routing.registerRoute(
  //   new RegExp("/api/medicals"),
  //   workbox.strategies.networkOnly({
  //     plugins: [bgSyncPlugin]
  //   }),
  //   "POST"
  // );

  const showNotification = () => {
    self.registration.showNotification('Background sync success!', {
      body: '🎉`🎉`🎉`'
    });
  };

  const bgSyncPlugin = new workbox.backgroundSync.Plugin(
    'medicalsOffline',
    {
      callbacks: {
        queueDidReplay: showNotification
        // other types of callbacks could go here
      }
    }
  );

  const networkWithBackgroundSync = new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin],
  });

  workbox.routing.registerRoute(
    new RegExp("/api/medicals"),
    networkWithBackgroundSync,
    'POST'
  );

}
