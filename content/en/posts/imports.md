---
title: Importing content
date: 2023-08-06
---

You can import content into elva using [11ty import](https://github.com/11ty/eleventy-import). It supports importing content from WordPress, RSS/Atom, Bluesky, the Fediverse and YouTube. 

Here are some examples of how to use it with elva:

## WordPress

Run the following command from within the elva directory in Terminal:

``` bash
# Import *all* posts from the WordPress API
# Draft posts available when WORDPRESS_USERNAME and WORDPRESS_PASSWORD environment
# variables are supplied, read more: https://www.11ty.dev/docs/environment-vars/

npx @11ty/import wordpress https://blog.fontawesome.com --output=content/en/posts/ 

# Useful flags when testing:
# --dryrun --assetrefs=disabled --within=7d
```

## Fediverse

Run the following command from within the elva directory in Terminal:

``` bash
# Import recent Mastodon posts (via RSS)

npx @11ty/import fediverse eleventy@fosstodon.org --output=content/en/toots/

# Useful flags when testing:
# --dryrun --assetrefs=disabled --within=7d
```

## Atom Feeds

Run the following command from within the elva directory in Terminal:

``` bash
# Import Atom feed posts

npx @11ty/import atom https://www.11ty.dev/blog/feed.xml --output=content/en/posts/ 

# Import GitHub releases (via Atom)

npx @11ty/import atom https://github.com/11ty/eleventy/releases.atom --output=content/en/releases/

# Useful flags when testing:
# --dryrun --assetrefs=disabled --within=7d
```

You can [see more examples in the official documentation](https://github.com/11ty/eleventy-import?tab=readme-ov-file#11tyimport).