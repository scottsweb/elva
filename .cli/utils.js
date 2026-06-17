import colors from 'yoctocolors';
import * as path from 'path';
import { readFileSync, rmSync, existsSync, readdirSync } from 'fs';

export const LOCALES_PATH = path.join(process.cwd(), 'content', '_data', 'locales.json');
export const SETTINGS_PATH = path.join(process.cwd(), 'content', '_data', 'settings.json');
export const BLOGROLL_PATH = path.join(process.cwd(), 'content', '_data', 'blogroll.json');
export const PACKAGE_PATH = path.join(process.cwd(), 'package.json');
export const THEMES_PATH = path.join(process.cwd(), 'themes');
export const COLLECTIONS_PATH = path.join(process.cwd(), 'content', '_data', 'types.json');
export const COLLECTIONS_TEMPLATE_PATH = path.join(process.cwd(), '.cli', 'templates', 'collection.11tydata.js');
export const TRANSLATIONS_DIR = path.join(process.cwd(), 'content', '_data', 'translations');

export const getTemplatePartChoices = ({ type = 'all' } = {}) => {
    const settings = JSON.parse(readFileSync(SETTINGS_PATH, 'utf-8'));
    const theme = settings.theme || 'default';
    const layoutsDir = path.join(process.cwd(), 'themes', theme, '_layouts');
    const includesDir = path.join(process.cwd(), 'themes', theme, '_includes');

    const choices = [];

    if (type !== 'includes' && existsSync(layoutsDir)) {
        const layoutFiles = readdirSync(layoutsDir)
            .filter(f => !f.startsWith('_') && f.endsWith('.njk'))
            .map(f => f.replace(/\.njk$/, ''))
            .sort();
        choices.push(...layoutFiles.map(f => ({ name: `Layout: ${f}`, value: f })));
    }

    if (type !== 'layouts' && existsSync(includesDir)) {
        const includeFiles = readdirSync(includesDir)
            .filter(f => !f.startsWith('_') && f.endsWith('.njk'))
            .map(f => f.replace(/\.njk$/, ''))
            .sort();
        choices.push(...includeFiles.map(f => ({ name: `Include: ${f}`, value: f })));
    }

    return choices;
};

export const success = (message) => {
    console.log(colors.green(message));
};

export const error = (message) => {
    console.error(colors.red(message));
};

export const warning = (message) => {
    console.warn(colors.yellow(message));
};

export const info = (message) => {
    console.log(colors.cyan(message));
};

export const getLocaleData = () => {
    const data = JSON.parse(readFileSync(LOCALES_PATH, 'utf-8'));
    const defaultLocale = Object.keys(data).find(key => data[key].default);
    
    const locales = Object.entries(data).map(([key, lang]) => {
        const name = defaultLocale === key ? `${lang.label} (${key})*` : `${lang.label} (${key})`;
        return {
            name: name,
            value: key
        };
    });

    return { locales, defaultLocale }
}

export const handleExitError = (error) => {
    if (error.name === 'ExitPromptError') {
        warning('Exiting...');
        process.exit(0);
    } else {
        console.error(error);
        process.exit(1);
    }
}

export const clean = () => {
    // because the output folder can be customised in 11ty, we need to check the value for our clean up script
    const match = readFileSync('.eleventy.js', 'utf-8').match(/dir:\s*\{[^}]*output:\s*['"]([^'"]+)['"]/s);
    const outputDir = match?.[1] ?? 'dist';
    info(`Deleting ${outputDir} folder...`);
    rmSync(outputDir, { recursive: true, force: true });
}