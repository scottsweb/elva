// eslint.config.mjs
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';

export default defineConfig([
	globalIgnores(['dist/**', 'temp/**']),
	{
		files: ['**/*.{js,mjs,cjs}'],
		...js.configs.recommended
	},
	{
		files: ['**/*.{js,mjs,cjs}', '**/*.11tydata.js', 'content/_data/**/*.{js,mjs,cjs}', 'elva/**/*.{js,mjs,cjs}'],
		languageOptions: { globals: { ...globals.node } }
	},
	{
		files: ['content/assets/**/*.{js,mjs,cjs}', 'themes/js/**/*.{js,mjs,cjs}'],
		languageOptions: { globals: { ...globals.browser } }
	}
]);
