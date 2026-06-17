---
title: Hantera översättningar
date: 2026-06-08
tags:
  - tag1
  - tag2
seo:
  slug: oversattningar
---

Översättningar i elva lagras som JSON-filer under `content/_data/translations/`, med en fil per språk (t.ex. `en.json`, `sv.json`). Översättningsfilen för standardspråket fungerar som den giltiga källan. När du lägger till ett nytt språk skapas en kopia av standardöversättningsfilen för den språkversionen, som du sedan kan anpassa.

Översättningssträngar refereras till i dina temamallar med hjälp av `translate`-filtret. Detta gör att du kan flytta ut all text som visas för användaren från dina mallar, vilket gör det enkelt att uppdatera formuleringar eller lägga till nya språk utan att behöva ändra mallkoden.

<div class="notice notice-notice">Om du bara behöver en webbplats på ett enda språk går det alldeles utmärkt. Du kan fortfarande använda `translate`-filtret för alla dina strängar, eller utelämna det helt om du föredrar att inte använda översättningar alls.</div>

## Lägg till en översättning

Kommandot `add` guidar dig genom skapandet av en ny översättningspost. Du ombeds att välja den mall eller det inkluderingsställe där översättningen ska användas, ange en unik nyckel (t.ex. `primaryButton`) och specificera om det är en översättning i plural.

För varje konfigurerat språk ombeds du att ange översättningsvärdet. I andra språkinställningar än standardinställningen fylls fältet automatiskt i med värdet för standardspråket som utgångspunkt. För pluralöversättningar anger du singularformen (en) och pluralformen (andra) för varje språk.

CLI:n kontrollerar om det finns konflikter innan tillägget görs. Du kan inte skapa en nästlad nyckel som står i konflikt med en befintlig enkel sträng, eller tvärtom.

``` bash
npm run cli translation add
```

## Ta bort en översättning

Kommandot för borttagning söker efter översättningar utifrån deras visade värde i standardlokalen. Du anger en söksträng, väljer den översättning som ska tas bort bland de matchande resultaten och bekräftar borttagningen. Översättningen tas bort från alla lokalfiler på en gång.

``` bash
npm run cli translation remove
```

## Synkronisera översättningar

När du lägger till nya översättningsnycklar i din standardlokalfil kan det hända att dessa poster saknas i andra lokalfiler. Synkroniseringskommandot kopierar eventuella saknade nycklar från standardlokalen till alla andra lokalfiler och fyller i dem i förväg med värdet från standardspråket. Detta säkerställer att alla språkversioner förblir synkroniserade med din huvudkälla.

``` bash
npm run cli translation sync
```

## Redigera översättningsfiler

Alla översättningar lagras som JSON-filer i `content/_data/translations/`. Du kan redigera dessa filer direkt om du föredrar det. Varje fil har en hierarkisk struktur med nycklar i punktnotation som motsvarar var översättningen används i dina mallar.

Så här ser en översättningsfil ut:

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

Strukturen är tillräckligt platt för att vara lätt att redigera, men tillräckligt hierarkisk för att hålla relaterade strängar organiserade.

Du kan lägga till, redigera eller ta bort poster direkt i dessa filer. Efter redigering måste du bygga om webbplatsen för att ändringarna ska träda i kraft. För översättningar i plural använder du `count`-objektet med nycklarna `one` och `other`, som visas i exemplet med `readingTime` ovan.

## Använda översättningar i mallar

Filtret `translate` finns tillgängligt i alla mallfiler. Det hämtar översättningsnyckeln från det aktiva språkets översättningsfil och returnerar motsvarande sträng.

{% raw %}
```html
<h1>{{ 'header.home' | translate(page.lang) }}</h1>
<p>{{ 'footer' | translate(page.lang) }}</p>
```
{% endraw %}

Filtret tar nyckeln i punktnotation som sitt första argument och språkkoden som sitt andra. Om inget språk anges används det aktuella sidans språk som standard. När en nyckel inte hittas returnerar filtret själva nyckeln, vilket är användbart för att identifiera saknade översättningar under utvecklingen.

### Variabelersättning

Översättningar kan innehålla platshållare som ersätts med värden som skickas som det tredje argumentet. Detta görs med hjälp av nunjucks-mallsyntax inuti översättningssträngen.

{% raw %}
```json
{
    "greeting": "Hej, {{ name }}!"
}
```
{% endraw %}

{% raw %}
```html
<p>{{ 'greeting' | translate(page.lang, { name: 'Alice' }) }}</p>
```
{% endraw %}

Detta renderas som: `Hej, Alice!`

### Pluralisering

För strängar som ändras beroende på antal använder du `count`-objektet med nycklarna `one` och `other` i din översättningsfil. Filtret använder ICU:s `Intl.PluralRules`-API för att välja rätt form utifrån språkets pluraliseringsregler.

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

Filtret identifierar automatiskt antalet från dataobjektet — antingen från en explicit `count`-egenskap eller det första numeriska värdet som hittas. Därefter väljer det lämplig pluralform och utför variabelersättning.

{% raw %}
```html
<p>{{ 'readingTime.count' | translate(page.lang, { minutes: readingTime, count: readingTime }) }}</p>
```
{% endraw %}

När `readingTime` är inställt på `1` renderas detta som: `1 minute to read`. Med värdet `5` renderas det som: `5 minutes to read`.

Valet av pluralform följer reglerna för det aktiva språket. Medan engelskan endast har `one` och `other`, har språk som ryska eller arabiska ytterligare pluralformer som filtret hanterar automatiskt.

## Namnkonventioner

Översättningsnycklarna är begränsade till en mall eller ett inkluderat dokument. En vanlig konvention är att lägga till prefixet för den mall eller det avsnitt som nyckeln tillhör, med punktnotation för undergrupper. Till exempel:

- `header.skipLink` — rubrikavsnitt
- `footer.copyright` — sidfotsavsnitt
- `post.readingTime` — inläggslayout

Detta håller översättningarna organiserade och gör det enkelt att hitta var en sträng används. Nyckeln behöver inte stämma exakt överens med mallens filnamn — den ska istället beskriva strängens syfte.

Nästa steg: [hantera ditt innehåll](/sv/dokumentation/innehall/).
