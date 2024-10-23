export default function (eleventyConfig) {
	let logged = false;

	eleventyConfig.addPreprocessor('drafts', 'njk,md', (data) => {
		return data.settings.isProduction && data.draft ? false : undefined;
	});

	eleventyConfig.on('eleventy.before', () => {
		let text = 'Including';

		if (eleventyConfig.globalData.settings.isProduction) {
			text = 'Excluding';
		}

		if (!logged) {
			eleventyConfig.logger.message(`${text} drafts`);
		}

		logged = true;
	});
}