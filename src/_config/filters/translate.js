// finds a translation from src/_data/translations.js
// can support data substitution, for example: {{ 'translation.key' | translate(page.lang, {data: 500}) }}
// to-do: can this be made to support plurals also?
const get = require('lodash.get');
const templite = require('templite');

module.exports = function translate(lookup, lang, data = {}) {
    if (!lang) lang = this.page.lang || this.ctx.lang;
    const translation = templite(get(this.ctx.translations[lang], `[${lookup}]`), data);
    return translation;
}