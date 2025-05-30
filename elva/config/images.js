import fs from "node:fs";
import settings from '../../content/_data/settings.json' with { type: 'json' }

export default (eleventyConfig) => {
    const cdnify = (eleventyConfig.globalData.settings.isProduction || eleventyConfig.globalData.settings.isStaging) && settings.cdn;
    let outputdir = { outputDir: './dist/assets/img/' }

    // cache images for faster builds
    if (process.env.ELEVENTY_RUN_MODE === 'build' && !cdnify) {
        outputdir.outputDir = '.cache/@11ty/img/';

        eleventyConfig.on('eleventy.after', () => {
            fs.cpSync('.cache/@11ty/img/', './dist/assets/img/', { recursive: true });
        });
    }

    return {
        ...outputdir,
        extensions: "html",
        formats: (cdnify) ? ['auto'] : ['avif', 'webp', 'svg', 'auto'],
        widths: [300, 600, 1200, 2400, 'auto'],
        svgShortCircuit: true,
        urlPath: '/assets/img/',

        // generate CDN urls when turned on
        urlFormat: (cdnify) ? function({src, width}) {
            return `https://i0.wp.com/${eleventyConfig.globalData.settings.url.replace(/^https?:\/\//, '')}/${src.replace('content/', '')}?w=${width}&quality=85&strip=info`;
        } : undefined,

        // sharp options: https://www.11ty.dev/docs/plugins/image/#advanced-control-of-sharp-image-processor
        sharpOptions: {
            animated: true,
        },
        sharpWebpOptions: {
            quality: 85,
        },

        // optional, attributes assigned on <img> override these values
        defaultAttributes: {
            loading: "lazy",
            decoding: "async",
        },
    }
}