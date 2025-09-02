---
title: Lägger till ytterligare språk
date: 2025-09-02
draft: true
---

1. Kopiera en befintlig mapp från ett språk som redan är helt översatt (helst inte engelska, så att du lättare ser vad som behöver översättas).
2. Översätt alla .md-filer för inlägg, sidor osv.
3. Översätt eventuella JavaScript-filer.
4. Ändra språkkoderna till ditt språk, särskilt: Byt namn på `<lang>.json` (t.ex. `sv.json`) till din språkkod. Gör samma sak med innehållet i filen.
5. Översätt mallfilerna (.njk) (även under `/content`).
6. Översätt filerna under `_data` och se till att de stämmer överens med resten av din konfiguration (var särskilt uppmärksam på slugs, URL:er osv.).
7. Se till att alla filer finns tillgängliga på alla språk.