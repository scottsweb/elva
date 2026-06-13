---
title: Om
tags: _search
seo:
  slug: om
  description: Ett flerspråkigt, rent, grönt, 11ty starter theme. elva ger en solid grund för ditt nästa webbprojekt och ett inbyggt CMS för att hantera innehåll.
eleventyNavigation:
  key: about
  title: Om
  order: 1
---

Ett flerspråkigt, rent, grönt, [11ty starter theme](https://www.11ty.dev/docs/starter/). elva ger en solid grund för ditt nästa webbprojekt och ett inbyggt CMS ([Front Matter CMS](https://frontmatter.codes/)) för att hantera innehåll. Du tittar för närvarande på demosidan som också innehåller [lite dokumentation]({{ "/" | locale_url }}) som hjälper dig att komma igång. Gå över till [GitHub för att göra funktionsförfrågningar, pull requests och rapportera problem](https://github.com/scottsweb/elva/issues).

![Screenshot of elva in VSCodium and the browser.](/assets/img/screenshots.png "elva använder Front Matter CMS för enkel innehållshantering")

Funktioner inkluderar:

### Prestanda saker

* Optimerad CSS, JS och HTML
* Responsiva bilder som stöder lazy loading och moderna format (avif, webp)
* [Critical CSS](https://github.com/11ty/eleventy-plugin-bundle) med 11ty bundle
* Stöd för [Photon CDN](https://developer.wordpress.com/docs/photon/) (kan slås på via inställningar)

### Tillgänglighets saker

* [Flerspråkig](https://www.11ty.dev/docs/plugins/i18n/)
* Mörkt / ljust läge (se växlingen i sidfoten)
* Hoppa över länk och ARIA-tips

### Standarder saker

* [RSS feed]({{ "/feed/feed.xml" | locale_url }}) med XSLT styles
* [JSON feed]({{ "/feed/feed.json" | locale_url }})
* [Sitemap](/sitemap.xml)
* [Web manifest for PWAs]({{ "/site.webmanifest" | locale_url }})
* [humans.txt](/humans.txt) 
* [robots.txt](/robots.txt)
* Avråda från [AI bots](https://github.com/ai-robots-txt/ai.robots.txt/)


### Andra saker

* [Ett CLI](/sv/dokumentation/installningar/) för att hantera språk, installation och vanliga uppgifter (`npm run cli`)
* Sök-API (se `dist/api/search.json`). Allt innehåll taggat med `_search` kommer att visas i sökindexet
* [Front Matter CMS](https://frontmatter.codes/)
* Generering av öppna grafbilder (utvecklingsservern måste vara igång)
* Utkaststöd
* [Syntaxmarkering](https://www.11ty.dev/docs/plugins/syntaxhighlight/)
* [Förenklade inbäddningar för YouTube, Vimeo etc.](https://github.com/gfscott/eleventy-plugin-embed-everything)
* Många användbara filter och funktioner (se `/elva/filters/*`)
* [Alpine.js](https://alpinejs.dev/)
* [Eleventy Fetch](https://www.11ty.dev/docs/plugins/fetch/)
* [Eleventy Navigation](https://www.11ty.dev/docs/plugins/navigation/)
