// filter collection by a tag or number of tags
// {% set collection = collections._posts | tagged(['tag1', 'tag2']) %}
export default function tagged(collections, tagged = []) { 
    return collections.filter((item) => {
        const data = item && item.data ? item.data : item;
        return data['tags'].filter(el => tagged.includes(el)).length === tagged.length;
    })
};
  