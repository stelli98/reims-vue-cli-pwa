if (workbox) {
  // workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

  workbox.precaching.precacheAndRoute(self.__precacheManifest);

  workbox.routing.registerNavigationRoute("/index.html");

  const queue = new workbox.backgroundSync.Queue("offlineMedicals");

  const networkWithBackgroundSync = new workbox.strategies.NetworkOnly({
    plugins: [
      {
        fetchDidFail: async ({ request }) => {
          console.log(request)
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
