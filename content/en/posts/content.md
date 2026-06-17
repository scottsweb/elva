---
title: Managing content
date: 2026-06-07
tags:
  - tag2
  - tag5
---

The preferred approach is to manage your content through [Front Matter CMS](https://frontmatter.codes/). This provides a graphical interface for creating, editing, and deleting content files without using the command line. Front Matter CMS is enabled automatically when you have VSCodium or Visual Studio Code installed and the extension active.

When you open your project in the editor, Front Matter CMS launches and provides a content management interface where you can browse your content, write and modify common settings. 

It's worth reading the [Front Matter CMS](https://frontmatter.codes/docs) documentation as it will guide you through advanced topics like automating your translation workflow, creating common snippets and scripts. 

## Managing content via the CLI 

elva also provides several CLI tools for managing your content files, including adding new content, removing existing content, importing from external sources, and regenerating all open graph images.

## Add content

The add command creates a new markdown file in your chosen collection and language. You will be prompted to select the content type (e.g. posts, pages, or any custom collection you have created), one or more target languages, a title, and a slug. The slug is auto-generated from the title, but you can override it.

The new file is created using a template. If a template exists for the selected content type (stored in `.frontmatter/templates/`), that template is used. Otherwise, the default template is used. Templates support placeholder values like `{{title}}` for the title and `{{now}}` for today's date, which are automatically replaced when the file is created.

When creating content for a multilingual site, you can select multiple target languages at once. The CLI creates a separate file for each selected language.

For the language switcher to work on a given page (when you are providing the same content in different languages), the markdown files must have the same filename across all locales. Actual URLs can be configured via the [front matter](/documentation/frontmatter/) `seo.slug` field.

``` bash
npm run cli content add
```

## Remove content

The remove command searches for files matching a given slug across all languages and collections. It displays the files found and asks for confirmation before deleting them. You can enter a slug without the `.md` extension and the CLI will handle the lookup automatically.

``` bash
npm run cli content remove
```

## Import content

The import command is a wrapper for [11ty import](https://github.com/11ty/import). Use it to bring content from external sources into your site. It supports importing from WordPress (via the REST API), RSS feeds, Atom feeds, the Fediverse (Mastodon), and Bluesky. The import tool runs as a dry run by default, meaning it will show you what would be imported without actually writing any files. This lets you preview the results before committing.

Assets (images) are imported alongside the content and are organized into a shared `content/assets/img/` folder. The import tool handles this automatically. The importer also attempts to convert all imported content into markdown and make sure image references are correct, but it's not always going to give perfect results.

``` bash
npm run cli content import
```

## Regenerate open graph images

The regenerate command scans all markdown files across all languages and regenerates the open graph thumbnail images based on the front matter data. This is useful when you have added or changed lots of content and want fresh thumbnails, or when you switch themes and need to regenerate images with a new template.

The tool requires the dev server to be running as it generates images by taking screenshots of the open graph preview template at `http://localhost:8080/opengraph-preview.html`. You can customise that template with CSS, HTML etc (like any other template file) in order to change your thumbnails.

elva is a little different to other starters here as thumbnails are generated during development, not at build time. This helps to keep builds quicker and saves wasting resources with every new site deployment.

``` bash
npm run cli content regenerate
```

[Blogroll anyone](/documentation/blogroll/)?