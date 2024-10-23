export default function (eleventyConfig) {
	let logged = false;

	eleventyConfig.addPreprocessor('drafts', 'njk,md', (data) => {
		data.settings.isProduction && data.draft ? false : undefined;
	});

	eleventyConfig.on('eleventy.before', ({runMode}) => {
		let text = 'Excluding';

		if ( runMode === 'serve' || runMode === 'watch' ) {
			text = "Including";
		}

		if (!logged) {
			eleventyConfig.logger.message(`${text} drafts`);
		}

		logged = true;
	});
}