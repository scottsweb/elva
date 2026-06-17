import { input, rawlist, confirm } from '@inquirer/prompts';
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, unlinkSync } from 'fs';
import { success, error, warning, PACKAGE_PATH, SETTINGS_PATH, THEMES_PATH, getLocaleData } from './utils.js';
import * as path from 'path';

const getSettings = () => {
    const data = JSON.parse(readFileSync(SETTINGS_PATH, 'utf-8'));
    return data;
};

const getPackage = () => {
    const data = JSON.parse(readFileSync(PACKAGE_PATH, 'utf-8'));
    return data;
};

const deepMerge = (target, source) => {
    const result = { ...target };
    for (const key of Object.keys(source)) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            result[key] = deepMerge(result[key] || {}, source[key]);
        } else {
            result[key] = source[key];
        }
    }
    return result;
};

const updateSettings = (settings) => {
    const existingSettings = getSettings();
    const merged = deepMerge(existingSettings, settings);
    
    if (JSON.stringify(existingSettings) !== JSON.stringify(merged)) {
        writeFileSync(SETTINGS_PATH, JSON.stringify(merged, null, 4), 'utf-8');
        success('settings.json updated.');
    } else {
        warning('settings.json has not changed.');
    }
};

const updatePackageJson = (packageData) => {
    const existingPkg = getPackage();
    const merged = deepMerge(existingPkg, packageData);
    
    // Write back only if changed
    if (JSON.stringify(existingPkg) !== JSON.stringify(merged)) {
        writeFileSync(PACKAGE_PATH, JSON.stringify(merged, null, 4));
        success('package.json updated.');
    } else {
        warning('package.json has not changed.');
    }
};

const setupSite = async () => {
    let packageJson = {};
    const newPackageJson = {};

    try {
        packageJson = getPackage();
    } catch (err) {
        error(`Failed to read package.json: ${err.message}`);
        return;
    }
    
    newPackageJson.name = await input({
        message: 'Enter site name:',
        required: true,
        default: packageJson.name
    });
    
    newPackageJson.description = await input({
        message: 'Enter site description:',
        required: true,
        default: packageJson.description
    });
    
    newPackageJson.version = await input({
        message: 'Enter version (e.g. 1.0.0):',
        required: true,
        default: packageJson.version
    });
    
    newPackageJson.keywords = await input({
        message: 'Enter keywords/tags (comma-separated):',
        required: true,
        default: packageJson.keywords.join(', ')
    });
    
    newPackageJson.keywordsArray = newPackageJson.keywords.split(',').map(k => k.trim()).filter(Boolean);
    
    newPackageJson.authorName = await input({
        message: 'Enter author name:',
        required: true,
        default: packageJson.author?.name
    });
    
    newPackageJson.authorUrl = await input({
        message: 'Enter author URL (e.g. https://example.com):',
        required: true,
        default: packageJson.author?.url
    });
    
    newPackageJson.authorEmail = await input({
        message: 'Enter author email:',
        required: true,
        default: packageJson.author?.email
    });
    
    newPackageJson.authorLocation = await input({
        message: 'Enter author location:',
        required: true,
        default: packageJson.location
    });
        
    updatePackageJson({
        name: newPackageJson.name,
        description: newPackageJson.description,
        version: newPackageJson.version,
        keywords: newPackageJson.keywordsArray,
        author: {
            name: newPackageJson.authorName,
            url: newPackageJson.authorUrl,
            email: newPackageJson.authorEmail
        },
    });

    updateSettings({
        author: {
            name: newPackageJson.authorName,
            url: newPackageJson.authorUrl,
            email: newPackageJson.authorEmail,
            location: newPackageJson.authorLocation
        }
    });
    
    success('Site setup saved.');
};

const setupTheme = async () => {
    const themes = readdirSync(THEMES_PATH, { withFileTypes: true });
    const themeDirectories = themes.filter(folder => folder.isDirectory()).map((folder) => ({ name: folder.name, value: folder.name }));
    
    if (themeDirectories.length === 0) {
        error('No themes found in the themes/ directory.');
        return;
    }
    
    const theme = await rawlist({
        message: 'Select a theme to use:',
        choices: themeDirectories
    });
    
    const existingSettings = JSON.parse(readFileSync(SETTINGS_PATH, 'utf-8'));
    existingSettings.theme = theme;
    
    writeFileSync(SETTINGS_PATH, JSON.stringify(existingSettings, null, 4));
    success(`Theme '${theme}' selected.`);
}

const deleteDefaultContent = async () => {
    if (!await confirm({ message: 'Are you sure?' })) {
        return;
    }

    const localesData = getLocaleData();
    const collections = ['posts', 'pages'];
    let deletedCount = 0;

    for (const locale of localesData.locales) {
        for (const collection of collections) {
            const collectionDir = path.join(process.cwd(), 'content', locale.value, collection);
            if (!existsSync(collectionDir)) {
                continue;
            }

            const files = readdirSync(collectionDir).filter(f => f.endsWith('.md'));
            for (const file of files) {
                if (file === '404.md' || file === 'index.md') {
                    continue;
                }
                const filePath = path.join(collectionDir, file);
                try {
                    unlinkSync(filePath);
                    deletedCount++;
                } catch (err) {
                    error(`Failed to delete ${filePath}: ${err.message}.`);
                }
            }

        }
    }

    success(`Deleted ${deletedCount} file(s).`);
};

export { setupSite, setupTheme, deleteDefaultContent };