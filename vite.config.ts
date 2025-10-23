import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'url';

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': r('./src'),
      '@components': r('./src/components'),
      '@apiService': r('./src/apiService'),
      '@pages': r('./src/pages'),
      '@store': r('./src/store'),
      '@styles': r('./src/styles'),
    },
  },
});
