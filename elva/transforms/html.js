import minifyHtml from '@minify-html/node';
import { Buffer } from 'node:buffer';

export default eleventyConfig => {
    eleventyConfig.addTransform('html-minify', (content, path) => {
        if (path && path.endsWith('.html') && eleventyConfig.globalData.settings.isProduction) {
            try {
                const minified = minifyHtml.minify(Buffer.from(content), {
                    keep_closing_tags: true,
                    keep_comments: false,
                    allow_removing_spaces_between_attributes: false,
                    keep_ssi_comments: false,
                    minify_css: true,
                    minify_js: true,
                    preserve_brace_template_syntax: false
                });
                return minified.toString('utf-8');
            } catch (err) {
                console.error('Error minifying HTML:', err);
                return content;
            }
        }
        return content;
    });
};