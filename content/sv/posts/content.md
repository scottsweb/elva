---
title: Hantera innehåll
date: 2026-06-08
tags:
  - tag2
  - tag5
seo:
  slug: innehall
---

Det rekommenderade sättet är att hantera ditt innehåll via [Front Matter CMS](https://frontmatter.codes/). Detta ger dig ett grafiskt gränssnitt för att skapa, redigera och ta bort innehållsfiler utan att behöva använda kommandoraden. Front Matter CMS aktiveras automatiskt när du har VSCodium eller Visual Studio Code installerat och tillägget är aktiverat.

När du öppnar ditt projekt i redigeraren startas Front Matter CMS och tillhandahåller ett gränssnitt för innehållshantering där du kan bläddra bland ditt innehåll samt skriva och ändra vanliga inställningar. 

Det är värt att läsa dokumentationen för [Front Matter CMS](https://frontmatter.codes/docs), eftersom den guidar dig genom avancerade ämnen som att automatisera ditt översättningsflöde och skapa vanliga kodsnuttar och skript. 

## Hantera innehåll via CLI 

elva tillhandahåller också flera CLI-verktyg för att hantera dina innehållsfiler, inklusive att lägga till nytt innehåll, ta bort befintligt innehåll, importera från externa källor och återskapa alla Open Graph-bilder.

## Lägg till innehåll

Kommandot add skapar en ny markdown-fil i den valda samlingen och på det valda språket. Du ombeds att välja innehållstyp (t.ex. inlägg, sidor eller någon anpassad samling du har skapat), ett eller flera målspråk, en titel och en slug. Slugen genereras automatiskt från titeln, men du kan ändra den.

Den nya filen skapas med hjälp av en mall. Om det finns en mall för den valda innehållstypen (lagrad i `.frontmatter/templates/`) används den mallen. Annars används standardmallen. Mallarna stöder platshållarvärden som `{{title}}` för titeln och `{{now}}` för dagens datum, vilka ersätts automatiskt när filen skapas.

När du skapar innehåll för en flerspråkig webbplats kan du välja flera målspråk samtidigt. CLI skapar en separat fil för varje valt språk.

För att språkväljaren ska fungera på en viss sida (när du tillhandahåller samma innehåll på olika språk) måste markdown-filerna ha samma filnamn i alla språkversioner. De faktiska URL:erna kan konfigureras via fältet `seo.slug` i [front matter](/sv/dokumentation/frontmatter/).

``` bash
npm run cli content add
```

## Ta bort innehåll

Kommandot remove söker efter filer som matchar en given slug i alla språk och samlingar. Det visar de filer som hittats och ber om bekräftelse innan de raderas. Du kan ange en slug utan `.md`-ändelsen så hanterar CLI sökningen automatiskt.

``` bash
npm run cli content remove
```

## Importera innehåll

Importkommandot är ett skal för [11ty import](https://github.com/11ty/import). Använd det för att hämta innehåll från externa källor till din webbplats. Det stöder import från WordPress (via REST API), RSS-flöden, Atom-flöden, Fediverse (Mastodon) och Bluesky. Importverktyget körs som en torrkörning som standard, vilket innebär att det visar vad som skulle importeras utan att faktiskt skriva några filer. Detta låter dig förhandsgranska resultaten innan du bekräftar.

Tillgångar (bilder) importeras tillsammans med innehållet och organiseras i en delad `content/assets/img/`-mapp. Importverktyget hanterar detta automatiskt. Importören försöker också konvertera allt importerat innehåll till markdown och se till att bildreferenser är korrekta, men det ger inte alltid perfekta resultat.

``` bash
npm run cli content import
```

## Skapa om Open Graph-bilder

Kommandot `regenerate` skannar alla Markdown-filer på alla språk och skapar om Open Graph-miniatyrbilderna baserat på frontmatter-data. Detta är användbart när du har lagt till eller ändrat mycket innehåll och vill ha nya miniatyrbilder, eller när du byter tema och behöver skapa om bilder med en ny mall.

Verktyget kräver att utvecklingsservern är igång eftersom det genererar bilder genom att ta skärmdumpar av Open Graph-förhandsgranskningsmallen på `http://localhost:8080/opengraph-preview.html`. Du kan anpassa den mallen med CSS, HTML etc. (precis som vilken annan mallfil som helst) för att ändra dina miniatyrbilder.

elva skiljer sig lite från andra startpaket här, eftersom miniatyrbilderna genereras under utvecklingen, inte vid byggtiden. Detta bidrar till att hålla byggtiden kortare och sparar resurser vid varje ny webbplatsdistribution.

``` bash
npm run cli content regenerate
```

[Blogroll, någon?](/sv/dokumentation/blogroll/)?