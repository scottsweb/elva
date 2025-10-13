---
title: Über uns
seo:
  slug: ueber
  description: Ein mehrsprachiges, sauberes, grünes 11ty Starter-Theme. elva stellt ein solides Fundament für dein nächstes Web-Projekt zur Verfügung und beinhaltet ein eingebautes CSM um Inhalte zu verwalten.
---

Ein mehrsprachiges sauberes, grünes[11ty Starter-Theme](https://www.11ty.dev/docs/starter/). elva bietet eine solide Grundlage für dein nächstes Webprojekt und ein integriertes CMS ([Front Matter CMS](https://frontmatter.codes/)) zur Verwaltung von Inhalten. Du siehst dir gerade die Demoseite an, die auch [etwas Dokumentation]({{ "/" | locale_url }}) enthält, um dir den Einstieg zu erleichtern. Schau auf [GitHub vorbei, um Feature-Anfragen zu stellen, Pull Requests einzureichen und Probleme zu melden](https://github.com/scottsweb/elva/issues).

![Screenshot von elva in VSCodium und im Browser.](/assets/img/screenshots.png "elva verwendet Front Matter CMS für eine einfache Inhaltsverwaltung")

Funktionen umfassen:

### Performance

* Optimiertes CSS, JS und HTML
* Responsive Bilder mit Unterstützung für Lazy Loading und moderne Formate (avif, webp)
* Unterstützung für [Photon CDN](https://developer.wordpress.com/docs/photon/) (kann in den Einstellungen aktiviert werden)

### Barrierefreiheit

* [Mehrsprachig](https://www.11ty.dev/docs/plugins/i18n/)
* Dunkel-/Hellmodus (siehe Umschalter in der Fußzeile)
* Skip-Link und ARIA-Hinweise

### Standards

* [RSS-Feed]({{ "/feed/feed.xml" | locale_url }}) mit XSLT-Styles
* [JSON-Feed]({{ "/feed/feed.json" | locale_url }})
* [Sitemap](/sitemap.xml)
* [Web Manifest für PWAs]({{ "/site.webmanifest" | locale_url }})
* [humans.txt](/humans.txt) 
* [robots.txt](/robots.txt)
* Ausschluss von [AI-Bots](https://github.com/ai-robots-txt/ai.robots.txt/)

### Sonstiges

* [Front Matter CMS](https://frontmatter.codes/)
* Open Graph-Bilderzeugung direkt aus dem Front Matter CMS (der Dev-Server muss laufen)
* Vorschlagsunterstützung
* [Syntax-Highlighting](https://www.11ty.dev/docs/plugins/syntaxhighlight/)
* [Einfache Einbettungen für YouTube, Vimeo etc.](https://github.com/gfscott/eleventy-plugin-embed-everything)
* Nützliche Filter und Funktionen
* [Alpine.js](https://alpinejs.dev/)
* [Eleventy Fetch](https://www.11ty.dev/docs/plugins/fetch/)