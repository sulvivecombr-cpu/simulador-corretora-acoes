const { defineConfig } = require('@vue/cli-service')

const isPreview = process.env.BASE44_PREVIEW_MODE === '1'
const proxyTarget = process.env.API_PROXY_TARGET || 'http://localhost:3000'

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    ...(isPreview ? { allowedHosts: 'all', client: false } : {}),
    proxy: {
      '/api': {
        target: proxyTarget,
        changeOrigin: true
      }
    }
  }
})
