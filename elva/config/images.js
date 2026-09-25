import fs from "node:fs";
import path from "node:path";
import settings from '../../content/_data/settings.json' with { type: 'json' }

export default (eleventyConfig) => {
    const cdnify = (eleventyConfig.globalData.settings.isProduction || eleventyConfig.globalData.settings.isStaging) && settings.cdn;
    let outputdir = { outputDir: path.join(eleventyConfig.directories.output, '/assets/img/') }

    // cache images for faster builds
    if (process.env.ELEVENTY_RUN_MODE === 'build' && !cdnify) {
        outputdir.outputDir = '.cache/@11ty/img/';

        const copyCache = async () => {
            const src = '.cache/@11ty/img/';
            const dest = path.join(eleventyConfig.directories.output, '/assets/img/');
            try {
                if (!fs.existsSync(src)) return;
                await fs.promises.cp(src, dest, { recursive: true });
            }
            catch (err) {
                eleventyConfig.logger.error(`Image cache copy failed: ${err.message}`);
            }
        };

        eleventyConfig.on('eleventy.after', copyCache);
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
            const quality = (src.endsWith('.gif')) ? '100' : '85';
            return `https://i0.wp.com/${eleventyConfig.globalData.settings.url.replace(/^https?:\/\//, '')}/${src.replace('content/', '')}?w=${width}&quality=${quality}&strip=info`;
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