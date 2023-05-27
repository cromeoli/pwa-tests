import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host:true,
    port:3000, // Este es el puerto que usa Docker
    https: false
  },
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        icons:[
          {
          src: "/icons/logo.png",
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
            color: '#F4E401'
          }
        ],
      },
      registerType: 'autoUpdate'
    }),
    mkcert()
  
  ],
    
})
