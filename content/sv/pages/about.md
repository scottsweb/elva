---
title: Om
seo:
  slug: om
  description: Ett flerspråkigt, rent, grönt, 11ty starter theme. elva ger en solid grund för ditt nästa webbprojekt och ett inbyggt CMS för att hantera innehåll.
---

Ett flerspråkigt, rent, grönt, [11ty starter theme](https://www.11ty.dev/docs/starter/). elva ger en solid grund för ditt nästa webbprojekt och ett inbyggt CMS ([Front Matter CMS](https://frontmatter.codes/)) för att hantera innehåll. Du tittar för närvarande på demosidan som också innehåller [lite dokumentation]({{ "/" | locale_url }}) som hjälper dig att komma igång. Gå över till [GitHub för att göra funktionsförfrågningar, pull requests och rapportera problem](https://github.com/scottsweb/elva/issues).

![Screenshot of elva in VSCodium and the browser.](/assets/img/screenshots.png "elva använder Front Matter CMS för enkel innehållshantering")

Funktioner inkluderar:

### Prestanda saker

* Optimerad CSS, JS och HTML
* Responsiva bilder som stöder lazy loading och moderna format (avif, webp)
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

* [Front Matter CMS](https://frontmatter.codes/)
* Open graph grafbildsgenerering inifrån Front Matter CMS (dev-servern måste vara igång)
* Förslag stöd
* [Syntax highlighting](https://www.11ty.dev/docs/plugins/syntaxhighlight/)
* [Förenklade inbäddningar för YouTube, Vimeo etc](https://github.com/gfscott/eleventy-plugin-embed-everything)
* Användbara filter och funktioner
* [Alpine.js](https://alpinejs.dev/)
* [Eleventy Fetch](https://www.11ty.dev/docs/plugins/fetch/)