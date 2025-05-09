import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [
    angular()
  ],
  optimizeDeps: {
    include: ['xlsx']
  },
  resolve: {
    alias: {
      xlsx: 'xlsx/dist/xlsx.full.min.js'
    }
  },
  build: {
    commonjsOptions: {
      include: [/xlsx/, /node_modules/]
    }
  }
}); 