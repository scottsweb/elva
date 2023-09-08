module.exports = function cdnify(url) {
    if ((this.ctx.settings.isProduction || this.ctx.settings.isStaging) && this.ctx.settings.cdn) {
        url = 'https://i0.wp.com/' + url.replace(/^https?:\/\//, '');
    }
    return url;
}