// @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig 

// Imports --------------------------------------------

import { EleventyI18nPlugin, EleventyHtmlBasePlugin, EleventyRenderPlugin, IdAttributePlugin } from '@11ty/eleventy';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import fs from 'fs';
import markdownIt from 'markdown-it';
import markdownItIns from 'markdown-it-ins';
import markdownItMark from 'markdown-it-mark';
import markdownItSub from 'markdown-it-sub';
import markdownItSup from 'markdown-it-sup';
import markdownItToc from 'markdown-it-table-of-contents';
import path from 'path';
import pluginRSS from '@11ty/eleventy-plugin-rss';
import pluginSyntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import pluginEmbedEverything from 'eleventy-plugin-embed-everything';
import slugify from '@sindresorhus/slugify';

// Local ---------------------------------------------

// Plugins
import pluginDrafts from './elva/plugins/drafts.js';
import pluginDescriptions from './elva/plugins/seodescriptions.js';
import pluginCSS from './elva/plugins/css.js';
import pluginJS from './elva/plugins/js.js';


// Plugin Configs
import pluginEmbedEverythingConfig from './elva/config/embeds.js';
import pluginImageTransformConfig from './elva/config/images.js';

// Transforms
import transformHTML from './elva/transforms/html.js';

// Shortcodes
import image from './elva/shortcodes/image.js';

// Filters
import base64 from './elva/filters/base64.js';
import cdnify from './elva/filters/cdnify.js';
import { formatDate } from './elva/filters/dates.js';
import languageFilter from './elva/filters/language.js';
import mimetype from './elva/filters/mimetype.js';
import random from './elva/filters/random.js';
import readingTime from './elva/filters/readingtime.js';
import sort from './elva/filters/sort.js';
import translate from './elva/filters/translate.js';
import where from './elva/filters/where.js';

// Languages
// to-do: This is a temp fix based on this bug: https://github.com/11ty/eleventy-dependency-tree-esm/issues/2
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const locales = require('./content/_data/locales.json');

// 11ty -----------------------------------------------

export default async function(eleventyConfig) {

    // Global Settings --------------------------------

    eleventyConfig.addGlobalData('settings', {
        // these get merged with content/_data/settings.js
        url: process.env.URL || process.env.CF_PAGES_URL || 'http://localhost:8080',
        isProduction: process.env.NODE_ENV === 'production',
        isStaging: (process.env.URL && process.env.URL.includes('github.io')) || (process.env.CF_PAGES_URL && process.env.CF_PAGES_URL.includes('pages.dev')) || false,
        theme: 'default'
    });

    // Watch Targets ----------------------------------

    eleventyConfig.setUseGitIgnore(false);
    eleventyConfig.addWatchTarget('./content/assets');
    eleventyConfig.addWatchTarget('./themes/**/*.{css,js}');
    eleventyConfig.addWatchTarget('./elva/templates/*', { resetConfig: true });

    // Layouts ----------------------------------------

    eleventyConfig.addLayoutAlias('base', 'base.njk');
    eleventyConfig.addLayoutAlias('home', 'home.njk');
    eleventyConfig.addLayoutAlias('page', 'page.njk');
    eleventyConfig.addLayoutAlias('post', 'post.njk');
    eleventyConfig.addLayoutAlias('posts', 'posts.njk');

    // Virtual Templates ------------------------------

    const robotsTemplate = fs.readFileSync(path.resolve('elva/templates/', 'robots.njk'), 'utf-8');
    const sitemapTemplate = fs.readFileSync(path.resolve('elva/templates/', 'sitemap.njk'), 'utf-8');

    eleventyConfig.addTemplate('robots.njk', robotsTemplate);
    eleventyConfig.addTemplate('sitemap.njk', sitemapTemplate);

    const feedTemplate = fs.readFileSync(path.resolve('elva/templates/', 'feed.njk'), 'utf-8');
    const feedXSLTemplate = fs.readFileSync(path.resolve('elva/templates/', 'feed.xsl.njk'), 'utf-8');
    const feedJSONTemplate = fs.readFileSync(path.resolve('elva/templates/', 'feed.json.njk'), 'utf-8');
    const manifestTemplate = fs.readFileSync(path.resolve('elva/templates/', 'manifest.njk'), 'utf-8');

    for (let [key, locale] of Object.entries(locales)) {
        eleventyConfig.addTemplate(key + '-feed.njk', feedTemplate, { lang: key });
        eleventyConfig.addTemplate(key + '-feed.xsl.njk', feedXSLTemplate, { lang: key });
        eleventyConfig.addTemplate(key + '-feed.json.njk', feedJSONTemplate, { lang: key });
        eleventyConfig.addTemplate(key + '-manifest.njk', manifestTemplate, { lang: key });
    }
    
    // Plugins ----------------------------------------

    eleventyConfig.addPlugin(pluginCSS);
    eleventyConfig.addPlugin(pluginJS);
    await eleventyConfig.addPlugin(pluginRSS);
    eleventyConfig.addPlugin(pluginDrafts);
    eleventyConfig.addPlugin(pluginDescriptions);
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    eleventyConfig.addPlugin(EleventyRenderPlugin);
    eleventyConfig.addPlugin(EleventyI18nPlugin, { defaultLanguage: 'en' });
    eleventyConfig.addPlugin(IdAttributePlugin);
    eleventyConfig.addPlugin(pluginSyntaxHighlight);
    eleventyConfig.addPlugin(pluginEmbedEverything, pluginEmbedEverythingConfig);
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, pluginImageTransformConfig(eleventyConfig));

    // Transforms -------------------------------------

    eleventyConfig.addPlugin(transformHTML);

    // Shortcodes -------------------------------------

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

    // Passthrough -------------------------------------

    const fontsPath = `./themes/${eleventyConfig.globalData.settings.theme}/fonts`; 
    eleventyConfig.addPassthroughCopy({'./content/assets/files': './assets/files'});
    eleventyConfig.addPassthroughCopy({'./content/assets/img': './assets/img'});
    eleventyConfig.addPassthroughCopy({fontsPath: './assets/fonts'});

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
        mdLib.use(markdownItToc, { slugify, includeLevel: [2,3]});
    });

    // 11ty Settings -----------------------------------

    eleventyConfig.logger.message(`Theme: ${eleventyConfig.globalData.settings.theme}`)

    return {
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
    
        // If your site deploys to a subdirectory, change `pathPrefix`
        pathPrefix: '/',

        dir: {
            input: 'content',
            output: 'dist',
            data: '_data',
            includes: `../themes/${eleventyConfig.globalData.settings.theme}/_includes`,
            layouts: `../themes/${eleventyConfig.globalData.settings.theme}/_layouts`
        }
    }
}