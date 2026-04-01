import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import mkcert from 'vite-plugin-mkcert';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    mkcert(),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['ratatoskr.asuscomm.com'],
    proxy: {
      "/api": {
        target: "https://34.159.133.242",
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }
  }
})
