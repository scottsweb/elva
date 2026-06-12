---
title: Setup
date: 2026-06-11
tags:
  - setup
  - cli
---

The setup menu is accessed through the CLI by running `npm run cli` and selecting "Setup" from the main menu, or by using the direct command shortcuts documented below.

## Site setup

The site setup wizard walks you through configuring your site. It prompts for the site name, description, version, keywords, and author details including name, URL, email, and location. The information you enter is written to both `package.json` and `content/_data/settings.json`.

``` bash
npm run cli setup site
```

## Pick theme

elva themes can be switched at any time. The theme picker reads the `themes/` directory and lists all available theme folders. Once you select a theme, it is saved to `content/_data/settings.json` and takes effect immediately on the next build. Changing themes does not affect your content or configuration -- only the presentation layer changes. If you want to build a new theme, you can copy the `default` theme as a starting point.

``` bash
npm run cli setup theme
```

## Delete default content

When you first clone elva, it includes sample posts and pages (the ones you are reading now). This tool removes markdown files from the `posts` and `pages` collections across every configured language, while preserving the `index.md` and `404.md` files that are required for builds to keep working. This is useful for starting with a clean slate before adding your own content.

``` bash
npm run cli setup delete-default-content
```

## Editing via Front Matter CMS

Most settings can also be managed through Front Matter CMS without touching the command line or editing JSON files directly.

Next up, lets configure some [languages](/documentation/adding-additional-languages/).