import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // The optional WebGL scene is lazy-loaded separately from the main interface.
  // Keep an explicit uncompressed budget for its rendering engine (about 144 kB gzip).
  build: { chunkSizeWarningLimit: 600 },
  server: { port: 5173, strictPort: true },
});
