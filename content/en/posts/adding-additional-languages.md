---
title: Adding additional languages
date: 2025-09-02
draft: true
---

1. Copy an existing folder of a fully translated language(preferably non-English for easier identification of the text that needs translation).
2. Translate all .md files for posts, pages, etc.
3. Translate JavaScript files you might have among them.
4. Change language codes to your language, esp. Rename the `<lang>.json` (e.g. `sv.json`) to the code of your language. The same for inside the file.
5. Translate the template files (.njk). (also below `/content`)
6. Translate the files under `_data` and make sure they are consistent with rest of your configuration (esp. look for slugs, urls, etc.)
7. Make sure that all files are available in all languages.
