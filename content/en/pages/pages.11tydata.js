export default {
    layout: 'page',
    tags: '_pages',
    permalink: function(data) {
        // slug override for localized URL slugs
        if (data.seo?.slug) {
            return `/${data.lang}/${this.slugify(data.seo.slug)}/`;
        } else {
            return `/${data.lang}/${this.slugify(data.page.fileSlug)}/`;
        }
    }
}