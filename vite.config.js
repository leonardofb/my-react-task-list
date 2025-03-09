import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/my-react-task-list/' : '/',
  build: {
    assetsInlineLimit: 0, // Evita que imágenes pequeñas se conviertan en Base64
  }
});
