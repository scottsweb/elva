---
title: About
seo:
  description: A multilingual, clean, green, 11ty starter theme. elva provides solid foundations for your next web project and a built in CMS for managing content.
---

A multilingual, clean, green, [11ty starter theme](https://www.11ty.dev/docs/starter/). [elva](https://github.com/scottsweb/elva) provides solid foundations for your next web project and a built in CMS ([Front Matter CMS](https://frontmatter.codes/)) for managing content. You are currently viewing the demo site which also contains a [little documentation]({{ "/" | locale_url }}) to help get you started. Head over to [GitHub to make feature requests, pull requests and report issues](https://github.com/scottsweb/elva/issues).

{% image "/assets/img/screenshots.png", "Screenshot of elva in VSCodium and the browser", "100vw", "elva uses Front Matter CMS for easy content management", "rounded", "lazy", "auto", "async", "2400", "1688" %}

Features include:

### Performance things

* Optimised CSS, JS and HTML
* Responsive image shortcode that supports lazy loading and modern formats (avif, webp)
* Support for the [Photon CDN](https://developer.wordpress.com/docs/photon/) (can be turned on via settings)

### Accessibility things

* [Multilingual](https://www.11ty.dev/docs/plugins/i18n/)
* Dark / light mode (see the toggle in the footer)
* Skip link and ARIA hints

### Standards things

* [RSS feed]({{ "/feed/feed.xml" | locale_url }}) with XSLT styles
* [JSON feed]({{ "/feed/feed.json" | locale_url }})
* [Sitemap](/sitemap.xml)
* [Web manifest for PWAs]({{ "/site.webmanifest" | locale_url }})
* [humans.txt](/humans.txt) 
* [robots.txt](/robots.txt)
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