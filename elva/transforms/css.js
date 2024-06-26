import CleanCSS from 'clean-css';

export default eleventyConfig => {
    eleventyConfig.addTransform('css-minify', (content, path) => {
        if (path && path.endsWith('.css') && eleventyConfig.globalData.settings.isProduction) {
            return new CleanCSS().minify(content).styles;
        }
        return content;
    });
};