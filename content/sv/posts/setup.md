---
title: Inställningar
date: 2026-06-11
tags:
  - tag3
  - tag4
  - unik
seo:
  slug: installningar
---

Du öppnar inställningsmenyn via kommandoraden genom att köra `npm run cli` och välja ”Setup” i huvudmenyn, eller genom att använda de direkta kommandokortkommandon som beskrivs nedan.

## Webbplatsinställningar

Guiden för webbplatsinställningar hjälper dig att konfigurera din webbplats. Den ber dig ange webbplatsens namn, beskrivning, version, nyckelord och uppgifter om författaren, inklusive namn, URL, e-postadress och plats. Den information du anger skrivs till både `package.json` och `content/_data/settings.json`.

``` bash
npm run cli setup site
```

## Välj tema

elva-teman kan bytas när som helst. Temaväljaren läser katalogen `themes/` och listar alla tillgängliga temamappar. När du väljer ett tema sparas det i `content/_data/settings.json` och träder i kraft omedelbart vid nästa kompilering. Att byta tema påverkar inte ditt innehåll eller din konfiguration – endast presentationslagret ändras. Om du vill bygga ett nytt tema kan du kopiera `default`-temat som utgångspunkt.

``` bash
npm run cli setup theme
```

## Ta bort standardinnehåll

När du först klonar elva ingår exempel på inlägg och sidor (de du läser just nu). Detta verktyg tar bort markdown-filer från samlingarna `posts` och `pages` i alla konfigurerade språk, samtidigt som filerna `index.md` och `404.md` bevaras, eftersom de krävs för att kompileringarna ska fortsätta fungera. Detta är användbart för att börja med ett rent bord innan du lägger till ditt eget innehåll.

``` bash
npm run cli setup delete-default-content
```

## Redigera via Front Matter CMS

De flesta inställningar kan också hanteras via Front Matter CMS utan att du behöver använda kommandoraden eller redigera JSON-filer direkt.

Nu ska vi konfigurera några [språk](/sv/dokumentation/sprakhantering/).