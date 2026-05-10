import colors from 'yoctocolors';
import * as path from 'path';
import { readFileSync } from 'fs';

export const LOCALES_PATH = path.join(process.cwd(), 'content', '_data', 'locales.json');
export const TRANSLATIONS_PATH = path.join(process.cwd(), 'content', '_data', 'translations.json');
export const SETTINGS_PATH = path.join(process.cwd(), 'content', '_data', 'settings.json');
export const PACKAGE_PATH = path.join(process.cwd(), 'package.json')
export const THEMES_PATH = path.join(process.cwd(), '/themes')

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