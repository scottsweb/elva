export default function filterPrivateTags(tags) {
    return (tags || []).filter(tag => !tag.startsWith('_'));
}