import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), svgr()],
	server: { host: true },
	optimizeDeps: {
		exclude: ['js-big-decimal'],
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			assets: path.resolve(__dirname, './src/assets'),
			components: path.resolve(__dirname, './src/components'),
			hooks: path.resolve(__dirname, './src/hooks'),
			mocks: path.resolve(__dirname, './src/mocks'),
			pages: path.resolve(__dirname, './src/pages'),
			appRedux: path.resolve(__dirname, './src/redux'),
			types: path.resolve(__dirname, './src/types'),
			utils: path.resolve(__dirname, './src/utils'),
			services: path.resolve(__dirname, './src/services'),
		},
	},
});
