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
* Discourage [AI bots](https://github.com/ai-robots-txt/ai.robots.txt/)

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
- [ ] Fix: Make the random filter choose the same article for both languages
- [ ] Accessible tooltip component
- [ ] Markdown-It — [Support multilingual quote styles](https://github.com/markdown-it/markdown-it#init-with-presets-and-options)
- [ ] Images — Size presets (full width, half etc that set the sizes attribute automatically)
- [ ] [Support markdown style images](https://nhoizey.github.io/eleventy-plugin-images-responsiver/)
- [ ] Profile verification / .well-known support for the Fediverse and Nostr ([1](https://implicit.computer/blog/activitypub-1/))
- [ ] [Language redirect based on browser setting](https://gitlab.com/florent_tassy/polyglot-tech-blog/-/blob/main/src/js/redirect.js)[1](https://github.com/madrilene/eleventy-i18n/blob/main/netlify.toml)?
- [ ] Cleaner language selector
- [ ] Pagination examples
- [x] Allow for variable subsitution in translations e.g. `Hello, {{name}}` (still needs to handle plurals!)
- [ ] Front Matter CMS — Fix previews when customising the post/page slug ([1](https://frontmatter.codes/docs/content-creation/placeholders#example-1), [2](https://frontmatter.codes/docs/custom-actions#content-script))
- [ ] Front Matter CMS — More data managed from the CMS
- [ ] Front Matter CMS — [More helpful scripts](https://frontmatter.codes/docs/custom-actions#creating-a-media-script)
- [ ] Front Matter CMS — Tagging and categories
- [ ] [twtxt feeds](https://indieweb.org/twtxt) ([1](https://twtxt.readthedocs.io))
- [ ] CLI tool for managing languages (and possibly importing content)

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
npm run build:prod
```

You can set the environment variable `NODE_ENV=production` in your hosting control panel too and use `npm run build` as before.

To use [Front Matter CMS](https://frontmatter.codes/), install [VSCodium](https://vscodium.com/) or [Visual Studio Code](https://code.visualstudio.com/) and enable the extension (if it doesn't enable automatically). It will open each time you launch your project.

## Personalisation Checklist

- [ ] In `.eleventy.js` you'll see some dynamic settings for `url`, `isProduction` and `isStaging` (under `Global Settings`). Make sure these environment variables are set in staging and production and tweak as necessary
- [ ] Configure your sites settings in `/content/_data/settings.json` or in Front Matter CMS (under Data)
- [ ] Add your chosen languages ([the demo site will soon guide you through this](https://elva.scott.ee/en/writing/adding-additional-languages/))
- [ ] Configure your sites navigation in `/content/_data/navigation.js`
- [ ] Set your own default images, icons and favicon by replacing the images in `/content/assets/img/` 
- [ ] Add your content — it's easiest to do this with Front Matter CMS which exposes [all front matter](https://elva.scott.ee/en/writing/frontmatter/) in the UI
- [ ] Setup a custom template for your open graph images (`.frontmatter/scripts/opengraph-template.html`)
- [ ] Design your site by customising the CSS (`/theme/css/`), layouts (`/theme/_layouts/`) and includes (`/theme/_includes/`)

### Optional

- [ ] Set your preferred image sizes and formats in the image shortcode `/elva/shortcodes/image.js`
- [ ] If you add more front matter, you may wish to edit `.frontmatter/frontmatter.json` to add [Front Matter CMS](https://frontmatter.codes/) support
- [ ] You many not need [Alpine.js](https://alpinejs.dev/) which can be removed from `/theme/js/bundle.njk`
- [ ] Use [Eleventy Fetch](https://www.11ty.dev/docs/plugins/fetch/) to grab some API data
- [ ] If you enable Photon CDN support [familiarise yourself with these limitations](https://jetpack.com/support/site-accelerator/#limitations)
 
### Updates

As of version 3.0 of elva, there are now separate folders for the `/theme`, your sites `/content` and elva related stuff `/elva`. The idea is to make upgrades of elva simpler by seperating frequently changed things (the theme and content) from the guts of the project. Hopefully this is helpful, but please open an issue if you would like to see further improvements made. 
