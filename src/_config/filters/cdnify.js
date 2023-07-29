module.exports = function cdnify(url) {
    if (this.ctx.settings.isProduction) {
        url = 'https://i0.wp.com/' + url.replace(/^https?:\/\//, '');
    }
    return url;
}