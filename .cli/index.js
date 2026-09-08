#!/usr/bin/env node

import { select } from '@inquirer/prompts';
import { addLanguage, removeLanguage, listLanguages, changeDefaultLanguage } from './languages.js';
import { addContent, removeContent, regenerateOpengraph, importContent } from './content.js';
import { addBlogroll, listBlogroll, removeBlogroll } from './blogroll.js';
import { listCollections, addCollection, removeCollection, editCollection, syncTemplates } from './collections.js';
import { setupSite, setupTheme, setupNewTheme, deleteDefaultContent } from './setup.js';
import { addTranslation, removeTranslation, syncTranslations } from './translations.js';
import { error, info, handleExitError, clean } from './utils.js';

// parse command-line arguments
const args = process.argv.slice(2);

// helper to run a command with error handling
const runCommand = async (fn) => {
    try {
        await fn();
        process.exit(0);
    } catch (error) {
        handleExitError(error);
    }
};

// command registry for CLI shortcuts
const commands = {
    setup: {
        site: setupSite,
        theme: setupTheme,
        'new-theme': setupNewTheme,
        'delete-default-content': deleteDefaultContent
    },
    language: {
        add: addLanguage,
        remove: removeLanguage,
        list: listLanguages,
        default: changeDefaultLanguage
    },
    languages: {
        add: addLanguage,
        remove: removeLanguage,
        list: listLanguages,
        default: changeDefaultLanguage
    },
    content: {
        add: addContent,
        remove: removeContent,
        regenerate: regenerateOpengraph,
        import: importContent
    },
    blogroll: {
        list: listBlogroll,
        add: addBlogroll,
        remove: removeBlogroll
    },
    collection: {
        list: listCollections,
        add: addCollection,
        remove: removeCollection,
        edit: editCollection
    },
    collections: {
        list: listCollections,
        add: addCollection,
        remove: removeCollection,
        edit: editCollection
    },
    translation: {
        add: addTranslation,
        remove: removeTranslation,
        sync: syncTranslations
    },
    translations: {
        add: addTranslation,
        remove: removeTranslation,
        sync: syncTranslations
    }
};

// generate command descriptions from registry keys
const commandDescriptions = Object.fromEntries(
    Object.entries(commands).map(([key, value]) => [key, Object.keys(value).join(', ')])
);

// handle CLI shortcuts
if (args.length >= 1) {
    const [firstArg, secondArg, ...rest] = args;
    
    // single-argument commands
    if (firstArg === 'clean') {
        try { clean(); process.exit(0); }
        catch (error) { handleExitError(error); }
    } else if (firstArg === 'sync-collections') {
        try { syncTemplates(); process.exit(0); }
        catch (error) { handleExitError(error); }
    } else if (commands[firstArg]) {
        // two-argument commands
        if (!secondArg) {
            error(`Missing subcommand for '${firstArg}'. Available commands: ${commandDescriptions[firstArg]}`);
            process.exit(1);
        }
        
        const handler = commands[firstArg][secondArg];
        if (handler) {
            await runCommand(handler);
        } else {
            error(`Unknown command: '${firstArg} ${secondArg}'. Available commands: ${commandDescriptions[firstArg]}`);
            process.exit(1);
        }
    } else {
        // unknown command - fall through to interactive menu
        await runCLI();
    }
}

// generic sub-menu manager
async function manageMenu(message, actions, handlers) {
    while (true) {
        try {
            const action = await select({
                message,
                choices: actions
            });

            if (action === 'back') {
                await runCLI();
                return;
            }
            if (action === 'exit') {
                info('Goodbye!');
                process.exit(0);
            }
            if (handlers[action]) {
                await handlers[action]();
            }
        } catch (error) {
            handleExitError(error);
        }
    }
}

// interactive CLI menu
async function runCLI() {
    try {
        const choice = await select({
            message: 'What would you like to manage?',
            choices: [
                { name: 'Content', value: 'content' },
                { name: 'Blogroll', value: 'blogroll' },
                { name: 'Translations', value: 'translations' },
                { name: 'Collections', value: 'collections' },
                { name: 'Languages', value: 'languages' },
                { name: 'Setup', value: 'setup' },
                { name: '⏹ Exit', value: 'exit' }
            ]
        });

        switch (choice) {
            case 'setup':
                await manageSetup();
                break;
            case 'languages':
                await manageLanguages();
                break;
            case 'content':
                await manageContent();
                break;
            case 'blogroll':
                await manageBlogroll();
                break;
            case 'collections':
                await manageCollections();
                break;
            case 'translations':
                await manageTranslations();
                break;
            case 'exit':
                info('Goodbye!');
                process.exit(0);
            default:
                error('Invalid option');
        }
    } catch (error) {
        handleExitError(error);
    }
}

// sub-menu handlers with their actions
async function manageSetup() {
    const actions = [
        { name: 'Site setup', value: 'setup' },
        { name: 'Pick theme', value: 'theme' },
        { name: 'New theme', value: 'newTheme' },
        { name: 'Delete default content', value: 'deleteDefaultContent' },
        { name: '⏴ Back', value: 'back' },
        { name: '⏹ Exit', value: 'exit' }
    ];
    const handlers = {
        setup: setupSite,
        theme: setupTheme,
        newTheme: setupNewTheme,
        deleteDefaultContent: deleteDefaultContent
    };
    await manageMenu('Setup:', actions, handlers);
}

async function manageLanguages() {
    const actions = [
        { name: 'List languages', value: 'list' },
        { name: 'Add language', value: 'add' },
        { name: 'Remove language', value: 'remove' },
        { name: 'Change default language', value: 'default' },
        { name: '⏴ Back', value: 'back' },
        { name: '⏹ Exit', value: 'exit' }
    ];
    const handlers = {
        add: addLanguage,
        remove: removeLanguage,
        list: listLanguages,
        default: changeDefaultLanguage
    };
    await manageMenu('Languages:', actions, handlers);
}

async function manageContent() {
    const actions = [
        { name: 'Add content', value: 'add' },
        { name: 'Remove content', value: 'remove' },
        { name: 'Import content', value: 'import' },
        { name: 'Regenerate open graph images', value: 'regenerate' },
        { name: '⏴ Back', value: 'back' },
        { name: '⏹ Exit', value: 'exit' }
    ];
    const handlers = {
        add: addContent,
        remove: removeContent,
        regenerate: regenerateOpengraph,
        import: importContent
    };
    await manageMenu('Content:', actions, handlers);
}

async function manageBlogroll() {
    const actions = [
        { name: 'List blogroll', value: 'list' },
        { name: 'Add to blogroll', value: 'add' },
        { name: 'Remove from blogroll', value: 'remove' },
        { name: '⏴ Back', value: 'back' },
        { name: '⏹ Exit', value: 'exit' }
    ];
    const handlers = {
        list: listBlogroll,
        add: addBlogroll,
        remove: removeBlogroll
    };
    await manageMenu('Blogroll:', actions, handlers);
}

async function manageCollections() {
    const actions = [
        { name: 'List collections', value: 'list' },
        { name: 'Add collection', value: 'add' },
        { name: 'Edit collection', value: 'edit' },
        { name: 'Remove collection', value: 'remove' },
        { name: '⏴ Back', value: 'back' },
        { name: '⏹ Exit', value: 'exit' }
    ];
    const handlers = {
        list: listCollections,
        add: addCollection,
        remove: removeCollection,
        edit: editCollection
    };
    await manageMenu('Collections:', actions, handlers);
}

async function manageTranslations() {
    const actions = [
        { name: 'Add translation', value: 'add' },
        { name: 'Remove translation', value: 'remove' },
        { name: 'Sync translations', value: 'sync' },
        { name: '⏴ Back', value: 'back' },
        { name: '⏹ Exit', value: 'exit' }
    ];
    const handlers = {
        add: addTranslation,
        remove: removeTranslation,
        sync: syncTranslations
    };
    await manageMenu('Translations:', actions, handlers);
}

// start the CLI
runCLI();
