module.exports = function languageFilter(collection, lang) {
    if (!lang) lang = this.page.lang || this.ctx.lang;
    const filtered = collection.filter(item => item.page.lang == lang);
    return filtered;
}