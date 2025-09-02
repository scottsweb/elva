---
title: Inhalte importieren
date: 2023-08-06
tags:
  - tag3
  - tag4
---

Du kannst Inhalte in elva mit [11ty import](https://github.com/11ty/eleventy-import) importieren. Es unterstützt den Import von Inhalten aus WordPress, RSS/Atom, Bluesky, Fediverse und YouTube.

Hier sind einige Beispiele, wie du es mit elva verwendest:

## WordPress

Führe folgendes Kommando im elva-Verzeichnis im Terminal aus:

``` bash
# *Alle* Beiträge aus der WordPress API importieren
# Entwürfe sind verfügbar, wenn die Umgebungsvariablen WORDPRESS_USERNAME und 
# WORDPRESS_PASSWORD gesetzt sind. Mehr dazu: https://www.11ty.dev/docs/environment-vars/

npx @11ty/import wordpress https://blog.fontawesome.com --output=content/de/posts/ 

# Nützliche Flags zum Testen:
# --dryrun --assetrefs=disabled --within=7d
```

<div class="notice notice-warning">Hinweis! Bilder werden zusammen mit Markdown importiert. Du musst die Assets eventuell in einen geeigneteren Ordner (/content/assets/) verschieben oder die Bildreferenzen anpassen.</div>

## Fediverse

Führe folgendes Kommando im elva-Verzeichnis im Terminal aus:

``` bash
# Neueste Mastodon-Beiträge importieren (via RSS)

npx @11ty/import fediverse eleventy@fosstodon.org --output=content/de/toots/

# Nützliche Flags zum Testen:
# --dryrun --assetrefs=disabled --within=7d
```

## Atom Feeds

Führe folgendes Kommando im elva-Verzeichnis im Terminal aus:

``` bash
# Atom-Feed importieren

npx @11ty/import atom https://www.11ty.dev/blog/feed.xml --output=content/de/posts/ 

# GitHub Releases importieren (via Atom)

npx @11ty/import atom https://github.com/11ty/eleventy/releases.atom --output=content/de/releases/

# Nützliche Flags zum Testen:
# --dryrun --assetrefs=disabled --within=7d
```

Du findest [weitere Beispiele in der offiziellen Dokumentation](https://github.com/11ty/eleventy-import?tab=readme-ov-file#11tyimport).