import { transform, Features, browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';

export default function (eleventyConfig) {
    eleventyConfig.addBundle('css', { toFileDirectory: 'assets/css', transforms: [
        async function(content) {
            const css = await transform({
                code: Buffer.from(content),
                minify: eleventyConfig.globalData.settings.isProduction,
                sourceMap: false,
                include: Features.Nesting,
                drafts: { customMedia: true },
                errorRecovery: true,
                targets: browserslistToTargets(browserslist('> 0.2% and not dead'))
            });
    
            if (css?.warnings?.length) {
                eleventyConfig.logger.error('CSS error: ' + css?.warnings[0]?.message);
            }
        
            return css.code.toString('utf8');
        }
    ]});
}