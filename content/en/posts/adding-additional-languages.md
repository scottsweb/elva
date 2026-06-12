---
title: Managing languages
date: 2026-06-10
tags:
  - i18n
  - cli
---

Language management can be handled through the CLI, with all language configuration stored in `content/_data/locales.json`. You can manage languages through the interactive menu by running `npm run cli` and selecting `"Languages"`, or use the direct command shortcuts documented below.

<div class="notice notice-notice">If you only need a single language site, that is perfectly fine. You can simply keep the default language in &#x60;locales.json&#x60; and not add another.</div>

## List languages

The list command displays all configured languages along with their locale key, language code, text direction, and whether it is set as the default.

``` bash
npm run cli languages list

Name               Key     Locale      Dir   Default
--------------------------------------------------------------
1. English (en)*   en      en-gb       ltr   Yes
2. Svenska (sv)    sv      sv-se       ltr   No
--------------------------------------------------------------
```

## Add a language

Adding a language through the CLI creates the necessary folder structure and configuration files automatically. You will be prompted to enter the language name (e.g. "Francais"), the locale code (e.g. "fr-fr"), a shorthand code (e.g. "FR"), and the text direction (left-to-right or right-to-left).

After the language is registered, the CLI will ask whether you want to copy existing content from your default language into the new language folder. This is useful as a starting point for translation, but you can always delete or modify the copied content afterward. The CLI also creates translations and stopword files for the new locale under `content/_data/translations/` and `content/_data/stopwords/`. Stopwords are common words that appear in a language that will be filtered out of the search index template.

``` bash
npm run cli languages add
```

## Change the default language

Only one language can be marked as the default. This serves as the base for your site and is served at the root URL. If you need to change which language is the default, use this command to select a different one from your configured languages.

``` bash
npm run cli languages default
```

## Remove a language

Removing a language deletes the language folder and all its content, along with the associated translation and stopwords files. The CLI will not let you remove the default language, and it will ask for confirmation before deleting anything.

``` bash
npm run cli languages remove
```

## Editing locales.json by hand

All language configuration is stored in `content/_data/locales.json`. You can edit this file directly if you prefer. Each language entry contains the following fields:

``` json
{
    "en": {
        "dir": "ltr",
        "label": "English",
        "shorthand": "EN",
        "locale": "en-gb",
        "default": true
    }
}
```

- `dir` — Text direction. Use `ltr` for left-to-right languages or `rtl` for right-to-left languages like Arabic or Hebrew.
- `label` — The language name displayed in the interface, preferably in its native form (e.g. "Svenska" rather than "Swedish").
- `shorthand` — A short code used for language switchers and display purposes.
- `locale` — The full locale identifier used for HTML lang attributes and locale-specific formatting.
- `default` — Set to `true` for the default language. Only one language should be set to true.

After editing `locales.json` by hand, you will need to create the corresponding language folder under `content/` and the per-locale data files under `content/_data/` (translations, stopwords) for the language to work correctly. Using the CLI is the recommended approach for adding languages, as it handles all of this automatically.

Next up, configure your [collections](/documentation/collections/).
