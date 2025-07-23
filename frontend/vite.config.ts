import path from 'path';
import { defineConfig } from 'vite'



// https://vite.dev/config/
export default defineConfig({
    base: "/static/",
    build: {
        outDir: '../backend/static/vite',
        emptyOutDir: true,
        manifest: 'vite_manifest.json',
        rollupOptions: {
            input: {
                main: path.resolve('index.html'),
            },
        },
    },
})
