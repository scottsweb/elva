import { input, rawlist, checkbox, confirm, select } from '@inquirer/prompts';
import { success, error, warning, info, getLocaleData, LOCALES_PATH, COLLECTIONS_PATH } from './utils.js';
import { Importer } from '@11ty/import';
import * as entities from 'entities';
import * as path from 'path';
import { readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync, globSync, renameSync, rmSync, readdirSync } from 'fs';
import { readdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import matter from '@11ty/gray-matter';
import yaml from 'js-yaml';

const yamlEngine = {
  parse: (str, options) => yaml.load(str, { schema: yaml.JSON_SCHEMA }),
  stringify: (obj) => yaml.dump(obj, { schema: yaml.JSON_SCHEMA })
};

const addContent = async () => {
    const content = {};
    const localesData = getLocaleData();
    
    // get available content types from content-types.json
   const collections = JSON.parse(readFileSync(COLLECTIONS_PATH, 'utf-8'));
    const contentTypeList = Object.entries(collections)
        .map(([name, config]) => ({ name: `${config.label} (${name})`, value: name }))
        .sort((a, b) => a.name.localeCompare(b.name));
    
    content.contentType = await rawlist({
        message: 'Select content type:',
        choices: contentTypeList
    });
    
    const choices = localesData.locales.map((locale) => {
        const checked = localesData.defaultLocale === locale.value ? true : false;
        return {
            name: locale.name,
            value: locale.value,
            checked: checked
        };
    });
    
    // select one or more languages
    content.locales = await checkbox({
        message: 'Select language(s):',
        choices: choices
    });
    
    // ask for a title
    content.title = await input({
        message: 'Enter title:',
        required: true
    });
    
    // auto-generate slug from title
    const slug = content.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/[-\s]+/g, '-')
        .trim();
    
    content.slug = await input({
        message: `Enter slug (or press Enter to use default '${slug}'):`,
        default: slug,
        required: true
    });
    
    // create files for each selected locale
    for (const localeKey of content.locales) {
        
        // construct file path based on content type and locale
        const filePath = `content/${localeKey}/${content.contentType}/${content.slug}.md`;
        
        // check for content-type-specific template existence
        let templateContent = '';
        const templatePath = `.frontmatter/templates/${content.contentType}.md`;
        if (existsSync(templatePath)) {
            templateContent = readFileSync(templatePath, 'utf-8');
        } else {
            templateContent = readFileSync('.frontmatter/templates/default.md', 'utf-8');
        }
        
        // replace title in template
        let editedContent = templateContent.replace(/\"{{title}}\"/g, content.title);
        
        // replace date in template to today's date
        const today = new Date().toISOString().split('T')[0];
        editedContent = editedContent.replace(/\"{{now}}\"/g, today);
        
        // create directory if it doesn't exist
        const dirPath = path.dirname(filePath);
        if (!existsSync(dirPath)) {
            mkdirSync(dirPath, { recursive: true });
        }
        
        // check for existing content before overwriting
        if (existsSync(filePath)) {
            error(`File already exists: '${filePath}'. Delete it first or use a different slug.`);
            return;
        }

        // write the markdown file
        writeFileSync(filePath, editedContent);
    }
    
    success(`Created content: '${content.title}'.`);
};

const removeContent = async () => {
    // ask for a page slug
    let slug = await input({
        message: 'Enter content slug (e.g example or example.md):',
        required: true
    });

   // glob through all markdown files in the content folder looking for a match
    slug = path.parse(slug).name;
    const pattern = `content/**/${slug}.md`;
    const files = globSync(pattern, { cwd: process.cwd() });

    if (files.length === 0) {
        error(`No files found matching slug '${slug}'`);
        return;
    }

    // list the files found
    info(`Found ${files.length} file(s):`);
    files.forEach(file => warning(`  ${file}`));
    
    // ask to confirm if pages should be deleted
    if (!await confirm({ message: `Are you sure you want to remove these files?` })) {
        return;
    }
    
    // delete the files
    for (const file of files) {
        try {
            await unlinkSync(file);
        } catch (error) {
            error(`Failed to delete ${file}: ${error.message}`);
        }
    }
    
    success(`Deleted ${files.length} file(s) with slug '${slug}'.`);
};

const regenerateOpengraph = async () => {
    try {
        await fetch('http://localhost:8080', { signal: AbortSignal.timeout(3000) });
    } catch {
        error('Dev server not running at localhost:8080. Please start it with npm run dev before running this tool.');
        return;
    }

    if (!await confirm({ message: 'This will regenerate all open graph images. Continue?' })) {
        return;
    }

    const localesData = getLocaleData();

    let totalGenerated = 0;
    let totalFailed = 0;

    for (const locale of localesData.locales) {
        const pattern = `content/${locale.value}/**/*.md`;
        const files = globSync(pattern, { cwd: process.cwd(), ignore: ['content/**/_*/**/*'] });

        if (files.length === 0) {
            info(`No markdown files found in content/${locale.value}/`);
            continue;
        }

        info(`Processing ${files.length} markdown file(s) in ${locale.value}...`);

        for (const file of files) {
            try {
                const fileContent = readFileSync(file, 'utf-8');
                const { data: fm, content } = matter(fileContent, { engines: { yaml: yamlEngine } });

                const fmJson = JSON.stringify(fm);
                const result = spawnSync('node', ['.frontmatter/scripts/opengraph.js', process.cwd(), file, fmJson], {
                    encoding: 'utf-8'
                }).stdout?.trim();

                if (result) {
                    try {
                        const output = JSON.parse(result);
                         if (output.frontmatter?.thumbnail) {
                            // update thumbnail
                            fm.thumbnail = output.frontmatter.thumbnail;
                            
                            // stringify with gray-matter (dates preserved as-is with JSON_SCHEMA)
                            let newContent = matter.stringify(content, fm, { engines: { yaml: yamlEngine } });
                            
                            writeFileSync(file, newContent);
                            totalGenerated++;
                        }
                    } catch {
                        totalFailed++;
                    }
                }
            } catch (e) {
                totalFailed++;
            }
        }
    }

    let message = `Regenerated ${totalGenerated} open graph image(s).`;
    if (totalFailed > 0) {
        message += ` ${totalFailed} failed.`;
    }
    success(message);
};

const importContent = async () => {
    const localesData = getLocaleData();
    const collections = JSON.parse(readFileSync(COLLECTIONS_PATH, 'utf-8'));

    // select source
    const sourceType = await rawlist({
        message: 'Select import source:',
        default: 'wordpress',
        choices: [
            { name: 'WordPress', value: 'wordpress' },
            { name: 'Atom', value: 'atom' },
            { name: 'RSS', value: 'rss' },
            { name: 'Fediverse', value: 'fediverse' },
            { name: 'Bluesky', value: 'bluesky' }
        ]
    });

    // get additional info for source
    let sourceValue;
    if (['wordpress', 'atom', 'rss'].includes(sourceType)) {
        sourceValue = await input({
            message: 'Enter feed or website URL:',
            required: true
        });
    } else {
        const example = sourceType === 'bluesky' ? '@handle.bsky.social' : '@user@mastodon.social';
        sourceValue = await input({
            message: `Enter username (e.g. ${example}):`,
            required: true
        });
    }

    // select target locale
    const localeChoices = localesData.locales.map((locale) => ({
        name: locale.name,
        value: locale.value
    }));
    const targetLocale = await rawlist({
        message: 'Select target locale:',
        choices: localeChoices,
        default: localesData.defaultLocale
    });

    // select target collection
    const collectionChoices = Object.entries(collections)
        .map(([name, config]) => ({ name: `${config.label} (${name})`, value: name }))
        .sort((a, b) => a.name.localeCompare(b.name));
    const targetCollection = await rawlist({
        message: 'Select target collection:',
        choices: collectionChoices
    });

    // select timeframe
    const within = await rawlist({
        message: 'Select timeframe:',
        default: '*',
        choices: [
            { name: 'Last 7 days', value: '7d' },
            { name: 'Last 30 days', value: '30d' },
            { name: 'Last 90 days', value: '90d' },
            { name: 'Last 1 year', value: '1y' },
            { name: 'All time', value: '*' }
        ]
    });

    // dry run or real import?
    const isDryRun = await confirm({
        message: 'Run as dry run? (no files will be written)',
        default: true
    });

    let limit = 0;
    if (isDryRun) {
        const limitInput = await input({
            message: 'Limit number of entries to import (0 = no limit):',
            default: '0',
            validate: (value) => !isNaN(Number(value)) || 'Please enter a number'
        });
        limit = parseInt(limitInput, 10);
    }

    // summary
    info('Import configuration:');
    console.log(`  Source: ${sourceType} - ${sourceValue}`);
    console.log(`  Target: content/${targetLocale}/${targetCollection}/`);
    console.log(`  Assets folder: content/assets/img/`);
    console.log(`  Timeframe: ${within}`);
    console.log(`  Mode: ${isDryRun ? 'Dry run' : 'Live'}`);
    if (isDryRun) {
        console.log(`  Limit: ${limit === 0 ? 'No limit' : limit}`);
    }
    console.log(`  Cache: 48h`);
    console.log();

    if (!isDryRun) {
        if (!await confirm({ message: 'This will import your content. Continue?' })) {
            return;
        }
    }

    // configure and run importer
    const importer = new Importer();
    importer.setOutputFolder(`content/${targetLocale}/${targetCollection}/`);
    importer.setCacheDuration('48h');
    importer.setAssetReferenceType('colocate');
    importer.setAssetsFolder('/assets/img');
    importer.setDryRun(isDryRun);
    importer.setVerbose(false);

    importer.addSource(sourceType, {
        url: sourceValue,
        filepathFormat: (url, fallbackPath) => {
            // strip leading/trailing slashes, get last segment, add .md extension
            const segments = fallbackPath.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
            return segments.pop() + '.md';
        }
    });

    // hack: RSS based imports are lumpy, this attempts to convert them into clean markdown
    // if there is a bug, it's probably here
    const isRssBased = ['atom', 'rss', 'fediverse'].includes(sourceType);
    const originalGetEntries = importer.getEntries.bind(importer);
    importer.getEntries = async (options) => {
        let entries = await originalGetEntries(options);

        if (isRssBased) {
            // force contentType=html so markdown conversion triggers
            for (const entry of entries) {
                entry.contentType = 'html';
            }

            // decode HTML entities and strip backslash escapes, then convert to markdown
            await importer.markdownService.asyncInit();
            for (const entry of entries) {
                if (entry.content) {
                    // strip backslash escapes (e.g., \<p> -> <p>)
                    let content = entry.content.replace(/\\([<>!&"'])/g, '$1');
                    content = entities.decodeHTML(content);
                    content = await importer.markdownService.toMarkdown(content, entry);
                    // fix markdownService escaping ![ to !\[ and \] to ]
                    content = content.split('!\\[').join('![');
                    content = content.split('\\]').join(']');
                    entry.content = content;
                }
            }
        }

        return entries;
    };

    info(`Starting import${isDryRun ? ' (dry run)' : ''}...`);

    try {
        const entries = await importer.getEntries({
            within,
            limit,
            outputContentType: 'markdown'
        });

        if (entries.length === 0) {
            warning('No content was found using your chosen import criteria.');
            return;
        }

        info(`Found ${entries.length} item(s) to import.`);

        if (!isDryRun) {
            await importer.toFiles(entries);

            // move assets from per-collection folders to shared content/assets/img/
            const assetsSourceDir = `./content/${targetLocale}/${targetCollection}/assets/img`;
            const assetsTargetDir = `./content/assets/img`;

            if (existsSync(assetsSourceDir)) {
                mkdirSync(assetsTargetDir, { recursive: true });

                const assetFiles = readdirSync(assetsSourceDir);
                for (const assetFile of assetFiles) {
                    const src = path.join(assetsSourceDir, assetFile);
                    const dest = path.join(assetsTargetDir, assetFile);

                    if (!existsSync(dest)) {
                        renameSync(src, dest);
                    } else {
                        unlinkSync(src);
                    }
                }

                rmSync(path.join(`./content/${targetLocale}/${targetCollection}/assets`), { recursive: true, force: true });

                info(`Moved ${assetFiles.length} asset(s) to ${assetsTargetDir}.`);
            }
        }

        importer.logResults();
        success('Import completed.');
    } catch (importError) {
        error(`Import failed: ${importError.message}`);
    }
};

export { addContent, removeContent, regenerateOpengraph, importContent };