export default {
    layout: 'post',
    tags: '_posts',
    permalink: function(data) {
        // default language has no lang prefix
        let prefix = `/${data.lang}`;
        if (data.locales[data.lang].default) {
            prefix = '';
        }

        // slug override for localized URL slugs
        if (data.seo?.slug) {
            return `${prefix}/writing/${this.slugify(data.seo.slug)}/`;
        } else {
            return `${prefix}/writing/${this.slugify(data.page.fileSlug)}/`;
        }
    }
}