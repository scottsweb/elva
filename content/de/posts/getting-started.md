---
title: Erste Schritte
seo:
  slug: erste-schritte
date: 2023-08-07
tags:
  - tag1
  - tag2
---

Erstelle ein Verzeichnis und wechsle hinein:

``` bash
mkdir mein-seitenname
cd mein-seitenname
```

Klonen Sie das elva-Repository:

``` bash
git clone https://github.com/scottsweb/elva.git .
```

Installieren Sie die Abhängigkeiten:

``` bash
npm install
```

Starte Eleventy für die Webseitenentwicklung. Die Seite ist erreichbar unter `http://localhost:8080`:

``` bash
npm run dev
```

Erzeuge einen produktionsfertigen Build im Ordner `dist`:

``` bash
npm run build:prod
```

Du kannst auch die Umgebungsvariable `NODE_ENV=production` in deinem Hosting-Kontrollpanel setzen und `npm run build` wie in früheren Versionen von elva verwenden.

Um [Front Matter CMS](https://frontmatter.codes/) zu nutzen, installiere [VSCodium](https://vscodium.com/) oder [Visual Studio Code](https://code.visualstudio.com/) und aktiviere die Erweiterung (falls sie nicht automatisch aktiviert wird). Sie öffnet sich jedes Mal, wenn du dein Projekt startest.