const path = require("path");
module.exports = {
  devServer: {
    proxy: "http://localhost:9095"
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/styles/main.scss";`
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "development") {
      return {
        mode: "development",
        optimization: {
          runtimeChunk: "single",
          splitChunks: {
            chunks: "all"
          }
        },
        resolve: {
          alias: {
            "@mock-api": path.resolve(__dirname, "src/api-mock")
          }
        },
        devServer: {
          hot: false,
          port: 8100
        }
      };
    }
  },
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/service-worker.js",
      exclude: [/manifest\.json$/]
    }
  }
};
