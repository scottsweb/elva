import markdownIt from 'markdown-it';

// returns seo.description from frontmatter if set, otherwise generates one from page content
export function seodescription(description) {
	if (description) return description;

	const md = markdownIt({
		html: true,
		linkify: true,
		typographer: true
	});

	let content = this.page?.rawInput || '';

	if (this.page?.templateSyntax?.includes('md')) {
		content = md.render(content);
	}

	const matches = content.match(/<p>(.+[\.\?\!])<\/p>/);
	return matches ? matches[1] : null;
}
