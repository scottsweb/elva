import { minify } from 'terser';

export default function (eleventyConfig) {
    eleventyConfig.addBundle('js', { toFileDirectory: 'assets/js', transforms: [
        async function(content) {
            if (eleventyConfig.globalData.settings.isProduction) {
                const minified = await minify(content);
                return minified.code;
            }
            return content;
        }
    ]});
}