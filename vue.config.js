const { defineConfig } = require('@vue/cli-service');
const federation = require('./federation.json');

module.exports = defineConfig({
  publicPath: "http://localhost:8081",
  chainWebpack: config => {
    config.optimization.delete('splitChunks');
    config
    .plugin('module-federation-plugin')
    .use(require('webpack').container.ModuleFederationPlugin, [{
      ...federation,
      shared: {
        "vue": {
          eager: true,
          singleton: false
        }
      },
      filename: "remoteEntry.js"
    }])
  },
});
