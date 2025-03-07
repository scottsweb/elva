import settings from '../../content/_data/settings.json' with { type: 'json' }

export default (eleventyConfig) => ({
    extensions: "html",
    formats: ['avif', 'webp', 'svg', 'auto'],
    widths: [300, 600, 1200, 2400, 'auto'],
    svgShortCircuit: true,
    outputDir: './dist/assets/img/',
    urlPath: '/assets/img/',

    // generate CDN urls when turned on
    urlFormat: (( eleventyConfig.globalData.settings.url.isProduction || eleventyConfig.globalData.settings.url.isStaging ) && settings.cdn ) ? function({hash, src, width, format}) {
        console.log(settings)
        return `//i0.wp.com/${eleventyConfig.globalData.settings.url.replace(/^https?:\/\//, '')}/${src.replace('content/', '')}?w=${width}&quality=70&strip=info`;
    } : undefined,

    // sharp options: https://www.11ty.dev/docs/plugins/image/#advanced-control-of-sharp-image-processor
    sharpOptions: {
        animated: true,
    },

    // optional, attributes assigned on <img> override these values
    defaultAttributes: {
        loading: "lazy",
        decoding: "async",
    },
})