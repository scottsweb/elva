---
title: Front matter
date: 2026-06-04
tags:
  - tag4
  - tag5
---

``` markdown
---
layout: post
title: Huvudsidans titel, rubrik nivå ett
date: 2023-08-04
modified: 2023-08-04
thumbnail: /assets/img/test.jpg
thumbnailDescription: En alternativ textbeskrivning för miniatyrbilden
tags: 'page-demo'
draft: true
eleventyExcludeFromCollections: true
seo:
  title: Anpassad titel (standard till titel)
  description: SEO beskrivning
  slug: mmm-slugs
  changeFrequency: daily
  sitemapPriority: '1.0'
  excludeFromSitemap: true
  noIndex: true
eleventyNavigation:
  key: docs
  title: Dokumentation
  order: 2
---
```

* `layout` — [Sidlayout för sidan](https://www.11ty.dev/docs/layouts/). Standard är `post` för inlägg och `page` för sidor.
* `title` — Titeln på den aktuella sidan.
* `date` — [Publiceringsdatum](https://www.11ty.dev/docs/dates/). Du kan ställa in speciella värden här som `Last Modified`.
* `modified` — Ändrat datum.
* `thumbnail` — Relativ väg till miniatyr/opengraph bild. Storlek `1200px x 630px`.
* `thumbnailDescription` — Alt text för miniatyrbild.
* `tags` – [Taggar](https://www.11ty.dev/docs/collections/#add-to-a-collection-using-tags) används för närvarande för anpassade body classes.
* `draft` — Utkastsidor kommer att visas lokalt och på scenen men inte i produktion.
* `eleventyExcludeFromCollections` — [Göm från 11ty samlingar](https://www.11ty.dev/docs/collections/#how-to-exclude-content-from-collections).
* `seo.title` — Ställ in anpassad sidtitel för sökmotorer och opengraph.
* `seo.description` — Ställ in sidbeskrivningen för sökmotorer och opengraph.
* `seo.slug` — Ställ in en ny slug för sidan som skiljer sig från filnamnet.
* `seo.changeFrequency` — [Hur ofta ändras den här sidan](https://www.sitemaps.org/protocol.html#changefreqdef)?
* `seo.sitemapPriority` — [Prioriteten för denna webbadress i förhållande till andra webbadresser på din webbplats](https://www.sitemaps.org/protocol.html#prioritydef).
* `seo.excludeFromSitemap` — Dölj den här sidan från din sitemap.xml.
* `seo.noIndex` — Avråda från sökmotor indexering.
* `eleventyNavigation.key` — En unik identifierare for sidan i [eleventy navigation](https://www.11ty.dev/docs/plugins/navigation/)-pluginet.
* `eleventyNavigation.title` — Visningstiteln for sidan i navigeringsmenyn.
* `eleventyNavigation.order` — Sidordningen i navigeringsmenyn. Lägre siffror visas först.

Nästan allt front matter är valfritt, förutom titlar (och datum för posts).
