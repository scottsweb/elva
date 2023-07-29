const get = require('lodash.get');

module.exports = function translate(lookup, lang) {
    // TO-DO: allow for variable subsitution e.g. Hello, {{name}} - need to handle plurals etc
    // potential example: https://github.com/adamduncan/eleventy-plugin-i18n/blob/master/i18n.js
    if (!lang) lang = this.page.lang || this.ctx.lang;
    const translation = get(this.ctx.translations[lang], `[${lookup}]`);
    return translation;
}