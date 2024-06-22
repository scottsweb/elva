// return a random item from a collection, excluding the current page
// {% set collection = collections.posts | random(page) %}
export default function(collections, avoid) {
    let selected = collections[Math.floor(Math.random() * collections.length)];
    while (selected.url === avoid.url) {
        selected = collections[Math.floor(Math.random() * collections.length)];
    }
    return [selected];
};
