import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Configure Vite to always fallback to index.html for non-file paths
    historyApiFallback: true,
  }
})
