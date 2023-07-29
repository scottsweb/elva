const Image = require('@11ty/eleventy-img');

module.exports = async function(src, alt, sizes) {

    let metadata = await Image('./src' + src, {
        widths: [385, 580, 1158, 2300],
        formats: ['avif', 'png'],
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
        loading: 'lazy',
        decoding: 'async',
    };
    
    return Image.generateHTML(metadata, imageAttributes);
};