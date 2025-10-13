import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';


// https://vite.dev/config/
export default defineConfig({
    plugins: [svgr()],
    resolve: {
        alias: {
            src: path.resolve(process.cwd(), 'src'),
        },
    },
    base: '/static/',
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
});
