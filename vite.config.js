import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteSvgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';
// https://vitejs.dev/config/
export default defineConfig({
	root: '.',
	build: {
		emptyOutDir: true,
		outDir: '../webtoon_server/public',
	},
	plugins: [react(), viteSvgr(), eslint()],
	server: {
		port: 3000,
	},
	preview: {
		port: 3000,
	},
	resolve: {
		alias: [{ find: '@', replacement: '/src' }],
	},
});
