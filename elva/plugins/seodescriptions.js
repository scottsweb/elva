import markdownIt from 'markdown-it';

export default function (eleventyConfig) {

    eleventyConfig.addGlobalData("eleventyComputed.seo.description", () => (data) => {
        const md = markdownIt({
            html: true,
            linkify: true,
            typographer: true
        });

        // if seo description frontmatter is explicitly set, use that
        if (data.seo.description) {
            return data.seo.description;
        }
    
        // grab page content
        let content = data.page.rawInput;
    
        // if template uses Markdown, render it
        if (data.page.templateSyntax.includes('md')) {
            content = md.render(content);
        }
    
        // look for paragraphs ending in period, question or exclamation
        const matches = content.match(/<p>(.+[\.\?\!])<\/p>/);
    
        // if found, return content
        if (matches) {
            return matches[1];
        }
    
        return null;
    });
}