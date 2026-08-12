---
title: Managing translations
date: 2026-06-08
tags:
  - tag1
  - tag2
---

Translations in elva are stored as JSON files under `content/_data/translations/`, with one file per language (e.g. `en.json`, `sv.json`). The default language's translation file serves as the source of truth. When you add a new language, a copy of the default translation file is created for that locale, which you can then customize.

Translation strings are referenced in your theme templates using the `translate` filter. This allows you to externalise all user-facing text from your templates, making it easy to update wording or add new languages without modifying template code.

<div class="notice notice-notice">If you only need a single language site, that is perfectly fine. You can still use the translate filter for all your strings, or leave it out entirely if you prefer not to use translations at all.</div>

## Add a translation

The add command walks you through creating a new translation entry. You will be prompted to select the template or include where the translation will be used, enter a unique key (e.g. `primaryButton`), and specify whether it is a plural translation.

For each configured language, you will be asked to enter the translation value. Non-default locales are pre-filled with the default language's value as a starting point. For plural translations, you will enter the singular (one) and plural (other) forms for each language.

The CLI checks for conflicts before adding. You cannot create a nested key that conflicts with an existing simple string, or vice versa.

``` bash
npm run cli translation add
```

## Remove a translation

The remove command searches for translations by their displayed value in the default locale. You enter a search string, select the translation to remove from the matching results, and confirm the deletion. The translation is removed from all translation files at once.

``` bash
npm run cli translation remove
```

## Sync translations

When you add new translation keys to your default locale file, other locales may be missing those entries. The sync command copies any missing keys from the default locale into all other locale files, pre-filling them with the default language's value. This ensures all locales stay in sync with your source of truth.

``` bash
npm run cli translations sync
```

## Editing translation files

All translations are stored as JSON files in `content/_data/translations/`. You can edit these files directly if you prefer. Each file uses a nested structure with dot-notation keys that correspond to where the translation is used in your templates.

Here is what a translation file looks like:

{% raw %}
``` json
{
    "header": {
        "skipLink": "Skip to content",
        "home": "Home"
    },
    "readingTime": {
        "underMinute": "Less than a minute to read",
        "count": {
            "one": "{{ minutes }} minute to read",
            "other": "{{ minutes }} minutes to read"
        }
    }
}
```
{% endraw %}

The structure is flat enough to be easy to edit, but nested enough to keep related strings organized.

You can add, edit, or delete entries directly in these files. After editing, rebuild the site for changes to take effect. For plural translations, use the `count` object with `one` and `other` keys as shown in the `readingTime` example above.

## Using translations in templates

The `translate` filter is available in all template files. It finds the translation key from the active language's translation file and returns the corresponding string.

{% raw %}
```html
<h1>{{ 'header.home' | translate }}</h1>
<p>{{ 'footer' | translate }}</p>
```
{% endraw %}

The filter takes the dot-notation key as its first argument and the language code as its second. If no language is provided, it defaults to the current page's language. When a key is not found, the filter returns the key itself, which is useful for identifying missing translations during development.

### Variable substitution

Translations can include placeholders that are replaced with values passed as the third argument. This is done using nunjucks template syntax inside the translation string.

{% raw %}
```json
{
    "greeting": "Hello, {{ name }}!"
}
```
{% endraw %}

{% raw %}
```html
<p>{{ 'greeting' | translate(page.lang, { name: 'Alice' }) }}</p>
```
{% endraw %}

This renders as: `Hello, Alice!`

### Pluralisation

For strings that change based on a count, use the `count` object with `one` and `other` keys in your translation file. The filter uses the `Intl.PluralRules` API to select the correct form based on the language's pluralization rules.

{% raw %}
```json
{
    "readingTime": {
        "underMinute": "Less than a minute to read",
        "count": {
            "one": "{{ minutes }} minute to read",
            "other": "{{ minutes }} minutes to read"
        }
    }
}
```
{% endraw %}

The filter automatically detects the count from the data object — either from an explicit `count` property or the first numeric value found. It then selects the appropriate plural form and performs variable substitution.

{% raw %}
```html
<p>{{ 'readingTime.count' | translate(page.lang, { minutes: readingTime, count: readingTime }) }}</p>
```
{% endraw %}

With `readingTime` set to `1`, this renders as: `1 minute to read`. With a value of `5`, it renders as: `5 minutes to read`.

The plural form selection follows the rules of the active language. While English only has `one` and `other`, languages like Russian or Arabic have additional plural forms that the filter handles automatically.

## Naming conventions

Translation keys are scoped by template or include. A common convention is to prefix keys with the template or section they belong to, using dot notation for sub-groups. For example:

- `header.skipLink` — header include
- `footer.copyright` — footer include
- `post.readingTime` — post layout

This keeps translations organized and makes it easy to find where a string is used. The key does not need to match the template filename exactly — it should describe the purpose of the string instead.

Next up, [manage your content](/documentation/content/).
