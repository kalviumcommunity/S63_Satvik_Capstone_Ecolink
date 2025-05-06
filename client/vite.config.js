import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy /api requests to the backend server
      '/api': {
        target: 'http://localhost:5000', // Your backend server address
        changeOrigin: true, // Needed for virtual hosted sites
        secure: false,      // Optional: Set to false if backend uses self-signed certificate
        // Optional: Rewrite path if backend expects different paths
        // rewrite: (path) => path.replace(/^\/api/, '') 
      }
    }
  }
})
