---
title: Getting started
date: 2026-06-12
tags:
  - tag1
  - tag2
  - unique
---

elva is a multilingual, static site starter built on [Eleventy](https://11ty.dev). It is designed for personal websites, blogs, portfolios and sites that need to work well across multiple languages. [elva](https://github.com/scottsweb/elva) provides solid foundations for your next web project, you can see a full list of features on the [about](/about/) page.

To begin, make a directory and navigate to it:

``` bash
mkdir my-site-name
cd my-site-name
```

Clone the elva repository:

``` bash
git clone https://github.com/scottsweb/elva.git .
```

Install dependencies:

``` bash
npm install
```

Run Eleventy for site development. View the site at `http://localhost:8080`:

``` bash
npm run dev
```

Generate a production-ready build to the `dist` folder:

``` bash
npm run build:prod
```

You can also set the environment variable `NODE_ENV=production` in your hosting control panel and use `npm run build` as with previous versions of elva.

To use [Front Matter CMS](https://frontmatter.codes/), install [VSCodium](https://vscodium.com/) or [Visual Studio Code](https://code.visualstudio.com/) and enable the extension (if it doesn't enable automatically). It will open each time you launch your project.

## Command Line Interface

elva includes a built-in CLI tool accessible via `npm run cli`. It provides an interactive menu for managing your site's content, languages, collections, blogroll, and setup configuration. It's a great place to start with the [setup of your site](/documentation/setup/).