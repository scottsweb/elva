import fs from 'fs';
import path from 'path';
import slugify from '@sindresorhus/slugify';
import nunjucks from '@11ty/nunjucks';
import { chromium } from 'playwright';

const { renderString } = nunjucks;
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const args = process.argv;
const cssPath = path.join(args[2], 'dist/assets/css/opengraph.css');
const css = fs.readFileSync(cssPath, 'utf8');
const outputDir = args[2];
const frontmatter = args[4] && typeof args[4] === 'string' ? JSON.parse(args[4]) : null;
const template = fs.readFileSync(path.join(__dirname, 'opengraph-template.html'), 'utf8');

let data = { ...frontmatter };

// fix some potential encoding issues
data.title && (data.title = decodeURIComponent(data.title));
data.seo?.title && (data.seo.title = decodeURIComponent(data.seo.title));
data.seo?.description && (data.seo.description = decodeURIComponent(data.seo.description));

const slug = slugify(data.title, { decamelize: false });
const outputPath = `${outputDir}/content/assets/img/opengraph-${slug}.png`;

const browser = await chromium.launch();
const page = await browser.newPage();

try {
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(
    (await renderString(template, data)).replace(
      '<link href="/assets/css/opengraph.css" rel="stylesheet">',
      `<style>${css}</style>`
    ),
    { waitUntil: 'networkidle' }
  );
  await page.screenshot({ path: outputPath, type: 'png' });
  console.log(JSON.stringify({ frontmatter: { thumbnail: `/assets/img/opengraph-${slug}.png` } }));
} catch (e) {
  console.log(e?.message || e);
} finally {
  await browser.close();
}
