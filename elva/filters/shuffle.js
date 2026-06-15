// shuffle items from a collection and return a limited number
// {% set collection = collections._posts | shuffle(page, 3) %}
// deterministic: same fileSlug produces same random selection across locales
export default function shuffle(collections, exclude, limit = 1) {
    const filtered = collections.filter((page) => page.url !== exclude.url);

    // deterministic seed from fileSlug + date (same across locales, changes daily)
    const today = new Date().toISOString().slice(0, 10);
    const seedStr = `${exclude.fileSlug || exclude.url}-${today}`;
    let seed = 0;
    for (let i = 0; i < seedStr.length; i++) {
        seed = ((seed << 5) - seed) + seedStr.charCodeAt(i);
        seed |= 0;
    }

    // mulberry32 seeded PRNG
    function mulberry32(a) {
        return function() {
            a |= 0; a = a + 0x6D2B79F5 | 0;
            var t = Math.imul(a ^ a >>> 15, 1 | a);
            t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
        }
    }

    const rng = mulberry32(seed);
    filtered.sort(() => 0.5 - rng());

    return filtered.slice(0, limit);
}
