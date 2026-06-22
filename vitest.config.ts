import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
	plugins: [
		svelte({
			compilerOptions: {
				runes: ({ filename }: { filename: string }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
			},
		}),
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./src/test/setup.ts'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			include: ['src/**/*.{js,ts}'],
			exclude: ['src/**/*.d.ts', 'src/test/**/*'],
		},
	},
	resolve: {
		alias: {
			$lib: path.resolve(__dirname, './src/lib'),
			'$app/stores': path.resolve(__dirname, './src/test/mocks/app-stores.ts'),
			'$app/navigation': path.resolve(__dirname, './src/test/mocks/app-navigation.ts'),
		},
		conditions: ['browser', 'import', 'module'],
	},
});
