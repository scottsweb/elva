// the default language is no longer prefixed with the language prefix
// this function will accommodate that change
export function defaultlocaleurl(link) {
    let lang = this.page.lang || this.ctx.lang;
    if (this.ctx.locales[lang].default) {
        link = link.replace(`/${lang}`, '');
    }
    return link;
}

// backward compatibility alias
export const default_locale_url = defaultlocaleurl;
