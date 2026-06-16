import collections from '../../_data/types.json' with { type: 'json' };

const collectionName = import.meta.url.split('/').at(-2);
const locale = import.meta.url.split('/').at(-3);
const config = collections[collectionName];

export default {
    lang: locale,
    layout: config.layout,
    tags: [`_${collectionName}`, ...(config.searchable ? ['_search'] : [])],
    permalink: function(data) {
        let prefix = `/${data.lang}`;
        if (data.locales[data.lang].default) prefix = '';

        if (collectionName === 'pages') {
            return `${prefix}/${this.slugify(data.seo?.slug || data.page.fileSlug)}/`.replace(/\/{2,}/g, '/');
        }

        let collectionSlug = config.locales?.[data.lang] || config.prefix || collectionName;
        return `${prefix}/${collectionSlug}/${this.slugify(data.seo?.slug || data.page.fileSlug)}/`;
    },
    eleventyComputed: {
        page: {
            lang: () => locale
        }
    },
}
