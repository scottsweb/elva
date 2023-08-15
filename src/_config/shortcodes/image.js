const Image = require('@11ty/eleventy-img');

module.exports = async function(src, alt, sizes, loading = 'lazy', fetch = 'auto', decoding = 'async') {

    let metadata = await Image('./src' + src, {
        widths: [300, 600, 1200, 2400, 'auto'],
        formats: ['avif', 'webp', 'auto'],
        urlPath: '/assets/img/',
        outputDir: './dist/assets/img/',
        sharpWebpOptions: {
            options: {
                quality: 70,
            },
        }
    });

    let imageAttributes = {
        alt,
        sizes,
        loading,
        fetch,
        decoding
    };
    
    return Image.generateHTML(metadata, imageAttributes);
};