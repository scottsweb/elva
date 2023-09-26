// @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig 

// Imports --------------------------------------------

const { EleventyI18nPlugin, EleventyHtmlBasePlugin, EleventyRenderPlugin } = require('@11ty/eleventy');
const markdownIt = require('markdown-it');
const markdownItIns = require('markdown-it-ins');
const markdownItMark = require('markdown-it-mark');
const markdownItSub = require('markdown-it-sub');
const markdownItSup = require('markdown-it-sup');
const pluginRSS = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginEmbedEverything = require('eleventy-plugin-embed-everything');

// Local Imports --------------------------------------

const { formatDate } = require('./src/_config/filters/dates');

// 11ty -----------------------------------------------

module.exports = eleventyConfig => {

    // Global Settings --------------------------------

    eleventyConfig.addGlobalData('settings', {
        // these get merged with _data/settings.js
        url: process.env.URL || process.env.CF_PAGES_URL || 'http://localhost:8080',
        isProduction: process.env.NODE_ENV === 'production',
        isStaging: (process.env.URL && process.env.URL.includes('github.io')) || (process.env.CF_PAGES_URL && process.env.CF_PAGES_URL.includes('pages.dev')) || false
    });

    // Watch Targets ----------------------------------

    eleventyConfig.addWatchTarget('./src/assets');

    // Layouts ----------------------------------------

    eleventyConfig.addLayoutAlias('base', 'base.njk');
    eleventyConfig.addLayoutAlias('rss', 'rss.njk');
    eleventyConfig.addLayoutAlias('rssxsl', 'rss.xsl.njk');
    eleventyConfig.addLayoutAlias('json', 'json.njk');
    eleventyConfig.addLayoutAlias('manifest', 'manifest.njk');
    eleventyConfig.addLayoutAlias('home', 'home.njk');
    eleventyConfig.addLayoutAlias('page', 'page.njk');
    eleventyConfig.addLayoutAlias('post', 'post.njk');
    eleventyConfig.addLayoutAlias('posts', 'posts.njk');

    // Plugins ----------------------------------------

    eleventyConfig.addPlugin(require('./src/_config/plugins/drafts'));
    eleventyConfig.addPlugin(pluginRSS);
    eleventyConfig.addPlugin(pluginSyntaxHighlight);
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    eleventyConfig.addPlugin(EleventyRenderPlugin);
    eleventyConfig.addPlugin(EleventyI18nPlugin, { defaultLanguage: 'en' });
    eleventyConfig.addPlugin(pluginEmbedEverything, {
        use: ['twitter', 'youtube', 'vimeo'],
        twitter: {
            options: {
                embedClass: 'oembed oembed-twitter',
                doNotTrack: true
            }
        },
        vimeo: {
            options: {
                embedClass: 'oembed oembed-vimeo',
                //wrapperStyle
            }
        },
        youtube: {
            options: {
                embedClass: 'oembed oembed-youtube',
                modestBranding: true,
                lazy: true,
                lite: {
                    thumbnailQuality: 'maxresdefault',
                    css: {
                        inline: true
                    },
                    js: {
                        inline: true
                    }
                }
            }
        }
    });

    // Transforms -------------------------------------

    eleventyConfig.addPlugin(require('./src/_config/transforms/css'));
    eleventyConfig.addPlugin(require('./src/_config/transforms/html'));
    eleventyConfig.addPlugin(require('./src/_config/transforms/js'));

    // Shortcodes --------------------------------------

    eleventyConfig.addShortcode('version', () => `${+ new Date()}`);
    eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
    eleventyConfig.addShortcode('build', () => `${new Date().toISOString().split('T')[0]}`);
    eleventyConfig.addShortcode('image', require('./src/_config/shortcodes/image'));

    // Filters ----------------------------------------

    eleventyConfig.addFilter('formatDate', formatDate);
    eleventyConfig.addFilter('languageFilter', require('./src/_config/filters/language'));
    eleventyConfig.addFilter('translate', require('./src/_config/filters/translate'));
    eleventyConfig.addFilter('mimetype', require('./src/_config/filters/mimetype'));
    eleventyConfig.addFilter('cdnify', require('./src/_config/filters/cdnify'));
    eleventyConfig.addFilter('widont', require('./src/_config/filters/widont'));
    eleventyConfig.addFilter('random', require('./src/_config/filters/random'));
    eleventyConfig.addFilter('where', require('./src/_config/filters/where'));
    eleventyConfig.addFilter('sort', require('./src/_config/filters/sort'));
    eleventyConfig.addFilter('base64', require('./src/_config/filters/base64'));
    eleventyConfig.addFilter('readingTime', require('./src/_config/filters/readingtime'));


    // Passthrough -------------------------------------

    eleventyConfig.addPassthroughCopy({'./src/assets/files': './assets/files'})
    eleventyConfig.addPassthroughCopy({'./src/assets/img': './assets/img'})
    eleventyConfig.addPassthroughCopy({'./src/assets/fonts': './assets/fonts'})

    // Markdown ----------------------------------------

    eleventyConfig.setLibrary('md', markdownIt({
        html: true,
        linkify: true,
        typographer: true
    }));

    eleventyConfig.amendLibrary('md', (mdLib) => {
        mdLib.use(markdownItIns);
        mdLib.use(markdownItMark);
        mdLib.use(markdownItSub);
        mdLib.use(markdownItSup);
    });

    // 11ty Settings -----------------------------------

    return {
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
    
        // If your site deploys to a subdirectory, change `pathPrefix`
        pathPrefix: '/',

        dir: {
            input: 'src',
            output: 'dist',
            data: '_data',
            includes: '_includes',
            layouts: '_layouts'
        }
    }
}