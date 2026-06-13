---
title: Språkhantering
date: 2026-06-10
tags:
  - tag2
  - tag4
seo:
  slug: sprakhantering
---

Språkhanteringen kan skötas via kommandoradsgränssnittet (CLI), där alla språkinställningar lagras i `content/_data/locales.json`. Du kan hantera språk via det interaktiva menyn genom att köra `npm run cli` och välja `"Languages"`, eller använda de direkta kommandokortkommandon som beskrivs nedan.

<div class="notice notice-notice">Om du bara behöver en webbplats med ett enda språk är det helt okej. Du kan helt enkelt behålla standardspråket och inte lägga till något annat.</div>

## Lista språk

Kommandot list visar alla konfigurerade språk tillsammans med deras lokaliseringsnyckel, språkkod, textriktning och om det är inställt som standard.

``` bash
npm run cli languages list

Name               Key     Locale      Dir   Default
--------------------------------------------------------------
1. English (en)*   en      en-gb       ltr   Yes
2. Svenska (sv)    sv      sv-se       ltr   No
--------------------------------------------------------------
```

## Lägg till ett språk

När du lägger till ett språk via CLI skapas den nödvändiga mappstrukturen och konfigurationsfilerna automatiskt. Du ombeds ange språkets namn (t.ex. "Francais"), språkkoden (t.ex. "fr-fr"), en förkortning (t.ex. "FR") och textriktningen (vänster-till-höger eller höger-till-vänster).

När språket har registrerats frågar CLI om du vill kopiera befintligt innehåll från ditt standardspråk till den nya språkmappen. Detta är användbart som utgångspunkt för översättning, men du kan alltid radera eller ändra det kopierade innehållet i efterhand. CLI skapar också översättningar och stopordfiler för den nya lokaliseringen under `content/_data/translations/` och `content/_data/stopwords/`. [Stopord](https://www.kaggle.com/datasets/heeraldedhia/stop-words-in-28-languages/data?select=swedish.txt) är vanliga ord som förekommer i ett språk och som filtreras bort från sökindexmallen.

``` bash
npm run cli language add
```

## Ändra standardspråket

Endast ett språk kan markeras som standard. Detta fungerar som bas för din webbplats och visas på rot-URL:en. Om du behöver ändra vilket språk som är standard använder du detta kommando för att välja ett annat från dina konfigurerade språk.

``` bash
npm run cli language default
```

## Ta bort ett språk

När du tar bort ett språk raderas språkmappen och allt dess innehåll, tillsammans med tillhörande översättnings- och stopordfiler. CLI låter dig inte ta bort standardspråket och kommer att be om bekräftelse innan något raderas.

``` bash
npm run cli language remove
```

## Redigera locales.json

All språkkonfiguration lagras i `content/_data/locales.json`. Du kan redigera den här filen direkt om du föredrar det. Varje språkpost innehåller följande fält:

``` json
{
    "en": {
        "dir": "ltr",
        "label": "English",
        "shorthand": "EN",
        "locale": "en-gb",
        "default": true
    }
}
```

- `dir` — Textriktning. Använd `ltr` för språk som skrivs från vänster till höger eller `rtl` för språk som skrivs från höger till vänster, såsom arabiska eller hebreiska.
- `label` — Språkets namn som visas i gränssnittet, helst i sin ursprungliga form (t.ex. "Svenska" istället för "Swedish").
- `shorthand` — En kortkod som används för språkväljare och visningsändamål.
- `locale` — Den fullständiga lokalidentifieraren som används för HTML-lang-attribut och lokaliseringsspecifik formatering.
- `default` — Ställ in på `true` för standardspråket. Endast ett språk bör ställas in på true.

Efter att ha redigerat `locales.json` manuellt måste du skapa motsvarande språkmapp under `content/` och de lokalspecifika datafilerna under `content/_data/` (översättningar, stoppord) för att språket ska fungera korrekt. Det rekommenderas att använda CLI för att lägga till språk, eftersom det hanterar allt detta automatiskt.

Nästa steg är att konfigurera dina [samlingar](/sv/dokumentation/samlingar/).
