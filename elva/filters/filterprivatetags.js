export function filterprivatetags(tags) {
    return (tags || []).filter(tag => !tag.startsWith('_'));
}

// backward compatibility alias
export const filterPrivateTags = filterprivatetags;
