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
    const isDevelopment = process.env.NODE_ENV === "development"
    const isDevNomock = process.env.NODE_ENV === "dev-nomock"
    if (isDevelopment || isDevNomock) {
      const mockApi = isDevelopment ? 
        path.resolve(__dirname, "src/api-mock") : 
        path.resolve(__dirname, "src/empty.js")
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
            "@mock-api": mockApi
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
