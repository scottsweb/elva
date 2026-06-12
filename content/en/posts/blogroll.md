---
title: Create a blogroll
date: 2026-06-07
tags:
  - blogroll
  - cli
---


A blogroll is a list of external sites and feeds that you want to link to from your site. It is commonly used for a links page, a "read" section, or a sidebar widget that displays related blogs and resources. [Here's a great example of how you might use it](https://benmyers.dev/blog/eleventy-blogroll/).

Blogroll entries are stored in `content/_data/blogroll.json`. You can manage entries through the CLI or edit the JSON file directly. The blogroll data is also editable through Front Matter CMS if you prefer a graphical interface.

## List blogroll

The list command displays all entries in the blogroll with their name, website URL, and feed URL.

``` bash
npm run cli blogroll list

Name                      URL                                   Feed
----------------------------------------------------------------------------------------------------
1. Scott                   https://scott.ee                      https://scott.ee/feed/feed.xml
----------------------------------------------------------------------------------------------------
```

## Add to blogroll

Adding an entry through the CLI prompts you for the site name, the website URL, and the feed URL (typically an RSS or Atom feed). The CLI will automatically prepend `https://` if you forget to include a protocol. Duplicate URLs and duplicate feed URLs are checked and will prevent the entry from being added if a match is found.

``` bash
npm run cli blogroll add
```

## Remove from blogroll

The remove command shows all current blogroll entries and lets you select one or more entries to remove using a multi-select interface. After selection, the chosen entries are removed from the list.

``` bash
npm run cli blogroll remove
```

## Editing blogroll.json by hand

All blogroll entries are stored in `content/_data/blogroll.json`. You can edit this file directly if you prefer. Each entry contains the following fields:

``` json
{% include "../../_data/blogroll.json" %}
```

- `name` — The display name of the site or person.
- `feed` — The URL of the RSS or Atom feed for this entry.
- `url` — The website URL for this entry.

## Editing via Front Matter CMS

Blogroll entries can also be managed through Front Matter CMS. You can add, edit, and remove blogroll entries through the CMS interface without touching the command line or editing JSON files directly.
