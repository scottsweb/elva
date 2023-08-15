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

* Multilingual
* Dark mode / Light mode

### Standards Things

* RSS feed with XSLT styles
* JSON feeds
* Sitemap
* Web manifest for PWAs
* humans.txt 
* robots.txt

### Other Things

* Front Matter CMS
* Draft support
* Syntax highlighting
* Simplified embeds for YouTube, Vimeo etc
* Plenty of helpful filters and functions
* Alpine.js
* Eleventy Fetch

### Still to come:

- [ ] [Critical CSS](https://github.com/11ty/eleventy-plugin-bundle) or per page CSS
- [ ] [Explore activity feed](https://github.com/11ty/eleventy-activity-feed)
- [ ] Fix: Make the random filter choose the same article for both languages
- [ ] Markdown-It — [Support multilingual quote styles](https://github.com/markdown-it/markdown-it#init-with-presets-and-options)
- [ ] Size presets for images (full width, half etc that set the sizes attr automatically)
- [ ] [Support markdown style images](https://nhoizey.github.io/eleventy-plugin-images-responsiver/)
- [ ] Front Matter CMS — Fix previews when customising the post/page slug ([1](https://frontmatter.codes/docs/content-creation/placeholders#example-1), [2](https://frontmatter.codes/docs/custom-actions#content-script))
- [ ] [Language redirect based on browser setting](https://gitlab.com/florent_tassy/polyglot-tech-blog/-/blob/main/src/js/redirect.js)?
- [ ] Fromt Matter CMS - More data managed from the CMS
- [ ] Front Matter CMS — Better support for templates, default templates etc
- [ ] Front Matter CMS — [Generated open graph images](https://www.eliostruyf.com/generate-open-graph-preview-image-code-front-matter/) ([1](https://bnijenhuis.nl/notes/automatically-generate-open-graph-images-in-eleventy/), [2](https://bnijenhuis.nl/notes/automatically-generate-open-graph-images-in-eleventy/))
- [ ] [twtxt feeds](https://indieweb.org/twtxt) ([1](https://twtxt.readthedocs.io))

* twtxt feeds
* Default styles and example icons
* Responsive images with lazy loading with Eleventy Image
* CDN for image assets
* Documentation
* Generated open graph images
* Critical CSS - https://github.com/11ty/eleventy-plugin-bundle

## Frontmatter

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
