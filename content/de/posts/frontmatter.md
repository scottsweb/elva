---
title: Front Matter
date: 2023-08-04
tags:
  - tag4
  - tag5
---

```markdown
---
layout: post
title: Hauptseitentitel, Überschrift Ebene eins
date: 2023-08-04
modified: 2023-08-04
thumbnail: /assets/img/test.jpg
thumbnailDescription: Eine alternative Textbeschreibung für das Vorschaubild
tags: 'page-demo'
draft: true
eleventyExcludeFromCollections: true
seo:
  title: Angepasster Titel (Standard ist Titel)
  description: SEO Beschreibung
  slug: mmm-slugs
  changeFrequency: daily
  sitemapPriority: '1.0'
  excludeFromSitemap: true
  noIndex: true
---
```

* `layout` — [Seitenlayout für die Seite](https://www.11ty.dev/docs/layouts/). Standard ist `post` für Beiträge und `page` für Seiten.
* `title` — Der Titel der aktuellen Seite.
* `date` — [Veröffentlichungsdatum](https://www.11ty.dev/docs/dates/). Du kannst hier spezielle Werte wie `Last Modified` einstellen.
* `modified` — Änderungsdatum.
* `thumbnail` — Relativer Pfad zum Vorschaubild/OpenGraph-Bild. Größe `1200px x 630px`.
* `thumbnailDescription` — Alternativtext für das Vorschaubild.
* `tags` – [Tags](https://www.11ty.dev/docs/collections/#add-to-a-collection-using-tags) werden aktuell für benutzerdefinierte Body-Klassen verwendet.
* `draft` — Entwurfsseiten werden lokal und auf Staging angezeigt, aber nicht in der Produktion.
* `eleventyExcludeFromCollections` — [Von 11ty-Sammlungen ausblenden](https://www.11ty.dev/docs/collections/#how-to-exclude-content-from-collections).
* `seo.title` — Angepasster Seitentitel für Suchmaschinen und OpenGraph.
* `seo.description` — Seitenbeschreibung für Suchmaschinen und OpenGraph.
* `seo.slug` — Neuen Slug für die Seite festlegen, der sich vom Dateinamen unterscheidet.
* `seo.changeFrequency` — [Wie oft ändert sich diese Seite?](https://www.sitemaps.org/protocol.html#changefreqdef)
* `seo.sitemapPriority` — [Priorität dieser URL im Vergleich zu anderen URLs auf deiner Website](https://www.sitemaps.org/protocol.html#prioritydef).
* `seo.excludeFromSitemap` — Diese Seite aus deiner sitemap.xml ausblenden.
* `seo.noIndex` — Von der Suchmaschinenindexierung

Fast alle Front Matter Felder sind optional, außer Titel (und Datum für Beiträge).