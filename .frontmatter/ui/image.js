import { registerCardImage, enableDevelopmentMode } from "https://cdn.jsdelivr.net/npm/@frontmatter/extensibility/+esm";
enableDevelopmentMode();

/**
 * @param {string} filePath - The path of the file
 * @param {object} data - The metadata of the file
 * @returns {string} - The HTML to be rendered in the card footer
 */
registerCardImage(async (filePath, metadata) => {
    const image = metadata.fmPreviewImage ? metadata.fmPreviewImage : '/path/to/fallback.jpg';
    return `<img src="${image}" alt="${metadata.title}" style="object-fit: cover;" class="h-36" />`;
});