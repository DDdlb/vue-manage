import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3010,
    proxy:{
      '/api': {
        target: 'http://localhost:4000',
        // rewrite: path=>'http://localhost:4000/api/users/login'
      }
    }
  },
  
})
