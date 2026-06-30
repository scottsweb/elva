// finds a translation from content/_data/translations.js
// can support data substitution, for example: {{ 'translation.key' | translate(page.lang, { data: 500 }) }}
// supports plurals: {{ 'readingTime.count' | translate(page.lang, { minutes: 5, count: 5 }) }}
import nunjucks from '@11ty/nunjucks';
import { getProperty } from 'dot-prop';
nunjucks.configure({ autoescape: true });

export function translate(lookup, lang, data = {}) {
    if (!lang) lang = this.page.lang || this.ctx.lang;
    // traverse the translations object using the dot-separated lookup path
    const value = getProperty(this.ctx.translations[lang], lookup);
    if (!value) return lookup;

    // find count for pluralisation: explicit count key, or first numeric value in data
    let count = data.count;
    if (count === undefined) {
        count = Object.values(data).find(v => typeof v === 'number');
    }

    // handle pluralisation: if value is an object with one/other keys and count is found
    if (typeof value === 'object' && !Array.isArray(value) && count !== undefined) {
        const pluralRules = new Intl.PluralRules(lang);
        const pluralForm = pluralRules.select(count);
        const pluralValue = value[pluralForm];
        if (typeof pluralValue === 'string') {
            return nunjucks.renderString(pluralValue, data);
        }
    }

    // handle variable substitution
    if (typeof value === 'string') {
        return nunjucks.renderString(value, data);
    }

    return value;
}
