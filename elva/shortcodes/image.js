import Image from '@11ty/eleventy-img';

export default async function(src, alt, sizes, caption = '', classes = '', loading = 'lazy', fetch = 'auto', decoding = 'async') {
    const settings = this.ctx.settings;
    let meta = {};
    let metadata = {
        // set your required image sizes here
        widths: [300, 600, 1200, 2400, 'auto'],
        urlPath: '/assets/img/',
        outputDir: './dist/assets/img/',
        sharpWebpOptions: {
            options: {
                quality: 85,
            },
        }
    };

    if (( settings.isProduction || settings.isStaging ) && settings.cdn ) {
        meta = await Image('./content' + src, {
                ...metadata,
                formats: ['webp', 'auto'],
                urlFormat: function({width}) {
                    return `//i0.wp.com/${settings.url.replace(/^https?:\/\//, '')}${src}?w=${width}&quality=85&strip=info`;
                }
            }
        );
    } else {
        meta = await Image('./content' + src, { 
            ...metadata,
            formats: ['avif', 'webp', 'auto']
        });
    }

    let imageAttributes = {
        class: classes,
        alt,
        sizes,
        loading,
        fetch,
        decoding,
        "eleventy:ignore": ""
    };
    
    const generated = Image.generateHTML(meta, imageAttributes);
    if (caption) {
        return `<figure>${generated}<figcaption>${caption}</figcaption></figure>`;
    }
    return generated;
};