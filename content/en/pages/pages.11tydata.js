export default {
    layout: 'page',
    tags: '_pages',
    permalink: function(data) {
        // default language has no lang prefix
        let prefix = `/${data.lang}`;
        if (data.locales[data.lang].default) {
            prefix = '';
        }

        // slug override for localized URL slugs
        if (data.seo?.slug) {
            return `${prefix}/${this.slugify(data.seo.slug)}/`.replace(/\/{2,}/g, '/');
        } else {
            return `${prefix}/${this.slugify(data.page.fileSlug)}/`;
        }
    }
}