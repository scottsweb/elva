// inline an SVG from content/assets/svg/
// {% svg "mysvg.svg", { class: "logo", title: "My inlined SVG", width: 400, height: 400 } %}
import * as cheerio from 'cheerio';

export default function (eleventyConfig) {
    function processSvg(content, svgOptions) {
		try {
			const $ = cheerio.load(content, null, false);
			const svg = $('svg');

			if (svgOptions.id) {
				svg.attr('id', svgOptions.id);
			}

			if (svgOptions.class) {
				svg.addClass(svgOptions.class);
			}

			if (svgOptions.title) {
				const titleEl = svg.find('title').length > 0 ? svg.find('title') : $(`<title></title>`).prependTo(svg);
				titleEl.text(svgOptions.title);
			}

			if (svgOptions.ariaLabel) {
				svg.attr('aria-label', svgOptions.ariaLabel);
			}

            // ensure SVGs are hidden from the a11y tree if no title or label is provided
			if (!svgOptions.hasOwnProperty('title') && !svgOptions.hasOwnProperty('ariaLabel') && svg.find('title').length === 0) {
				svgOptions.ariaHidden = true; 
			}

			if (svgOptions.ariaHidden) {
				svg.attr('aria-hidden', 'true');
			}

			// by default, set the SVG to a 24x24 square
			if (svgOptions.hasOwnProperty('width') === false && !svg.attr('width')) {
				svgOptions.width = 24;
			}
			if (svgOptions.hasOwnProperty('width')) {
				svg.attr('width', svgOptions.width);
			}

			if (svgOptions.hasOwnProperty('height') === false && !svg.attr('height')) {
				svgOptions.height = 24;
			}
			if (svgOptions.hasOwnProperty('height')) {
				svg.attr('height', svgOptions.height);
			}

			if (svgOptions.preserveAspectRatio) {
				svg.attr('preserveAspectRatio', svgOptions.preserveAspectRatio);
			}

            return $.root().html();
		} catch {
			return content;
		}
	}

    eleventyConfig.addAsyncShortcode('svg', async function (filename, svgOptions = {}) {
        const filePath = `./content/assets/svg/${filename}`;
        const engine = svgOptions.hasOwnProperty('engine') ? svgOptions.engine : 'html';
        const content = eleventyConfig.nunjucks.asyncShortcodes.renderFile(filePath, svgOptions, engine).then((content) => {
            return processSvg(content, svgOptions);
        });
        return content;
    });
}