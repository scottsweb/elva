# Elva

* Status: ✅ Active
* Contributors: [@scott](https://toot.scott.ee/@scott)
* Description: A multilingual, clean, green 11ty starter theme.
* Author: [Scott Evans](https://scott.ee)
* Author URI: [https://scott.ee](https://scott.ee)

## About

> [!NOTE]  
> This is not quite ready for use just yet but feel free to test and provide feedback.

An 11ty starter theme that provides a solid base for your next web project. Features (so far) include:

* Lanuage support
* RSS feed with XSLT styles
* JSON feeds
* Dark mode / Light mode
* Sitemap
* Web manifest for PWAs
* humans.txt 
* robots.txt
* Front Matter CMS (in progress)
* Draft support
* Optimised CSS, JS and HTML
* Syntax highlighting
* Simplified markdown embeds for YouTube, Vimeo etc
* Plenty of helpful filters and functions
* Alpine.js
* Eleventy Fetch

Still to come:

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
