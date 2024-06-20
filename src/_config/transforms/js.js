import { minify } from 'terser';

export default eleventyConfig => {
    eleventyConfig.addTransform('js-minify', async (content, path) => {
        if (path && path.endsWith('.js') && eleventyConfig.globalData.settings.isProduction) {
            const minified = await minify(content);
            return minified.code;
        }
        return content;
    });
};