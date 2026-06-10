import path from 'path';
import slugify from '@sindresorhus/slugify';
import { chromium } from 'playwright';

const args = process.argv;
const outputDir = args[2];
const frontmatter = args[4] && typeof args[4] === 'string' ? JSON.parse(args[4]) : null;

if (!outputDir) { 
    console.log('Error: missing output directory argument');
    process.exit(1);
}

try {
    await fetch('http://localhost:8080', { signal: AbortSignal.timeout(3000) });
} catch {
    console.log('Dev server not running at localhost:8080.');
    process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage();

const slug = slugify(frontmatter.title, { decamelize: false });
const outputPath = `${outputDir}/content/assets/img/og/opengraph-${slug}.png`;

try {
    await page.setViewportSize({ width: 1200, height: 630 });
    const fmEncoded = encodeURIComponent(JSON.stringify(frontmatter));
    const url = `http://localhost:8080/opengraph-preview.html?fm=${fmEncoded}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.screenshot({ path: outputPath, type: 'png' });
    console.log(JSON.stringify({ frontmatter: { thumbnail: `/assets/img/og/opengraph-${slug}.png` } }));
} catch (e) {
    console.log(e?.message || e);
} finally {
    await browser.close();
}
