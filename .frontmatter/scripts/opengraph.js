import fs from 'fs';
import slugify from '@sindresorhus/slugify';
import nodeHtmlToImage from 'node-html-to-image';

const args = process.argv;
const template = fs.readFileSync(args[1].replace('opengraph.js', 'opengraph-template.html'), 'utf8');
const frontmatter = args[4] && typeof args[4] === "string" ? JSON.parse(args[4]) : null;
let data = {...frontmatter, ...{ 'url': 'http://localhost:8080' }};

// fix some potential encoding issues
data.title && (data.title = decodeURIComponent(data.title));
data.seo.title && (data.seo.title = decodeURIComponent(data.seo.title));
data.seo.description && (data.seo.description = decodeURIComponent(data.seo.description));

nodeHtmlToImage({
    output: args[2] + '/content/assets/img/opengraph-' + slugify(data.title, {decamelize: false}) + '.png',
    html: template,
    content: data
}).then(() => {
    const output = JSON.stringify({
        'frontmatter': {
            'thumbnail': '/assets/img/opengraph-' + slugify(data.title, {decamelize: false}) + '.png'
        }
    });
    console.log(output);
}).catch(e => console.log(e?.message || e));