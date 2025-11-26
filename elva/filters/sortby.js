// sort collection by an arbitrary key
// {% set collection = collections._posts | sortBy('title', false, false) %}
export default function(collections, key, reversed = false, forceLowerCase = false) {
    return collections.sort((a, b) => {
        let x = key ? a.data[key] : a;
        let y = key ? b.data[key] : b;

        if (forceLowerCase) {
            x = x.toLowerCase();
            y = y.toLowerCase();
        }

        if (x < y) {
            return reversed ? 1 : -1;
        }
        if (x > y) {
            return reversed ? -1 : 1;
        }
        return 0;
    });
};
