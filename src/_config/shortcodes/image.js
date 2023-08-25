const Image = require('@11ty/eleventy-img');

module.exports = async function(src, alt, sizes, loading = 'lazy', fetch = 'auto', decoding = 'async') {
    const settings = this.ctx.settings;
    let meta = {};
    let metadata = {
        widths: [300, 600, 1200, 2400, 'auto'],
        urlPath: '/assets/img/',
        outputDir: './dist/assets/img/',
        sharpWebpOptions: {
            options: {
                quality: 70,
            },
        }
    };

    if (( settings.isProduction || settings.isStaging ) && settings.cdn ) {
        meta = await Image('./src' + src, {
                ...metadata,
                formats: ['webp', 'auto'],
                urlFormat: function({hash, format, width}) {
                    return `//i0.wp.com/${settings.url}/assets/img/${hash}-${width}.${format}?w=${width}&quality=70&strip=info`;
                }
            }
        )
    } else {
        meta = await Image('./src' + src, { 
            ...metadata,
            formats: ['avif', 'webp', 'auto']
        });
    }

    let imageAttributes = {
        alt,
        sizes,
        loading,
        fetch,
        decoding
    };
    
    return Image.generateHTML(meta, imageAttributes);
};