import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: true },
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        icons:[
          {
          src: "/icons/logo5.png",
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
          }
        ],
      },
      registerType: 'autoUpdate'
    }),
    mkcert()
  
  ],
    
})
