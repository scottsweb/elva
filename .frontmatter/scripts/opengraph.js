import { ContentScript } from "@frontmatter/extensibility";
import slugify from '@sindresorhus/slugify';
import { chromium } from 'playwright';
import { join } from 'path';

const { workspacePath, filePath, frontMatter } = ContentScript.getArguments();

async function run() {
    try {
        await fetch('http://localhost:8080', { signal: AbortSignal.timeout(3000) });
    } catch {
        ContentScript.done("Dev server not running at localhost:8080. Start it with `npm run dev` first.");
        return;
    }

    let browser;
    try {
        browser = await chromium.launch();
    } catch {
        ContentScript.done("Playwright browsers not installed. Run `npx playwright install` first.");
        return;
    }

    const page = await browser.newPage();

    const slug = slugify(frontMatter?.title || 'thumbnail', { decamelize: false });
    const outputDir = join(workspacePath, "content/assets/img/og");
    const outputPath = join(outputDir, `opengraph-${slug}.png`);

    try {
        await page.setViewportSize({ width: 1200, height: 630 });
        const fmEncoded = encodeURIComponent(JSON.stringify(frontMatter || {}));
        const url = `http://localhost:8080/opengraph-preview.html?fm=${fmEncoded}`;
        await page.goto(url, { waitUntil: 'networkidle' });
        await page.screenshot({ path: outputPath, type: 'png' });
        
        const thumbnailPath = `/assets/img/og/opengraph-${slug}.png`;
        ContentScript.updateFrontMatter({ thumbnail: thumbnailPath });
    } catch (e) {
        ContentScript.done(`Error generating image: ${e?.message || e}`);
    } finally {
        await browser.close();
    }
}

run();