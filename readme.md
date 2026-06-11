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
* Responsive images that supports lazy loading and modern formats (avif, webp)
* [Critical CSS](https://github.com/11ty/eleventy-plugin-bundle) using 11ty bundle
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

* A CLI for managing languages, setup and common tasks (`npm run cli`)
* Search API (see `dist/api/search.json`). Any content tagged `_search` will appear in the search index
* [Front Matter CMS](https://frontmatter.codes/)
* Open graph image generation from within Front Matter CMS (dev server must be running)
* Draft support
* [Syntax highlighting](https://www.11ty.dev/docs/plugins/syntaxhighlight/)
* [Simplified embeds for YouTube, Vimeo etc](https://github.com/gfscott/eleventy-plugin-embed-everything)
* Plenty of helpful filters and functions (see `/elva/filters/*`)
* [Alpine.js](https://alpinejs.dev/)
* [Eleventy Fetch](https://www.11ty.dev/docs/plugins/fetch/)

### Still to come:

- [ ] Fix: Make the random filter choose the same article for both languages
- [ ] Accessible tooltip component
- [ ] Markdown-It — [Support multilingual quote styles](https://github.com/markdown-it/markdown-it#init-with-presets-and-options)
- [ ] Images — Size presets (full width, half etc that set the sizes attribute automatically)
- [ ] Profile verification / .well-known support for the Fediverse and Nostr ([1](https://implicit.computer/blog/activitypub-1/))
- [ ] [Language redirect based on browser setting](https://gitlab.com/florent_tassy/polyglot-tech-blog/-/blob/main/src/js/redirect.js) ([1](https://github.com/madrilene/eleventy-i18n/blob/main/netlify.toml))
- [ ] Cleaner language selector and default language (that sets homepage)
- [ ] Pagination examples
- [x] Allow for variable subsitution in translations e.g. `Hello, {{name}}` (still needs to handle plurals!)
- [ ] Front Matter CMS — Fix previews when customising the post/page slug ([1](https://frontmatter.codes/docs/content-creation/placeholders#example-1), [2](https://frontmatter.codes/docs/custom-actions#content-script))
- [ ] Front Matter CMS — More data managed from the CMS
- [ ] Front Matter CMS — [More helpful scripts](https://frontmatter.codes/docs/custom-actions#creating-a-media-script)
- [ ] Front Matter CMS — Tagging and categories
- [ ] [twtxt feeds](https://indieweb.org/twtxt) ([1](https://twtxt.readthedocs.io))
- [x] CLI tool for managing languages (and possibly importing content)

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
- [ ] Configure your sites settings with the CLI `npm run cli setup site`, manually by editing `/content/_data/settings.json` or in Front Matter CMS (under Data)
- [ ] Configure site languages via the CLI `npm run cli`, under the `languages` sub-menu. ([The demo site will soon guide you through this](https://elva.scott.ee/en/writing/adding-additional-languages/))
- [ ] Configure your sites navigation in `/content/_data/navigation.js`
- [ ] Set your own default images, icons and favicon by replacing the images in `/content/assets/img/` 
- [ ] Add your content — it's easiest to do this with Front Matter CMS which exposes [all front matter](https://elva.scott.ee/en/writing/frontmatter/) in the UI
- [ ] Setup a custom template for your open graph images (`/themes/{theme}/_layouts/opengraph-preview.njk`)
- [ ] Design your site by customising the CSS (`/themes/default/css/`), layouts (`/themes/default/_layouts/`) and includes (`/theme/default/_includes/`)... or duplicate the default theme and set the theme in `/content/_data/settings.json` to the name of your new themes folder. We also have support for this in the cli `npm run cli setup theme` although it doesn't setup a new theme for you just yet.

### Optional

- [ ] Set your preferred image sizes and formats in `/elva/config/image.js`
- [ ] If you add more front matter, you may wish to edit `.frontmatter/frontmatter.json` to add [Front Matter CMS](https://frontmatter.codes/) support
- [ ] Use [Eleventy Fetch](https://www.11ty.dev/docs/plugins/fetch/) to grab some API data
- [ ] If you enable Photon CDN support [familiarise yourself with these limitations](https://jetpack.com/support/site-accelerator/#limitations)
- [ ] [Enable build caching for your host](https://developers.cloudflare.com/pages/configuration/build-caching/)
 
## CLI

You can use the CLI to manage languages and content directly from the command line. Start with `npm run cli`. The CLI defaults to an interactive menu, but you can also use shortcuts for common tasks.

### Command Shortcuts

#### Setup Commands 

- `npm run cli setup site` - Setup the basic site settings for a new project
- `npm run cli setup theme` - Choose the theme you wish to use
- `npm run cli setup delete-default-content` - Delete all the default content that ships with elva

#### Language Commands

- `npm run cli language add` - Add a new language
- `npm run cli language remove` - Remove an existing language
- `npm run cli language list` - List all languages
- `npm run cli language default` - Change the default language

#### Content Commands

- `npm run cli content add` - Add new content
- `npm run cli content remove` - Remove existing content
- `npm run cli content import` - Import content from WordPress etc
- `npm run cli content regenerate` - Regenerate all open graph images

#### Blogroll Commands

- `npm run cli blogroll list` - List all blogroll entries
- `npm run cli blogroll add` - Add a new blogroll entry
- `npm run cli blogroll remove` - Remove blogroll entries

#### Collections Commands

- `npm run cli collections list` - List all collections
- `npm run cli collections add` - Add a new collection
- `npm run cli collections remove` - Remove a collection
- `npm run cli collections edit` - Edit a collection
- `npm run cli sync-collections` - Sync the `collection.11tydata.js` template to all collections

## Updates

### 4.0.0

With 4, you'll find a a new command line interface (documented above). This should make getting started and managing languages much easier. There is also a new search index you can use to build a custom search component, an example of that will be released soon.

### 3.0.0

As of version 3.0 of elva, there are now separate folders for `/themes`, your sites `/content` and elva related stuff `/elva`. The idea is to make upgrades of elva simpler by seperating frequently changed things (the theme and content) from the guts of the project. Hopefully this is helpful, but please open an issue if you would like to see further improvements made. 
