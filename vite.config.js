import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path');
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vitejs.dev/config/
export default defineConfig({
  // 使用 @ 符号
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import '@/assets/style/base.scss';`
  //     }
  //   }
  // },

  // server: {
  //   host: 'https://company-admin-vue3-production.up.railway.app',
  //   port: 8080,
  //   proxy: {
  //     "/api": {
  //       target: "https://company-admin-server-production.up.railway.app/"
  //       // target: "http://localhost:3000"
  //     }
  //   }
  // },
  plugins: [
    vue(),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: '__tla',
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: i => `__tla_${i}`
    })
  ]
})
