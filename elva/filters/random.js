// random items from a collection limited to a number
// {% set collection = collections._posts | random(page, 3) %}
export default function random(collections, exclude, limit = 1) { 
    const filtered = collections.filter((page) => page.url !== exclude.url);

    // randomizes remaining items
    filtered.sort(() => {
        return 0.5 - Math.random();
    });

    // returns array items up to limit
    return filtered.slice(0, limit);
};
  