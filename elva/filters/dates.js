const formatDate = function (date, format = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) {
    const d = new Date(date);
    return d.toLocaleDateString(this.ctx.locales[this.page.lang || this.ctx.lang].locale, format);
}

export {
    formatDate
};