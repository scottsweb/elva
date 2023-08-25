---
title: Front matter
date: 2023-08-04
---

``` markdown
---
layout: page
title: Main page title, heading level one
date: 2023-08-04
modified: 2023-08-04
thumbnail: /assets/img/test.jpg
thumbnailDescription: An alt text description for the thumbnail image
tags: 'page-demo'
draft: true
eleventyExcludeFromCollections: true
seo:
  title: Custom title (defaults to title)
  description: SEO description
  slug: mmm-slugs
  changeFrequency: daily
  sitemapPriority: '1.0'
  excludeFromSitemap: true
  noIndex: true
---
```

* `layout` — [Page layout](https://www.11ty.dev/docs/layouts/) for the page. Default is `post` for posts and `page` for pages.
* `title` — The title of the current page.
* `date` — [Published date](https://www.11ty.dev/docs/dates/). You can set special values here like `Last Modified`.
* `modifed` — Modified date.
* `thumbnail` — Relative path to thumbnail / opengraph image. Size `1200px x 630px`.
* `thumbnailDescription` — Alt text for thumbnail.
* `tags` – [Tags](https://www.11ty.dev/docs/collections/#add-to-a-collection-using-tags) are currently used for custom body classes.
* `draft` — Draft pages will appear locally and on staging but not in production.
* `eleventyExcludeFromCollections` — [Hide from 11ty collections](https://www.11ty.dev/docs/collections/#how-to-exclude-content-from-collections).
* `seo.title` — Set custom page title for search engines and opengraph.
* `seo.description` — Set the page description for search engines and opengraph.
* `seo.slug` — Set a new slug for the page that is different from the filename.
* `seo.changeFrequency` — [How often does this page change](https://www.sitemaps.org/protocol.html#changefreqdef)?
* `seo.sitemapPriority` — [The priority of this URL relative to other URLs on your site](https://www.sitemaps.org/protocol.html#prioritydef).
* `seo.excludeFromSitemap` — Hide this page from your sitemap.xml.
* `seo.noIndex` — Discourage search engine indexing.

Nearly all front matter is optional, except for titles (and dates for posts).