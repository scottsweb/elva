import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
import slugify from '@sindresorhus/slugify';
import nunjucks from '@11ty/nunjucks';
import { chromium } from 'playwright';

const args = process.argv;
const outputDir = args[2];

if (!outputDir) { 
    console.log('Error: missing output directory argument');
    process.exit(1);
}

// grab bundled css and inline fonts as base64 so headless Chromium can render them
const css = fs.readFileSync(path.join(outputDir, 'dist/assets/css/opengraph.css'), 'utf8').replace(
  /url\(\s*['"]?(\/assets\/fonts\/[^)'"]+)['"]?\s*\)/g,
  (_, url) => {
    try {
      const font = fs.readFileSync(path.join(outputDir, 'dist', url));
      const type = mime.lookup(path.extname(url).slice(1)) || 'application/octet-stream';
      return `url("data:${type};base64,${font.toString('base64')}")`;
    } catch {
      return `url('${url}')`;
    }
  }
);

const frontmatter = args[4] && typeof args[4] === 'string' ? JSON.parse(args[4]) : null;
const template = fs.readFileSync(new URL('opengraph-template.html', import.meta.url), 'utf8');

let data = { ...frontmatter };
// fix some potential encoding issues
data.title && (data.title = decodeURIComponent(data.title));
data.seo?.title && (data.seo.title = decodeURIComponent(data.seo.title));
data.seo?.description && (data.seo.description = decodeURIComponent(data.seo.description));

const browser = await chromium.launch();
const page = await browser.newPage();

const slug = slugify(data.title, { decamelize: false });
const outputPath = `${outputDir}/content/assets/img/opengraph-${slug}.png`;

try {
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(
    (await nunjucks.renderString(template, data)).replace(
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
