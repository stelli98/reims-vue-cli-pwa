module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/styles/main.scss";`
      }
    }
  },
  // pwa: {
  //   workboxPluginMode: "InjectManifest",
  //   workboxOptions: {
  //     swSrc: "src/service-worker.js"
  //   }
  // }
};
