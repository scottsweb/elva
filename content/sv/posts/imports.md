---
title: Importera innehåll
date: 2023-08-06
---

Du kan importera innehåll till elva med hjälp av [11ty import](https://github.com/11ty/eleventy-import). Den stöder import av innehåll från WordPress, RSS/Atom, Bluesky, Fediverse och YouTube. 

Här är några exempel på hur man använder den med elva:

## WordPress

Kör följande kommando från elva-mappen i Terminal:

``` bash
# Importera *alla* inlägg från WordPress API
# Utkast till inlägg tillgängliga när miljövariabler WORDPRESS_USERNAME och 
# WORDPRESS_PASSWORD tillhandahålls, läs mer: https://www.11ty.dev/docs/environment-vars/

npx @11ty/import wordpress https://blog.fontawesome.com --output=content/sv/posts/ 

# Användbara flaggor vid testning:
# --dryrun --assetrefs=disabled --within=7d
```

## Fediverse

Kör följande kommando från elva-mappen i Terminal:

``` bash
# Importera senaste Mastodon-inlägg (via RSS)

npx @11ty/import fediverse eleventy@fosstodon.org --output=content/sv/toots/

# Användbara flaggor vid testning:
# --dryrun --assetrefs=disabled --within=7d
```

## Atom Feeds

Kör följande kommando från elva-mappen i Terminal:

``` bash
# Importera Atom-flöde

npx @11ty/import atom https://www.11ty.dev/blog/feed.xml --output=content/sv/posts/ 

# Importera GitHub releases (via Atom)

npx @11ty/import atom https://github.com/11ty/eleventy/releases.atom --output=content/sv/releases/

# Användbara flaggor vid testning:
# --dryrun --assetrefs=disabled --within=7d
```

Du kan [se fler exempel i den officiella dokumentationen](https://github.com/11ty/eleventy-import?tab=readme-ov-file#11tyimport).