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
  //   // host: 'localhost',
  //   // port: 8080,
  //   proxy: {
  //     "/api": {
  //       target: "https://manager-server.yyshino.top/",
  //       changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
  //       // secure: false,
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
