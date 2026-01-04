import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'url';

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api/user': {
                target: 'http://localhost:8082',
                changeOrigin: true,
            },
            '/api/event': {
                target: 'http://localhost:8083',
                changeOrigin: true,
            },
            '/api/billing': {
                target: 'http://localhost:8084',
                changeOrigin: true,
            },
        },
    },
    resolve: {
        alias: {
            '@': r('./src'),
            '@components': r('./src/components'),
            '@api': r('./src/api'),
            '@pages': r('./src/pages'),
            '@store': r('./src/store'),
            '@styles': r('./src/styles'),
            '@utils': r('./src/utils'),
        },
    },
});
