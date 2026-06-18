import { registerCardImage, enableDevelopmentMode } from "@frontmatter/extensibility";
//enableDevelopmentMode();

/**
 * @param {string} filePath - The path of the file
 * @param {object} data - The metadata of the file
 * @returns {string} - The HTML to be rendered in the card footer
 */
registerCardImage(async (filePath, metadata) => {
    const image = metadata.fmPreviewImage ? metadata.fmPreviewImage : `${metadata.fmWebviewUrl.replace('.frontmatter', '')}/content/assets/img/og/opengraph-default.png`;
    return `<img src="${image}" alt="${metadata.title.thumbnailDescription || metadata.title }" style="object-fit: cover;" class="h-36 w-full" />`;
});