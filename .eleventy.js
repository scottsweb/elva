// @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig 

// Imports --------------------------------------------

import { EleventyI18nPlugin, EleventyHtmlBasePlugin, EleventyRenderPlugin } from '@11ty/eleventy';
import markdownIt from 'markdown-it';
import markdownItIns from 'markdown-it-ins';
import markdownItMark from 'markdown-it-mark';
import markdownItSub from 'markdown-it-sub';
import markdownItSup from 'markdown-it-sup';
import pluginRSS from '@11ty/eleventy-plugin-rss';
import pluginSyntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import pluginEmbedEverything from 'eleventy-plugin-embed-everything';

// Local ---------------------------------------------

// Plugins
import drafts from './src/_config/plugins/drafts.cjs';

// Transforms
import transformCSS from './src/_config/transforms/css.js';
import transformHTML from './src/_config/transforms/html.js';
import transformJS from './src/_config/transforms/js.js';

// Shortcodes
import image from './src/_config/shortcodes/image.js';

// Filters
import base64 from './src/_config/filters/base64.js';
import cdnify from './src/_config/filters/cdnify.js';
import { formatDate } from './src/_config/filters/dates.js';
import languageFilter from './src/_config/filters/language.js';
import mimetype from './src/_config/filters/mimetype.js';
import random from './src/_config/filters/random.js';
import readingTime from './src/_config/filters/readingtime.js';
import sort from './src/_config/filters/sort.js';
import translate from './src/_config/filters/translate.js';
import where from './src/_config/filters/where.js';

// 11ty -----------------------------------------------

export default async function(eleventyConfig) {

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

    await eleventyConfig.addPlugin(pluginRSS);
    eleventyConfig.addPlugin(drafts);
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    eleventyConfig.addPlugin(EleventyRenderPlugin);
    eleventyConfig.addPlugin(EleventyI18nPlugin, { defaultLanguage: 'en' });
    eleventyConfig.addPlugin(pluginSyntaxHighlight);
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

    eleventyConfig.addPlugin(transformCSS);
    eleventyConfig.addPlugin(transformHTML);
    eleventyConfig.addPlugin(transformJS);

    // Shortcodes --------------------------------------

    eleventyConfig.addShortcode('version', () => `${+ new Date()}`);
    eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
    eleventyConfig.addShortcode('build', () => `${new Date().toISOString().split('T')[0]}`);
    eleventyConfig.addShortcode('image', image);

    // Filters ----------------------------------------

    eleventyConfig.addFilter('base64', base64);
    eleventyConfig.addFilter('cdnify', cdnify);
    eleventyConfig.addFilter('formatDate', formatDate);
    eleventyConfig.addFilter('languageFilter', languageFilter);
    eleventyConfig.addFilter('mimetype', mimetype);
    eleventyConfig.addFilter('random', random);
    eleventyConfig.addFilter('readingTime', readingTime);
    eleventyConfig.addFilter('translate', translate);
    eleventyConfig.addFilter('sort', sort);
    eleventyConfig.addFilter('where', where);
    //eleventyConfig.addFilter('widont', require('./src/_config/filters/widont'));

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