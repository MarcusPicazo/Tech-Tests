import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuracion minima: React + salida a /dist (lo que publica Netlify).
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Equipos escolares antiguos: apuntamos a navegadores modernos pero sin exagerar.
    target: 'es2018',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Separar librerias grandes en su propio chunk: cachea mejor en
        // equipos lentos y mantiene cada archivo por debajo del limite.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          supabase: ['@supabase/supabase-js'],
        },
      },
    },
  },
  server: {
    port: 5174,
    open: false,
  },
});
