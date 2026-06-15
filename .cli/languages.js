import { input, confirm, rawlist } from '@inquirer/prompts';
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync, cpSync, readdirSync, unlinkSync } from 'fs';
import * as path from 'path';
import { success, error, getLocaleData, LOCALES_PATH } from './utils.js';
import colors from 'yoctocolors';

const getLanguages = () => {
    const data = JSON.parse(readFileSync(LOCALES_PATH, 'utf-8'));
    return Object.entries(data).map(([key, lang]) => ({
        name: lang.label,
        key: key,
        locale: lang.locale,
        dir: lang.dir,
        default: lang.default
    }));
};

const addLanguage = async () => {
    const newLanguage = {};

    newLanguage.label = await input({
        message: 'Enter language name (e.g. Français):',
        required: true
    });

    newLanguage.locale = await input({
        message: 'Enter language locale (e.g. fr-fr):',
        required: true,
        transformer: (input) => {
            return input.toLowerCase();
        }
    });
    
    newLanguage.shorthand = await input({
        message: 'Language Shorthand (e.g. FR):',
        required: true
    });

    newLanguage.dir = await rawlist({
        message: 'Select language direction:',
        default: 'ltr',
        choices: [
            {
                name: 'ltr',
                value: 'ltr'
            },
            {
                name: 'rtl',
                value: 'rtl'        
            }
        ]
    });
    
    newLanguage.default = false;
    newLanguage.locale = newLanguage.locale.toLowerCase();

    const data = JSON.parse(readFileSync(LOCALES_PATH, 'utf-8'));

    data[newLanguage.locale] = newLanguage;

    // create the folder for the new language
    const folderPath = path.join(process.cwd(), 'content', newLanguage.locale);
    mkdirSync(folderPath, { recursive: true });

    // create the locale JSON file
    const jsonFilePath = path.join(folderPath, `${newLanguage.locale}.json`);
    writeFileSync(jsonFilePath, JSON.stringify({ lang: newLanguage.locale }, null, 4));

    // update locales.json
    writeFileSync(LOCALES_PATH, JSON.stringify(data, null, 4));

    const localesData = getLocaleData();
    const defaultLocale = localesData.defaultLocale;

    // create data files for new locale
    const createLocaleFile = (type, content) => {
        const dir = path.join(process.cwd(), 'content', '_data', type);
        mkdirSync(dir, { recursive: true });
        const filePath = path.join(dir, `${newLanguage.locale}.json`);
        writeFileSync(filePath, JSON.stringify(content, null, 4));
    };

    try {
        const defaultTranslations = JSON.parse(readFileSync(path.join(process.cwd(), 'content', '_data', 'translations', `${defaultLocale}.json`), 'utf-8'));
        createLocaleFile('translations', defaultTranslations);
    } catch (err) {
        error(`Failed to create translations file: ${err.message}.`);
    }

    try {
        createLocaleFile('stopwords', []);
    } catch (err) {
        error(`Failed to create stopwords file: ${err.message}.`);
    }

    // ask if user wants to copy content from default locale
    if (await confirm({ message: `Would you like to copy content from '${defaultLocale}' to '${newLanguage.locale}'?` })) {
        const defaultContentDir = path.join(process.cwd(), 'content', defaultLocale);
        const newContentDir = path.join(process.cwd(), 'content', newLanguage.locale);
    
        // get all files in the default locale except the JSON file
        const files = readdirSync(defaultContentDir);
        const filesToCopy = files.filter(file => file !== `${defaultLocale}.json` && file !== 'content');

        // copy each file and directory
        for (const file of filesToCopy) {
            const srcPath = path.join(defaultContentDir, file);
            const destPath = path.join(newContentDir, file);

            // create destination directory if it doesn't exist
            const destDir = path.dirname(destPath);
            mkdirSync(destDir, { recursive: true });

            // copy the file (cpSync handles directories recursively)
            cpSync(srcPath, destPath, { recursive: true });
        }
    }

    success(`Language '${newLanguage.locale}' has been added.`);
};

const removeLanguage = async () => {
    const data = JSON.parse(readFileSync(LOCALES_PATH, 'utf-8'));

    const localesData = getLocaleData();
    const result = await rawlist({
        message: 'Select language to remove:',
        choices: localesData.locales
    });
    
    if (result === localesData.defaultLocale) {
        error(`Cannot remove the default language '${result}'.`);
        return;
    }

    if (!await confirm({ message: `Are you sure you want to remove '${result}'? This will also delete your content.` })) {
        return;
    }
    
    // remove the content folder
    const contentFolderPath = path.join(process.cwd(), 'content', result);
    if (existsSync(contentFolderPath)) {
        rmSync(contentFolderPath, { recursive: true });
    }

    // remove per-locale files
    const translationsPath = path.join(process.cwd(), 'content', '_data', 'translations', `${result}.json`);
    const stopwordsPath = path.join(process.cwd(), 'content', '_data', 'stopwords', `${result}.json`);
    try {
        if (existsSync(translationsPath)) {
            unlinkSync(translationsPath);
        }
        if (existsSync(stopwordsPath)) {
            unlinkSync(stopwordsPath);
        }
    } catch (err) {
        error(`Failed to remove locale files for ${result}: ${err.message}.`);
    }

    // update locales.json
    delete data[result];
    writeFileSync(LOCALES_PATH, JSON.stringify(data, null, 4));
    success(`Language '${result}' has been removed.`);
};

const changeDefaultLanguage = async () => {
    const data = JSON.parse(readFileSync(LOCALES_PATH, 'utf-8'));

    const localesData = getLocaleData();
    const result = await rawlist({
        message: `Select language to set as default:`,
        choices: localesData.locales
    });
    
    // remove all existing defaults
    for (const key in data) {
        if (key !== result) {
            data[key].default = false;
        }
    }

    // set the new default
    data[result].default = true;
    
    writeFileSync(LOCALES_PATH, JSON.stringify(data, null, 4));
    success(`Default language changed to '${result}'.`);
};

const listLanguages = () => {
    const languages = getLanguages();    
    const header = 'Name'.padEnd(18) + 'Key'.padEnd(10) + 'Locale'.padEnd(12) + 'Dir'.padEnd(8) + 'Default';
    console.log(colors.bold(colors.cyan(header)));
    console.log('-'.repeat(58));
    languages.forEach((lang, index) => {
        const row = (index + 1) + '. ' + lang.name.padEnd(15) + lang.key.padEnd(10) + lang.locale.padEnd(12) + lang.dir.padEnd(8) + (lang.default ? colors.green('Yes') : 'No');
        console.log(row);
    });
    console.log('-'.repeat(58));
};

export { getLanguages, addLanguage, removeLanguage, listLanguages, changeDefaultLanguage };