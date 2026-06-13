---
title: Komma igång
seo:
  slug: komma-igang
date: 2026-06-12
tags:
  - tag1
  - tag2
---

elva är ett flersprákigt startpaket for statiska webbplatser byggt pá [Eleventy](https://11ty.dev). Det är designat for personliga webbplatser, bloggar, portföljer och sajter som ska fungera bra pá flera sprák. [elva](https://github.com/scottsweb/elva) ger en solid grund for ditt nästa webbprojekt, du kan se en fullständig lista over funktioner pá [om-sidan](/om/).

Börja med att skapa en katalog och navigera dit:

``` bash
mkdir my-site-name
cd my-site-name
```

Klona elva förvaret:

``` bash
git clone https://github.com/scottsweb/elva.git .
```

Installationsberoenden:

``` bash
npm install
```

Kör Eleventy för webbplatsutveckling. Se webbplatsen på `http://localhost:8080`:

``` bash
npm run dev
```

Generera en produktionsklar build till mappen `dist`:

``` bash
npm run build:prod
```

Du kan ocksá ställa in miljövariabeln `NODE_ENV=production` i din kontrollpanel och använda `npm run build` som med tidigare versioner av elva.

For att använda [Front Matter CMS](https://frontmatter.codes/), installera [VSCodium](https://vscodium.com/) eller [Visual Studio Code](https://code.visualstudio.com/) och aktivera tillägget (om det inte aktiveras automatiskt). Det öppnas varje gång du startar projektet.

## Kommandotolgsgränssnitt

elva inneháller ett inbyggt CLI-verktyg som tillgángs via `npm run cli`. Det erbjuder ett interaktivt menygránssnitt for att hantera ditt sites inneháll, sprák, samlingar och instállningskonfiguration. Det ár en bra utgángspunkt for [att instállla din webbplats](/sv/dokumentation/installningar/).
