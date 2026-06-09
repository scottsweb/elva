import { input, rawlist, confirm } from '@inquirer/prompts';
import { success, error, getLocaleData, COLLECTIONS_PATH, COLLECTIONS_TEMPLATE_PATH, SETTINGS_PATH } from './utils.js';
import * as path from 'path';
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync, readdirSync } from 'fs';
import colors from 'yoctocolors';
import slugify from '@sindresorhus/slugify';

const getCollections = () => {
    return JSON.parse(readFileSync(COLLECTIONS_PATH, 'utf-8'));
};

const saveCollection = (data) => {
    writeFileSync(COLLECTIONS_PATH, JSON.stringify(data, null, 4));
};

const getLayoutChoices = () => {
    const settings = JSON.parse(readFileSync(SETTINGS_PATH, 'utf-8'));
    const theme = settings.theme || 'default';
    const layoutsDir = path.join(process.cwd(), 'themes', theme, '_layouts');
    const layoutFiles = readdirSync(layoutsDir);
    return layoutFiles
        .filter(f => !f.startsWith('_'))
        .map(f => f.replace(/\.[^.]+$/, ''))
        .sort();
};

const createCollectionFolder = (collectionName, localeKey) => {
    const collectionDir = path.join(process.cwd(), 'content', localeKey, collectionName);
    if (!existsSync(collectionDir)) {
        mkdirSync(collectionDir, { recursive: true });
    }
    const filePath = path.join(collectionDir, `${collectionName}.11tydata.js`);
    const templateContent = readFileSync(COLLECTIONS_TEMPLATE_PATH, 'utf-8');
    writeFileSync(filePath, templateContent);
};

const listCollections = () => {
    const collections = getCollections();
    const header = 'Label'.padEnd(24) + 'Layout'.padEnd(12) + 'Protected'.padEnd(12) + 'Searchable';
    console.log(colors.bold(colors.cyan(header)));
    console.log('-'.repeat(header.length));

    Object.entries(collections).forEach(([name, config], i) => {
        const label = `${i + 1}. ${config.label} (${name})`;
        const row = label.padEnd(24) + (config.layout || '').padEnd(12) +
            (config.protected ? colors.green('Yes'.padEnd(12)) : 'No '.padEnd(12)) +
            (config.searchable ? colors.green('Yes'.padEnd(12)) : 'No '.padEnd(12));
        console.log(row);
    });
    console.log('-'.repeat(header.length));
};

const addCollection = async () => {
    const collections = getCollections();
    const localesData = getLocaleData();

    const label = await input({
        message: 'Enter collection label (e.g. Projects):',
        required: true
    });
    const name = slugify(label);

    // check if collection name already exists
    if (collections[name]) {
        error(`A collection with the name '${name}' already exists.`);
        return;
    }

    const prefix = name;
    const overridePrefix = await input({
        message: `Enter default slug:`,
        default: name
    });
    const finalPrefix = slugify(overridePrefix) || prefix;

    const layoutChoices = getLayoutChoices();

    const layout = await rawlist({
        message: 'Choose an available layout:',
        default: 'page',
        choices: layoutChoices
    });

    const searchableChoice = await rawlist({
        message: 'Is this collection searchable?',
        default: true,
        choices: [
            { name: 'Yes', value: true },
            { name: 'No', value: false }
        ]
    });

    const protectedChoice = await rawlist({
        message: 'Is this collection protected?',
        default: false,
        choices: [
            { name: 'Yes', value: true },
            { name: 'No', value: false }
        ]
    });

    // get locale slugs
    const locales = {};
    for (const locale of localesData.locales) {
        const slug = await input({
            message: `Enter ${locale.name} slug:`,
            default: finalPrefix,
            required: true
        });
        locales[locale.value] = slugify(slug);
    }

   collections[name] = {
        label,
        prefix: finalPrefix,
        protected: protectedChoice,
        searchable: searchableChoice,
        layout,
        locales
    };

    saveCollection(collections);

    // create folders and 11tydata.js files for each locale
    for (const locale of localesData.locales) {
        createCollectionFolder(name, locale.value);
    }

    success(`Collection '${label} (${name})' has been created.`);
};

const removeCollection = async () => {
    const collections = getCollections();

    const nonProtected = Object.entries(collections)
        .filter(([_, config]) => !config.protected)
        .map(([name, collection]) => ({ name: `${collection.label} (${name})`, value: name }))
        .sort((a, b) => a.name.localeCompare(b.name));

    if (nonProtected.length === 0) {
        error('No removable collections. All collections are protected.');
        return;
    }

    const choice = await rawlist({
        message: 'Select a collection to remove:',
        choices: nonProtected
    });

    const config = collections[choice];

    if (!await confirm({ message: `Are you sure you want to remove '${config.label} (${choice})'? This will also delete all content in this collection across all locales.` })) {
        return;
    }

    // delete content folders for each locale
    const localesData = getLocaleData();
    for (const locale of localesData.locales) {
        const collectionDir = path.join(process.cwd(), 'content', locale.value, choice);
        if (existsSync(collectionDir)) {
            rmSync(collectionDir, { recursive: true, force: true });
        }
    }

    // remove from content-types.json
    delete collections[choice];
    saveCollection(collections);

    success(`Collection '${config.label}' (${choice}) has been removed.`);
};

const editCollection = async () => {
    const collections = getCollections();
    const localesData = getLocaleData();

    const collectionNames = Object.keys(collections)
        .map(name => ({ name: `${collections[name].label} (${name})`, value: name }))
        .sort((a, b) => a.name.localeCompare(b.name));

    const choice = await rawlist({
        message: 'Select collection to edit:',
        choices: collectionNames
    });

    const config = collections[choice];

    // edit label
    const newLabel = await input({
        message: `Enter label (current: '${config.label}'):`,
        default: config.label
    });
    if (newLabel && newLabel !== config.label) {
        const newName = slugify(newLabel);
        if (newName !== choice && collections[newName]) {
            error(`A collection with the name '${newName}' already exists.`);
            return;
        }
        config.label = newLabel;
        // note: we don't rename the collection key, just update the label
    }

    // edit prefix
    const newPrefix = await input({
        message: `Enter prefix (current: '${config.prefix}'):`,
        default: config.prefix
    });
    if (newPrefix) {
        config.prefix = slugify(newPrefix);
    }

    // edit layout
    const layoutChoices = getLayoutChoices();
    const newLayout = await rawlist({
        message: `Choose a layout (current: '${config.layout}'):`,
        choices: layoutChoices,
        default: config.layout
    });
    config.layout = newLayout;

    // edit searchable
    const searchableChoice = await rawlist({
        message: `Is this collection searchable? (current: ${config.searchable ? 'Yes' : 'No'})`,
        default: config.searchable,
        choices: [
            { name: 'Yes', value: true },
            { name: 'No', value: false }
        ]
    });
    config.searchable = searchableChoice;

    // edit protected (skip for posts and pages)
    if (!['posts', 'pages'].includes(choice)) {
        const protectedChoice = await rawlist({
            message: `Is this collection protected? (current: ${config.protected ? 'Yes' : 'No'})`,
            default: config.protected,
            choices: [
                { name: 'Yes', value: true },
                { name: 'No', value: false }
            ]
        });
        config.protected = protectedChoice;
    }

    // edit locale slugs
    for (const locale of localesData.locales) {
        const currentSlug = config.locales?.[locale.value] || config.prefix || choice;
        const slug = await input({
            message: `Enter ${locale.name} slug (current: '${currentSlug}'):`,
            default: currentSlug,
            required: true
        });
        config.locales = config.locales || {};
        config.locales[locale.value] = slugify(slug);
    }

    collections[choice] = config;
    saveCollection(collections);
    success(`Collection '${config.label} (${choice})' has been updated.`);
};

export { listCollections, addCollection, removeCollection, editCollection };
