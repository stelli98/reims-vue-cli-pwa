if (workbox) {
  workbox.precaching.precacheAndRoute(self.__precacheManifest);

  workbox.routing.registerNavigationRoute("/index.html");

  const queue = new workbox.backgroundSync.Queue("offlineMedicals", {
    maxRetentionTime: 30  // Retry for max of unit of minutes
  });

  const networkWithBackgroundSync = new workbox.strategies.NetworkOnly({
    plugins: [
      {
        fetchDidFail: async ({ request }) => {
          await queue.addRequest(request);
        }
      }
    ]
  });

  const addEventRoute = new workbox.routing.Route(
    ({ url }) => url.pathname === "/api/medicals",
    networkWithBackgroundSync,
    "POST"
  );

  workbox.routing.registerRoute(addEventRoute);
}
