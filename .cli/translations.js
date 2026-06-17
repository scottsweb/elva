import { input, rawlist, confirm } from '@inquirer/prompts';
import { success, error, getLocaleData, getTemplatePartChoices, TRANSLATIONS_DIR } from './utils.js';
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

const setNestedValue = (obj, keyPath, value) => {
    const parts = keyPath.split('.');
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) {
            current[parts[i]] = {};
        } else if (typeof current[parts[i]] !== 'object') {
            current[parts[i]] = {};
        }
        current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
};

const checkNestedConflict = (obj, keyPath) => {
    const parts = keyPath.split('.');
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        if (current[parts[i]] === undefined) {
            return false;
        }
        if (typeof current[parts[i]] !== 'object' || current[parts[i]] === null) {
            return true;
        }
        current = current[parts[i]];
    }
    return false;
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
    if (checkNestedConflict(defaultLocaleData, fullKey)) {
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

    const flattenKeys = (obj, prefix = '') => {
        const keys = [];
        for (const [key, value] of Object.entries(obj)) {
            const fullKey = prefix ? `${prefix}.${key}` : key;
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                keys.push(...flattenKeys(value, fullKey));
            } else {
                keys.push(fullKey);
            }
        }
        return keys;
    };

    const defaultKeys = flattenKeys(defaultData);
    let syncedCount = 0;

    for (const locale of otherLocales) {
        const localeData = loadTranslationFile(locale);
        const localeKeys = flattenKeys(localeData);
        let localeSynced = 0;

        for (const key of defaultKeys) {
            if (!localeKeys.includes(key)) {
                let current = defaultData;
                const parts = key.split('.');
                for (let i = 0; i < parts.length - 1; i++) {
                    current = current[parts[i]];
                }
                const finalValue = current[parts[parts.length - 1]];

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

    const selectedMatch = matches.find(m => m.value === selectedKey);

    if (!await confirm({ message: `Are you sure you want to remove '${selectedKey}' from all locales?` })) {
        return;
    }

    const translationFiles = getTranslationFiles();
    let totalRemoved = 0;

    for (const locale of translationFiles) {
        const data = loadTranslationFile(locale);
        const parts = selectedKey.split('.');
        const topLevelKey = parts[0];
        let removed = false;

        if (selectedMatch.isPlural) {
            if (typeof data[topLevelKey] === 'object' && data[topLevelKey] !== null) {
                // plural nested: traverse to parent, delete the target key, clean up empty parents
                let current = data[topLevelKey];
                let exists = true;
                for (let i = 1; i < parts.length - 1; i++) {
                    if (!current || typeof current[parts[i]] === 'undefined') {
                        exists = false;
                        break;
                    }
                    current = current[parts[i]];
                }
                if (exists && current && current[parts[parts.length - 1]] !== undefined) {
                    delete current[parts[parts.length - 1]];
                    removed = true;
                    if (Object.keys(current).length === 0 && parts.length > 2) {
                        let parent = data[topLevelKey];
                        let parentExists = true;
                        for (let i = 1; i < parts.length - 2; i++) {
                            if (!parent || typeof parent[parts[i]] === 'undefined') {
                                parentExists = false;
                                break;
                            }
                            parent = parent[parts[i]];
                        }
                        if (parentExists) {
                            delete parent[parts[parts.length - 2]];
                        }
                    }
                }
            }
        } else if (typeof data[topLevelKey] === 'object' && data[topLevelKey] !== null) {
            // non-plural nested: traverse to parent, delete the target key, clean up if parent becomes empty
            const nestedParts = parts.slice(1);
            let current = data[topLevelKey];
            let found = true;
            for (let i = 0; i < nestedParts.length - 1; i++) {
                if (!current || typeof current[nestedParts[i]] === 'undefined') {
                    found = false;
                    break;
                }
                current = current[nestedParts[i]];
            }
            if (found && current && current[nestedParts[nestedParts.length - 1]] !== undefined) {
                const lastPart = nestedParts[nestedParts.length - 1];
                if (Object.keys(current).length === 1) {
                    delete data[topLevelKey];
                } else {
                    delete current[lastPart];
                }
                removed = true;
            }
        } else {
            // non-plural top-level: simple delete
            if (data[topLevelKey] !== undefined) {
                delete data[topLevelKey];
                removed = true;
            }
        }

        if (removed) {
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
