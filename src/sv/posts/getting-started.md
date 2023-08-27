---
title: Komma igång
seo:
  slug: komma-igang
date: 2023-08-06
---

Skapa en katalog och navigera till den:

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
npm run build
```

För att använda [Front Matter CMS](https://frontmatter.codes/), installera [VSCodium](https://vscodium.com/) eller [Visual Studio Code](https://code.visualstudio.com/) och aktivera tillägget (om det inte aktiveras automatiskt). Den öppnas varje gång du startar ditt projekt.