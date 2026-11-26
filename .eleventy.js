// @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig

// Imports --------------------------------------------

import elva from '@elva/plugin';
import settings from './content/_data/settings.json' with { type: 'json' };

// 11ty -----------------------------------------------

export default async function (eleventyConfig) {

	// Global Settings --------------------------------

	eleventyConfig.addGlobalData('settings', {
		// these get merged with content/_data/settings.js
		url: process.env.URL || process.env.CF_PAGES_URL || 'http://localhost:8080',
		isProduction: process.env.NODE_ENV === 'production',
		isStaging:
			(process.env.URL && process.env.URL.includes('github.io')) ||
			(process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_BRANCH !== 'main') ||
			process.env.NODE_ENV === 'staging' ||
			false,
		theme: process.env.ELVA_THEME || settings.theme
	});

	// Plugins ----------------------------------------

	await eleventyConfig.addPlugin(elva());

	// Watch Targets ----------------------------------

	eleventyConfig.addWatchTarget('./content/assets');
	eleventyConfig.addWatchTarget('./themes/**/*.{css,js}');

	// Passthrough -------------------------------------

	eleventyConfig.addPassthroughCopy({'./content/assets/img/favicon.ico': './favicon.ico'});
	eleventyConfig.addPassthroughCopy({'./content/assets/img': './assets/img'});
	eleventyConfig.addPassthroughCopy({'./content/assets/svg': './assets/svg'});
	eleventyConfig.addPassthroughCopy({[`./themes/${eleventyConfig.globalData.settings.theme}/fonts`]: './assets/fonts'});
	eleventyConfig.addPassthroughCopy({'./content/assets/files': './assets/files'});

	return {
		markdownTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
		dataTemplateEngine: 'njk',

		// if your site deploys to a subdirectory, change `pathPrefix`
		pathPrefix: '/',

		dir: {
			input: 'content',
			output: 'dist',
			data: '_data',
			includes: `../themes/${eleventyConfig.globalData.settings.theme}/_includes`,
			layouts: `../themes/${eleventyConfig.globalData.settings.theme}/_layouts`
		}
	};
}
