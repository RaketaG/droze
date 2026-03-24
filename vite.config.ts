import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['ratatoskr.asuscomm.com'],
    proxy: {
      "/api": {
        target: "https://34.40.6.29",
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
})
