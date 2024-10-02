// filter collection by a key
// {% set collection = collections.posts | where('title', 'value') %}
export default function(collections, key, value) { 
    return collections.filter((item) => {
        const data = item && item.data ? item.data : item;
        return typeof value === 'undefined' ? key in data : data[key] === value;
    })
};
  