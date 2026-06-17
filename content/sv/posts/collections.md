---
title: Hantering samlingar
date: 2026-06-09
tags:
  - tag1
  - tag3
seo:
  slug: samlingar
---

Samlingar i elva liknar anpassade inläggstyper i WordPress. De utgör det verktyg som du använder för att organisera olika typer av innehåll i grupper, där varje grupp har sin egen URL-struktur, layout och funktionalitet.

Som standard levereras elva med två samlingar: `posts` och `pages`. Inlägg används vanligtvis för tidsbaserat innehåll som blogginlägg eller artiklar, medan sidor används för statiskt innehåll som en om-sida eller kontaktsida. Både inlägg och sidor är skyddade samlingar, vilket innebär att de inte kan tas bort via CLI. Skyddade samlingar är en säkerhetsfunktion som förhindrar oavsiktlig radering av de centrala innehållstyper som elva är beroende av.

Du kan skapa ytterligare samlingar för vilken typ av innehåll du än behöver; projekt, recept, recensioner, portföljobjekt eller vad som helst annat. Varje samling får sin egen mapp under varje språkkatalog, sitt eget URL-prefix och sin egen layoutmall.

Samlingskonfigurationen lagras i `content/_data/types.json`. Du kan visa och redigera den här filen direkt, eller använda CLI-verktygen som beskrivs nedan.

## Lista samlingar

Kommandot list visar alla konfigurerade samlingar med en sammanfattning av användbara inställningar.

``` bash
npm run cli collections list

Label                  Layout    Protected    Search      Feed
--------------------------------------------------------------------------------------------
1. Posts (posts)       post      Yes          Yes         Yes     
2. Pages (pages)       page      Yes          No          No      
--------------------------------------------------------------------------------------------
```

## Lägg till en samling

När du lägger till en samling via CLI skapas en samlingspost i `types.json` och mappstrukturen konfigureras för varje konfigurerat språk. Du ombeds ange en beskrivande samlingsetikett (t.ex. "Projekt"), ett standard-URL-prefix (t.ex. "projects"), vilken layoutmall som ska användas, om samlingen ska inkluderas i sökindexet, om den ska generera RSS/JSON-matningar och om den ska skyddas.

För flerspråkiga webbplatser ombeds du också att ange en slug för varje språk. Detta gör att du kan ha olika URL-prefix per språk om det behövs (t.ex. "projects" på engelska och "projekt" på svenska). CLI skapar en `collectionname.11tydata.js` fil i varje samlingsmapp, som konfigurerar permalänkarna och metadatan för alla objekt i den samlingen.

``` bash
npm run cli collection add
```

## Redigera en samling

Med redigeringskommandot kan du ändra alla befintliga samlingar. Redigeringsmenyn visar det aktuella värdet för varje fält som standard, så du kan lämna ett fält oförändrat genom att trycka på Enter.

Efter att du har [lagt till ett nytt språk](/sv/dokumentation/sprakhantering/), kanske du vill redigera dina samlingar för att lägga till anpassade slug för varje samlingstyp.

``` bash
npm run cli collection edit
```

## Ta bort en samling

När du tar bort en samling raderas den från `types.json` och alla innehållsfiler på alla språk tas bort. CLI visar endast icke-skyddade samlingar i urvalslistan, eftersom skyddade samlingar inte kan tas bort. Du kommer att bli ombedd att bekräfta innan några filer raderas.

``` bash
npm run cli collection remove
```

## Redigera types.json

All samlingskonfiguration lagras i `content/_data/types.json`. Du kan redigera den här filen direkt om du föredrar det. Så här ser filen ut:

``` json
{% include "../../_data/types.json" %}
```

Varje samlingspost innehåller följande fält:

- `label` — Det visningsnamn som visas i CLI och eventuella administratörsgränssnitt.
- `prefix` — Standard-URL-prefixet för objekt i denna samling.
- `protected` — När `true`, kan samlingen inte tas bort via CLI. Inlägg och sidor är alltid skyddade.
- `searchable` — När `true`, inkluderas alla objekt i denna samling i webbplatsens sökindex.
- `feed` — När `true`, genereras RSS- och JSON-matningar för denna samling på `/feed/{collection}.xml` och `/feed/{collection}.json`.
- `layout` — Temamallen som används för att rendera objekt i denna samling (t.ex. `post`, `page`, `project`).
- `locales` — URL-slugs per språk. Om ett språk inte finns med här används värdet för `prefix` som fallback.

Efter att ha redigerat `types.json` manuellt måste du skapa motsvarande mappar under varje språkkatalog och lägga till en `{collectionname}.11tydata.js`-fil för varje samling. Mallen för denna fil finns i `.cli/templates/collection.11tydata.js` och kan kopieras till varje ny samlingsmapp. Du kan också köra `npm run cli sync-collections` för att återskapa alla samlingsmallfiler på en gång.

[Nu ska vi lägga till några översättningar](/sv/dokumentation/oversattningar/).