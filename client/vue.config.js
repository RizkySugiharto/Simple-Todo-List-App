const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: process.env.BACKEND_URI || "localhost:3000"
        }
      }
    }
  }
})
