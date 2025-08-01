// the default language is no longer prefixed with the language prefix
// this function will accommodate that change
export default function defaultLocaleUrl(link) {
    let lang = this.page.lang || this.ctx.lang;
    if (this.ctx.locales[lang].default) {
        link = link.replace(`/${lang}`, '');
    }
    return link;
}