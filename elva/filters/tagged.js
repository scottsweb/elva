// filter collection by a tag or number of tags
// {% set collection = collections._posts | tagged(['tag1', 'tag2']) %}
export function tagged(collections, tags = []) { 
    return collections.filter((item) => {
        const data = item && item.data ? item.data : item;
        return data['tags'].filter(el => tags.includes(el)).length === tags.length;
    })
};
