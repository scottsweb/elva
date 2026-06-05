import { input, rawlist, checkbox, confirm } from '@inquirer/prompts';
import { success, error, warning, info, getLocaleData, LOCALES_PATH} from './utils.js';
import * as path from 'path';
import { readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync } from 'fs';
import { readdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import matter from '@11ty/gray-matter';

const addContent = async () => {
    const content = {};
    const localesData = getLocaleData();
    
    // get available content types from actual folders
    const contentDir = `content/${localesData.defaultLocale}/`;
    const contentTypes = await readdir(contentDir, { withFileTypes: true });
    
    // filter to only return child folders (and none starting with _)
    const contentTypeList = contentTypes
        .filter((folder) => folder.isDirectory())
        .filter((folder) => !folder.name.startsWith('_') && folder.name != 'content')
        .map((folder) => ({ name: folder.name, value: folder.name }))
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
    const globP = await import('glob');
    const pattern = `content/**/${slug}.md`;
    const files = await globP.glob(pattern);

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
    const cssPath = path.join(process.cwd(), 'dist/assets/css/opengraph.css');
    
    if (!existsSync(cssPath)) {
        error('CSS file not found: dist/assets/css/opengraph.css. Please build the site first (npm run dev) before running this tool again.');
        return;
    }

    if (!await confirm({ message: 'This will regenerate all open graph images. Continue?' })) {
        return;
    }

    const localesData = getLocaleData();
    const globP = await import('glob');

    let totalGenerated = 0;
    let totalFailed = 0;

    for (const locale of localesData.locales) {
        const pattern = `content/${locale.value}/**/*.md`;
        const files = await globP.glob(pattern, { ignore: ['content/**/_*/**/*'] });

        if (files.length === 0) {
            info(`No markdown files found in content/${locale.value}/`);
            continue;
        }

        info(`Processing ${files.length} markdown file(s) in ${locale.value}...`);

        for (const file of files) {
            try {
                const fileContent = readFileSync(file, 'utf-8');
                const { data: fm, content } = matter(fileContent);

                const fmJson = JSON.stringify(fm);
                const result = spawnSync('node', ['.frontmatter/scripts/opengraph.js', process.cwd(), file, fmJson], {
                    encoding: 'utf-8'
                }).stdout?.trim();

                if (result) {
                    try {
                        const output = JSON.parse(result);
                        if (output.frontmatter?.thumbnail) {
                            fm.thumbnail = output.frontmatter.thumbnail;
                            const updatedContent = matter.stringify(content, fm);
                            writeFileSync(file, updatedContent);
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

export { addContent, removeContent, regenerateOpengraph };