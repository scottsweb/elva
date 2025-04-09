// there is a weird bug when generating tag pages (maybe paginated pages too) which is detailed here:
// https://github.com/11ty/eleventy/issues/3555
// this function attempts to find the closest matching alternative language link in a bunch of language links
export default function fixLocaleLinks(links, lang) {
    if (!this.ctx.pagination) { return links; }
    if (!lang) lang = this.page.lang || this.ctx.lang;
    const filtered = links.filter(item => item?.url?.endsWith(this.page.url.replace('/' + lang, '')));
    return filtered;
}