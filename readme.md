![elva logo](https://scott.ee/images/elva.png)

# elva

* Status: ✅ Active
* Contributors: [@scott](https://toot.scott.ee/@scott)
* Description: A multilingual, clean, green 11ty starter theme.
* Author: [Scott Evans](https://scott.ee)
* Author URI: [https://scott.ee](https://scott.ee)

## About

A multilingual, clean, green, [11ty starter theme](https://www.11ty.dev/docs/starter/). elva provides solid foundations for your next web project and a built in CMS ([Front Matter CMS](https://frontmatter.codes/)) for managing content. [Try the demo!](https://elva.scott.ee/)

Features include:

### Performance things

* Optimised CSS, JS and HTML
* Responsive image shortcode that supports lazy loading and modern formats (avif, webp)
* Support for the [Photon CDN](https://developer.wordpress.com/docs/photon/) (can be turned on via settings)

### Accessibility things

* [Multilingual](https://www.11ty.dev/docs/plugins/i18n/)
* Dark / light mode
* Skip link and ARIA hints

### Standards things

* [RSS feed](https://www.11ty.dev/docs/plugins/rss/) with XSLT styles
* JSON feeds
* Sitemap
* Web manifest for PWAs
* humans.txt 
* robots.txt
* Discourage Google AI from indexing your content

### Other things

* [Front Matter CMS](https://frontmatter.codes/)
* Open graph image generation from within Front Matter CMS (dev server must be running)
* Draft support
* [Syntax highlighting](https://www.11ty.dev/docs/plugins/syntaxhighlight/)
* [Simplified embeds for YouTube, Vimeo etc](https://github.com/gfscott/eleventy-plugin-embed-everything)
* Plenty of helpful filters and functions
* [Alpine.js](https://alpinejs.dev/)
* [Eleventy Fetch](https://www.11ty.dev/docs/plugins/fetch/)

### Still to come:

- [ ] [Critical CSS](https://github.com/11ty/eleventy-plugin-bundle) or per collection or per page CSS ([1](https://www.silvestar.codes/articles/extracting-and-using-critical-css-on-my-eleventy-site/))
- [ ] [Explore activity feed](https://github.com/11ty/eleventy-activity-feed)
- [ ] Fix: Make the random filter choose the same article for both languages
- [ ] Accessible tooltip component
- [x] Reading time filter
- [ ] Markdown-It — [Support multilingual quote styles](https://github.com/markdown-it/markdown-it#init-with-presets-and-options)
- [ ] Images — Size presets (full width, half etc that set the sizes attribute automatically)
- [ ] [Support markdown style images](https://nhoizey.github.io/eleventy-plugin-images-responsiver/)
- [ ] Profile verification / .well-known support for the Fediverse and Nostr
- [x] Serve assets and styles for YouTube lite locally
- [ ] [Language redirect based on browser setting](https://gitlab.com/florent_tassy/polyglot-tech-blog/-/blob/main/src/js/redirect.js)?
- [ ] Cleaner language selector
- [x] Allow for variable subsitution in translations e.g. `Hello, {{name}}` (still needs to handle plurals!)
- [ ] Front Matter CMS — Fix previews when customising the post/page slug ([1](https://frontmatter.codes/docs/content-creation/placeholders#example-1), [2](https://frontmatter.codes/docs/custom-actions#content-script))
- [ ] Front Matter CMS — More data managed from the CMS
- [x] Front Matter CMS — Better support for templates, default templates etc
- [x] Front Matter CMS — [Generated open graph images](https://www.eliostruyf.com/generate-open-graph-preview-image-code-front-matter/) ([1](https://bnijenhuis.nl/notes/automatically-generate-open-graph-images-in-eleventy/))
- [ ] [twtxt feeds](https://indieweb.org/twtxt) ([1](https://twtxt.readthedocs.io))

## Getting Started

Make a directory and navigate to it:

```
mkdir my-site-name
cd my-site-name
```

Clone this repository:

```
git clone https://github.com/scottsweb/elva.git .
```

Install dependencies:

```
npm install
```

Run Eleventy for site development. View the site at `http://localhost:8080`:

```
npm run dev
```

Generate a production-ready build to the `dist` folder:

```
npm run build
```

To use [Front Matter CMS](https://frontmatter.codes/), install [VSCodium](https://vscodium.com/) or [Visual Studio Code](https://code.visualstudio.com/) and enable the extension (if it doesn't enable automatically). It will open each time you launch your project.

## Personalisation Checklist

- [ ] At the top of `.eleventy.js` you'll see some dynamic settings for `url`, `isProduction` and `isStaging`. Make sure these environment variables are set in staging and production and tweak as necessary
- [ ] Configure your sites settings in `/src/_data/settings.json` or in Front Matter CMS (under Data)
- [ ] Add your chosen languages ([the demo site will soon guide you through this](https://elva.scott.ee/en/writing/adding-additional-languages/))
- [ ] Configure your sites navigation in `/src/_data/navigation.js`
- [ ] Set your own default images, icons and favicon by replacing the images in `/src/assets/img/` 
- [ ] Add your content — it's easiest to do this with Front Matter CMS which exposes [all front matter](https://elva.scott.ee/en/writing/frontmatter/) in the UI
- [ ] Setup a custom template for your open graph images (`.frontmatter/scripts/opengraph-template.html`)
- [ ] Design your site by customising the CSS (`/src/assets/css/`), layouts (`/src/_layouts/`) and includes (`/src/_includes/`)

### Optional

- [ ] Set your preferred image sizes and formats in the image shortcode `/src/_config/shortcodes/image.js`
- [ ] If you add more front matter, you may wish to edit `frontmatter.json` to add [Front Matter CMS](https://frontmatter.codes/) support
- [ ] You many not need [Alpine.js](https://alpinejs.dev/) which can be removed from `/src/assets/js/bundle.njk`
- [ ] Use [Eleventy Fetch](https://www.11ty.dev/docs/plugins/fetch/) to grab some API data
- [ ] If you enable Photon CDN support [familiarise yourself with these limitations](https://jetpack.com/support/site-accelerator/#limitations)
 

