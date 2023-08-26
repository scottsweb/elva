---
title: Markdown testa
seo:
  slug: markdown-testa
date: 2023-08-02
---

Lorem ipsum dolor **sit amet**, consectetur adipiscing elit (C). Sed nec __risus elementum__, tempor tortor non, bibendum libero. Suspendisse potenti. Vivamus dapibus *tortor neque*, sed aliquet lacus _elementum nec_. Morbi vel ligula vitae leo placerat sollicitudin quis at eros. Pellentesque tristique mi a tortor auctor, sit amet elementum augue pulvinar. Donec non orci in ~~ipsum mollis~~ tempor. Integer libero est, H~2~O pharetra ++vitae++ facilisis quis 🇸🇪.

## Citat, kod och typografi

> Maecenas vel quam id eros tristique sollicitudin. Nunc tincidunt orci malesuada, vehicula mauris ut, sollicitudin lacus. Quisque eget vestibulum quam. 

Aenean ac tincidunt felis (r). Fusce eu ==arcu blandit==, consectetur odio ullamcorper, maximus erat (R). Fusce aliquam sapien a commodo aliquet. Phasellus placerat sagittis euismod. Curabitur vitae est id nunc ornare --- scelerisque in vitae nisl. In non mi leo...

<!-- FM:Snippet:Start data:{"id":"Quote","fields":[{"name":"quote","value":"Maecenas vel quam id eros tristique sollicitudin. Nunc tincidunt orci malesuada, vehicula mauris ut, sollicitudin lacus. Quisque eget vestibulum quam."},{"name":"author","value":"Scott Evans"},{"name":"cite","value":"Hemsida"},{"name":"url","value":"https://scott.ee"}]} -->
<blockquote>
  <p>Proin sit amet neque vitae leo posuere pellentesque vel non augue. Sed efficitur ipsum neque, non gravida ipsum vestibulum eget.</p>
  <figcaption>— Scott Evans, <cite><a href="https://scott.ee">Hemsida</a></cite></figcaption>
</blockquote>
<!-- FM:Snippet:End -->

Cras quis sollicitudin eros (c). Fusce eget velit `quis nulla pharetra eleifend id vitae nisl`. Aenean vehicula sem vitae nunc semper porta. Donec porta leo vitae massa accumsan consequat. Praesent quis sodales orci, ut elementum quam. Phasellus ultrices lectus in tempus varius+-. Duis est nulla -- imperdiet dapibus ultricies non 19^th^, hendrerit non mauris(tm).

``` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

Donec tincidunt mauris id metus iaculis tempor. Proin sit amet neque vitae leo posuere pellentesque vel non augue. Sed efficitur ipsum neque, non gravida ipsum vestibulum eget. Fusce augue lacus, vestibulum efficitur tincidunt et, posuere sed sem. Etiam tortor lorem, vestibulum ac lectus vitae, feugiat egestas augue. Proin id suscipit mi.

---

## Listor

### Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`

Starta numrering med offset:

57. foo
1. bar

### Unordered

+ Skapa en lista genom att börja en rad med `+`, `-`, eller `*`
+ Underlistor skapas genom att dra in 2 mellanslag:
  - Byte av markörtecken tvingar ny liststart:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Superlätt!

---

### Meddelanden och länkar

<div class="notice notice-notice">Allmänt meddelande</div>

<div class="notice notice-warning">Varnings meddelande</div>

<div class="notice notice-error">Fel meddelande</div>

### Rubrik nivå 3

Cras quis sollicitudin eros [link with title](https://scott.ee "title text!"). Fusce eget velit quis nulla pharetra eleifend id vitae nisl. Aenean [normal link](https://scott.ee) vitae nunc semper porta. Donec porta leo vitae massa accumsan consequat. Praesent quis sodales orci, ut elementum quam. Phasellus ultrices lectus in tempus varius. Duis est nulla, imperdiet dapibus ultricies non, hendrerit non mauris.

#### Rubrik nivå 4

Aenean ac tincidunt felis. Fusce eu arcu blandit, consectetur odio ullamcorper, maximus erat. Fusce aliquam sapien a commodo aliquet. Phasellus placerat sagittis euismod. Curabitur vitae est id nunc ornare scelerisque in vitae nisl. In non mi leo.

https://github.com/scottsweb/elva

### Tabeller

| Titel  | Beskrivning |
| ------ | ----------- |
| Fuseu  | Aenean ac tincidunt felis. Fusce eu arcu blandit, consectetur odio ullamcorper. |
| Maxim  | Fusce eu arcu blandit, consectetur odio ullamcorper, maximus erat. |
| Odio   | Praesent quis sodales orci. |

Högerjusterade kolumner

| Titel  | Beskrivning |
| -------| -----------:|
| Fuseu  | Aenean ac tincidunt felis. Fusce eu arcu blandit, consectetur odio ullamcorper. |
| Maxim  | Fusce eu arcu blandit, consectetur odio ullamcorper, maximus erat. |
| Odio   | Praesent quis sodales orci. |