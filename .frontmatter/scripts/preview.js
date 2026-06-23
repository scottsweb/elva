import { ContentScript } from "@frontmatter/extensibility";
import { execSync } from "child_process";
import { readFileSync } from "fs";
import { dirname, join, basename } from "path";

const { workspacePath, filePath, frontMatter } = ContentScript.getArguments();

async function run() {
    try {
        const types = JSON.parse(
            readFileSync(join(workspacePath, "content/_data/types.json"), "utf-8")
        );
        const locales = JSON.parse(
            readFileSync(join(workspacePath, "content/_data/locales.json"), "utf-8")
        );

        const fileDir = dirname(filePath);
        const fileName = basename(filePath);
        const fileSlug = fileName.replace(/\.[^.]+$/, "");

        const pathParts = fileDir.split("/");

        let collectionName = null;
        let collectionIndex = -1;
        for (const key of Object.keys(types)) {
            const index = pathParts.indexOf(key);
            if (index !== -1) {
                collectionName = key;
                collectionIndex = index;
                break;
            }
        }

        if (!collectionName) {
            ContentScript.done("Could not determine collection type for preview.");
            return;
        }

        const localeIndex = collectionIndex - 1;
        const locale = localeIndex >= 0 ? pathParts[localeIndex] : "en";

        const defaultLocale = Object.keys(locales).find((key) => locales[key].default);
        const isDefaultLocale = locale === defaultLocale;

        const seoSlug = frontMatter?.seo?.slug;
        const slug = seoSlug !== undefined && seoSlug !== null ? seoSlug : fileSlug;

        const config = types[collectionName];
        const hasCollectionSlug = config?.locales && Object.keys(config.locales).length > 0 || config?.prefix;

        let permalink;
        const host = "http://localhost:8080";
        const prefix = isDefaultLocale ? "" : `/${locale}`;

        if (hasCollectionSlug) {
            const collectionSlug = config?.locales?.[locale] || config?.prefix || collectionName;
            permalink = `${prefix}/${collectionSlug}/${slug}/`.replace(/\/{2,}/g, "");
        } else {
            permalink = `${prefix}/${slug}/`.replace(/\/{2,}/g, "");
        }

        const url = `${host}${permalink}`;

        try {
            await fetch(host, { signal: AbortSignal.timeout(3000) });
        } catch {
            ContentScript.done("Dev server not running at localhost:8080. Start it with `npm run dev` first.");
            return;
        }

        const platform = process.platform;
        if (platform === "darwin") {
            execSync(`open "${url}"`);
        } else if (platform === "linux") {
            execSync(`xdg-open "${url}"`);
        } else if (platform === "win32") {
            execSync(`start "" "${url}"`, { shell: "cmd" });
        }

        ContentScript.done(`${permalink}`);
    } catch (error) {
        ContentScript.done(`Error opening preview: ${error.message}`);
    }
}

run();