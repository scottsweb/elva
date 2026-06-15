// finds a translation from content/_data/translations.js
// can support data substitution, for example: {{ 'translation.key' | translate(page.lang, {data: 500}) }}
// to-do: can this be made to support plurals also?
import nunjucks from '@11ty/nunjucks';
nunjucks.configure({ autoescape: true });

export default function translate(lookup, lang, data = {}) {
    if (!lang) lang = this.page.lang || this.ctx.lang;
    // traverse the translations object using the dot-separated lookup path, then render as a Nunjucks template so variables like {data: 500} get substituted in
    const value = lookup.split('.').reduce((o, k) => o?.[k], this.ctx.translations[lang]);
    if (!value) return lookup;
    const translation = nunjucks.renderString(value, data);
    return translation;
}