import { input, rawlist, confirm } from '@inquirer/prompts';
import { success, error, info, getLocaleData, getTemplatePartChoices, TRANSLATIONS_DIR } from './utils.js';
import * as path from 'path';
import { readFileSync, writeFileSync, readdirSync } from 'fs';

const getTranslationFiles = () => {
    return readdirSync(TRANSLATIONS_DIR)
        .filter(f => f.endsWith('.json'))
        .map(f => f.replace('.json', ''));
};

const loadTranslationFile = (locale) => {
    const filePath = path.join(TRANSLATIONS_DIR, `${locale}.json`);
    return JSON.parse(readFileSync(filePath, 'utf-8'));
};

const saveTranslationFile = (locale, data) => {
    const filePath = path.join(TRANSLATIONS_DIR, `${locale}.json`);
    writeFileSync(filePath, JSON.stringify(data, null, 4));
};

// Traverse to the parent object of a dot-notation key path
const getNestedParent = (obj, keyPath) => {
    const parts = keyPath.split('.');
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        if (current[parts[i]] === undefined || typeof current[parts[i]] !== 'object' || current[parts[i]] === null) {
            return null;
        }
        current = current[parts[i]];
    }
    return { parent: current, lastKey: parts[parts.length - 1] };
};

// Get the value at a dot-notation key path
const getNestedValue = (obj, keyPath) => {
    const parts = keyPath.split('.');
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        if (!current || typeof current !== 'object') return undefined;
        current = current[parts[i]];
    }
    return current?.[parts[parts.length - 1]];
};

// Set a value at a dot-notation path, creating intermediate objects as needed
const setNestedValue = (obj, keyPath, value) => {
    const parts = keyPath.split('.');
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]] || typeof current[parts[i]] !== 'object') {
            current[parts[i]] = {};
        }
        current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
};

// Check if setting a value at this path would conflict with an existing string
const hasConflict = (obj, keyPath) => {
    const parts = keyPath.split('.');
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        if (current[parts[i]] !== undefined && typeof current[parts[i]] !== 'object') {
            return true;
        }
        if (current[parts[i]] === undefined) {
            return false;
        }
        current = current[parts[i]];
    }
    return false;
};

// Delete a value at a dot-notation path, cleaning up empty parent objects
const deleteNestedKey = (obj, keyPath) => {
    const parent = getNestedParent(obj, keyPath);
    if (!parent) return false;
    if (!(parent.lastKey in parent.parent)) return false;

    delete parent.parent[parent.lastKey];

    const parts = keyPath.split('.');

    // Clean up empty parent objects
    if (parts.length === 2 && Object.keys(parent.parent).length === 0) {
        delete obj[parts[0]];
    } else if (parts.length > 2 && Object.keys(parent.parent).length === 0) {
        let grandParent = obj;
        for (let i = 0; i < parts.length - 2; i++) {
            grandParent = grandParent[parts[i]];
        }
        if (grandParent && typeof grandParent === 'object') {
            delete grandParent[parts[parts.length - 2]];
        }
    }

    return true;
};

const flattenTranslations = (obj, prefix = '') => {
    const results = [];
    for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (key === 'count' && typeof value === 'object' && value !== null && !Array.isArray(value) && value.one !== undefined && value.other !== undefined) {
            const oneValue = value.one?.toString() || '';
            const otherValue = value.other?.toString() || '';
            const pluralKey = prefix || key;
            results.push({ key: pluralKey, value: `${oneValue} / ${otherValue}`, isPlural: true });
        } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            results.push(...flattenTranslations(value, fullKey));
        } else {
            results.push({ key: fullKey, value });
        }
    }
    return results;
};

const addTranslation = async () => {
    const templatePartChoices = getTemplatePartChoices();

    if (templatePartChoices.length === 0) {
        error('No templates or includes found.');
        return;
    }

    const templatePart = await rawlist({
        message: 'Choose a template or include:',
        choices: templatePartChoices
    });

    const key = await input({
        message: 'Enter the unique key (e.g. primaryButton):',
        required: true
    });

    const fullKey = `${templatePart}.${key}`;

    const isPlural = await confirm({
        message: 'Is this a plural translation?',
        default: false
    });

    const localesData = getLocaleData();
    const defaultLocale = localesData.defaultLocale;
    const localeValues = {};

    for (const locale of localesData.locales) {
        if (isPlural) {
            const oneValue = await input({
                message: `Enter ${locale.name} singular (one):`,
                default: locale.value === defaultLocale ? undefined : localeValues[defaultLocale].count.one
            });
            const otherValue = await input({
                message: `Enter ${locale.name} plural (other):`,
                default: locale.value === defaultLocale ? undefined : localeValues[defaultLocale].count.other
            });
            localeValues[locale.value] = { count: { one: oneValue, other: otherValue } };
        } else {
            localeValues[locale.value] = await input({
                message: `Enter ${locale.name} translation:`,
                default: locale.value === defaultLocale ? undefined : localeValues[defaultLocale]
            });
        }
    }

    const translationFiles = getTranslationFiles();
    const defaultLocaleData = loadTranslationFile(translationFiles.find(f => f === localesData.defaultLocale) || translationFiles[0]);
    if (hasConflict(defaultLocaleData, fullKey)) {
        error(`Cannot add '${fullKey}': '${templatePart}' already exists as a simple string translation.`);
        return;
    }

    for (const locale of translationFiles) {
        const data = loadTranslationFile(locale);
        setNestedValue(data, fullKey, localeValues[locale]);
        saveTranslationFile(locale, data);
    }

    success(`Translation '${fullKey}' has been added.`);
};

const syncTranslations = async () => {
    const translationFiles = getTranslationFiles();
    const localesData = getLocaleData();
    const defaultLocale = localesData.defaultLocale;
    const defaultData = loadTranslationFile(defaultLocale);

    const otherLocales = translationFiles.filter(f => f !== defaultLocale);
    if (otherLocales.length === 0) {
        info('No other locales to sync to.');
        return;
    }

    const getAllKeys = (obj, prefix = '') => {
        const keys = [];
        for (const [key, value] of Object.entries(obj)) {
            const fullKey = prefix ? `${prefix}.${key}` : key;
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                keys.push(...getAllKeys(value, fullKey));
            } else {
                keys.push(fullKey);
            }
        }
        return keys;
    };

    const defaultKeys = getAllKeys(defaultData);
    let syncedCount = 0;

    for (const locale of otherLocales) {
        const localeData = loadTranslationFile(locale);
        const localeKeys = getAllKeys(localeData);
        let localeSynced = 0;

        for (const key of defaultKeys) {
            if (!localeKeys.includes(key)) {
                const finalValue = getNestedValue(defaultData, key);
                setNestedValue(localeData, key, finalValue);
                localeSynced++;
            }
        }

        if (localeSynced > 0) {
            saveTranslationFile(locale, localeData);
            syncedCount += localeSynced;
        }
    }

    success(`Synced ${syncedCount} missing translation(s) from '${defaultLocale}' to other locales.`);
};

const removeTranslation = async () => {
    const defaultLocale = getLocaleData().defaultLocale;
    const data = loadTranslationFile(defaultLocale);
    const flattened = flattenTranslations(data);

    const searchStr = await input({
        message: `Search (${defaultLocale}):`,
        required: true
    });

    const matches = flattened
        .filter(item => item.value.toString().toLowerCase().includes(searchStr.toLowerCase()))
        .map(item => ({
            name: `${item.key} → ${item.value}`,
            value: item.key
        }));

    if (matches.length === 0) {
        error(`No translations containing '${searchStr}' were found.`);
        return;
    }

    const selectedKey = await rawlist({
        message: 'Select a translation to remove:',
        choices: matches
    });

    if (!await confirm({ message: `Are you sure you want to remove '${selectedKey}' from all locales?` })) {
        return;
    }

    const translationFiles = getTranslationFiles();
    let totalRemoved = 0;

    for (const locale of translationFiles) {
        const data = loadTranslationFile(locale);
        if (deleteNestedKey(data, selectedKey)) {
            totalRemoved++;
            saveTranslationFile(locale, data);
        }
    }

    if (totalRemoved === 0) {
        error(`Translation '${selectedKey}' was not found in any locale.`);
    } else {
        success(`Translation '${selectedKey}' has been removed from ${totalRemoved} locale(s).`);
    }
};

export { addTranslation, removeTranslation, syncTranslations };
