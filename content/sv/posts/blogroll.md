---
title: Skapa en blogglista
date: 2026-06-06
tags:
  - tag4
---


En blogroll är en lista över externa webbplatser och flöden som du vill länka till från din webbplats. Den används ofta som en länksida, en ”läs”-sektion eller en widget i sidfältet som visar relaterade bloggar och resurser. [Här är ett bra exempel på hur du kan använda den](https://benmyers.dev/blog/eleventy-blogroll/).

Blogroll-poster lagras i `content/_data/blogroll.json`. Du kan hantera poster via CLI eller redigera JSON-filen direkt. Blogroll-data kan också redigeras via Front Matter CMS om du föredrar ett grafiskt gränssnitt.

## Lista blogroll

Kommandot list visar alla poster i blogrollen med deras namn, webbplats-URL och feed-URL.

``` bash
npm run cli blogroll list

Name                      URL                                   Feed
----------------------------------------------------------------------------------------------------
1. Scott                   https://scott.ee                      https://scott.ee/feed/feed.xml
----------------------------------------------------------------------------------------------------
```

## Lägg till i blogroll

När du lägger till en post via CLI ombeds du ange webbplatsens namn, webbadress och feed-URL (vanligtvis en RSS- eller Atom-feed). CLI lägger automatiskt till `https://` i början om du glömmer att ange ett protokoll. Duplicerade URL:er och duplicerade feed-URL:er kontrolleras och förhindrar att posten läggs till om en matchning hittas.

``` bash
npm run cli blogroll add
```

## Ta bort från blogroll

Kommandot för borttagning visar alla aktuella blogroll-poster och låter dig välja en eller flera poster att ta bort med hjälp av ett gränssnitt för flerval. Efter valet tas de valda posterna bort från listan.

``` bash
npm run cli blogroll remove
```

## Redigera blogroll.json

Alla blogroll-poster lagras i `content/_data/blogroll.json`. Du kan redigera den här filen direkt om du föredrar det. Varje post innehåller följande fält:

``` json
{% include "../../_data/blogroll.json" %}
```

- `name` — Visningsnamnet på webbplatsen eller personen.
- `feed` — URL:en till RSS- eller Atom-flödet för denna post.
- `url` — Webbplatsens URL för denna post.

## Redigera via Front Matter CMS

Blogroll-poster kan också hanteras via Front Matter CMS. Du kan lägga till, redigera och ta bort blogroll-poster via CMS-gränssnittet (i datamenyn) utan att behöva använda kommandoraden eller redigera JSON-filer direkt.
