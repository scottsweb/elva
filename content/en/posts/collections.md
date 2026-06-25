---
title: Managing collections
date: 2026-06-09
tags:
  - tag1
  - tag3
---

Collections in elva are similar to custom post types in WordPress. They are the mechanism by which you organise different kinds of content into groups, each with its own URL structure, layout, and behaviour.

By default, elva comes with two collections: `posts` and `pages`. Posts are typically used for time-based content like blog entries or articles, while pages are used for static content like an about page or contact page. Both posts and pages are protected collections, meaning they cannot be removed through the CLI. Protected collections are a safety feature that prevents accidental deletion of the core content types that elva relies on.

You can create additional collections for any kind of content you need; projects, recipes, reviews, portfolio items, or anything else. Each collection gets its own folder under each language directory, its own URL prefix, and its own layout template.

Collection configuration is stored in `content/_data/types.json`. You can view and edit this file directly, or use the CLI tools described below.

## List collections

The list command shows all configured collections with a summary of useful settings.

``` bash
npm run cli collections list

Label                  Layout    Protected    Search      Feed
--------------------------------------------------------------------------------------------
1. Posts (posts)       post      Yes          Yes         Yes     
2. Pages (pages)       page      Yes          No          No      
--------------------------------------------------------------------------------------------
```

## Add a collection

Adding a collection through the CLI creates the collection entry in `types.json` and sets up the folder structure for each configured language. You will be prompted for a friendly collection label (e.g. "Projects"), a default URL prefix (e.g. "projects"), the layout template to use, whether the collection should be included in the search index, whether it should generate RSS/JSON feeds, and whether it should be protected.

For multilingual sites, you will also be asked to provide a slug for each language. This allows you to have different URL prefixes per language if needed (e.g. "projects" in English and "projekt" in Swedish). The CLI creates a `collectionname.11tydata.js` file in each collection folder, which configures the permalinks and metadata for all items within that collection.

``` bash
npm run cli collection add
```

## Edit a collection

The edit command lets you modify any existing collection. The edit menu shows the current value for each field as a default, so you can leave any field unchanged by pressing Enter.

After [adding a new language](/documentation/adding-additional-languages/), you may want to edit your collections to add custom slug for each collection type, in the newly added language.

``` bash
npm run cli collection edit
```

## Remove a collection

Removing a collection deletes it from `types.json` and removes all content files across all languages. The CLI only shows non-protected collections in the selection list, since protected collections cannot be removed. You will be asked to confirm before any files are deleted.

``` bash
npm run cli collection remove
```

## Editing types.json

All collection configuration is stored in `content/_data/types.json`. You can edit this file directly if you prefer. Here is what the file looks like:

``` json
{% include "../../_data/types.json" %}
```

Each collection entry contains the following fields:

- `label` — The display name shown in the CLI and any admin interfaces.
- `prefix` — The default URL prefix for items in this collection.
- `protected` — When `true`, the collection cannot be removed via the CLI. Posts and pages are always protected.
- `searchable` — When `true`, all items in this collection are included in the site search index.
- `feed` — When `true`, RSS and JSON feeds are generated for this collection at `/feed/{collection}.xml` and `/feed/{collection}.json`.
- `layout` — The theme template used to render items in this collection (e.g. `post`, `page`, `project`).
- `locales` — Per-language URL slugs. If a language is not listed here, the `prefix` value is used as a fallback.

After editing `types.json` by hand, you will need to create the corresponding folders under each language directory and add a `{collectionname}.11tydata.js` file for each collection. The template for this file is stored in `.cli/templates/collection.11tydata.js` and can be copied into each new collection folder. You can also run `npm run cli sync-collections` to regenerate all collection template files at once.

[Now lets add some translations](/documentation/translations/).