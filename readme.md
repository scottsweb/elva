# Elva

* Status: ✅ Active
* Contributors: [@scott](https://toot.scott.ee/@scott)
* Description: A multilingual, clean, green 11ty starter theme.
* Author: [Scott Evans](https://scott.ee)
* Author URI: [https://scott.ee](https://scott.ee)

## About

> [!NOTE]  
> This is not quite ready for use just yet but feel free to test and provide feedback.

An 11ty starter theme that provides a solid base for your next web project. Features include:

### Performance Things

* Optimised CSS, JS and HTML
* Image shortcode that supports lazy loading and modern formats (avif, webp)

### Accessibility Things

* [Multilingual](https://www.11ty.dev/docs/plugins/i18n/)
* Dark mode / Light mode

### Standards Things

* [RSS feed](https://www.11ty.dev/docs/plugins/rss/) with XSLT styles
* JSON feeds
* Sitemap
* Web manifest for PWAs
* humans.txt 
* robots.txt

### Other Things

* [Front Matter CMS](https://frontmatter.codes/)
* Draft support
* [Syntax highlighting](https://www.11ty.dev/docs/plugins/syntaxhighlight/)
* [Simplified embeds for YouTube, Vimeo etc](https://github.com/gfscott/eleventy-plugin-embed-everything)
* Plenty of helpful filters and functions
* [Alpine.js](https://alpinejs.dev/)
* [Eleventy Fetch](https://www.11ty.dev/docs/plugins/fetch/)

### Still to come:

- [ ] [Critical CSS](https://github.com/11ty/eleventy-plugin-bundle) or per page CSS
- [ ] [Explore activity feed](https://github.com/11ty/eleventy-activity-feed)
- [ ] Fix: Make the random filter choose the same article for both languages
- [ ] Markdown-It — [Support multilingual quote styles](https://github.com/markdown-it/markdown-it#init-with-presets-and-options)
- [ ] Size presets for images (full width, half etc that set the sizes attribute automatically)
- [ ] [Support markdown style images](https://nhoizey.github.io/eleventy-plugin-images-responsiver/)
- [ ] .well-known support for the Fediverse and Nostr
- [ ] [Language redirect based on browser setting](https://gitlab.com/florent_tassy/polyglot-tech-blog/-/blob/main/src/js/redirect.js)?
- [ ] Front Matter CMS — Fix previews when customising the post/page slug ([1](https://frontmatter.codes/docs/content-creation/placeholders#example-1), [2](https://frontmatter.codes/docs/custom-actions#content-script))
- [ ] Fromt Matter CMS - More data managed from the CMS
- [ ] Front Matter CMS — Better support for templates, default templates etc
- [ ] Front Matter CMS — [Generated open graph images](https://www.eliostruyf.com/generate-open-graph-preview-image-code-front-matter/) ([1](https://bnijenhuis.nl/notes/automatically-generate-open-graph-images-in-eleventy/), [2](https://bnijenhuis.nl/notes/automatically-generate-open-graph-images-in-eleventy/))
- [ ] [twtxt feeds](https://indieweb.org/twtxt) ([1](https://twtxt.readthedocs.io))

## Personalisation Checklist

- [ ] At the top of `.eleventy.js` you'll see some dynamic settings for `url`, `isProduction` and `isStaging`. Make sure these environment variables are set in staging and production and tweak as necessary
- [ ] Configure your sites settings in `/src/_data/settings.json` or in Front Matter CMS (under Data)
- [ ] Add your chosen languages (the demo site has docs for each step) (link)
- [ ] Set your own default iamges, icons and favicon by replacing the images in `/src/assets/img/`
- [ ] Add your content — it's easiest to do this with Front Matter CMS which exposes all Frontmatter (link) in the UI
- [ ] Design your site by customising the CSS (`/src/assets/css/`), includes (`/src/_includes/`) and layouts (`/src/_layouts/`)

Optional

- [ ] If you add more Frontmatter to your markdown, you may wish to edit `frontmatter.json` to add [Front Matter CMS](https://frontmatter.codes/) support
- [ ] You many not need [Alpine.js](https://alpinejs.dev/) which can be removed from `/src/assets/js/bundle.njk`
- [ ] Use [Eleventy Fetch](https://www.11ty.dev/docs/plugins/fetch/) to grab some API data

```
layout: markdown
title: Main page title heading level one
thumbnail: /assets/img/test.jpg
thumbnailDescription: An alt text description for the thumbnail image
seo:
  title: 'Custom title (defaults to title)'
  description: 'SEO description (defaults to secondaryTitle)'
  slug: 'freedemo'
  changeFrequency: 'daily'
  sitemapPriority: '1.0'
  excludeFromSitemap: true
  noIndex: true
tags: 'page-demo'
draft: true
eleventyExcludeFromCollections: true
```
