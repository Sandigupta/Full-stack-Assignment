import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'   // ← added

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ← added
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
})
