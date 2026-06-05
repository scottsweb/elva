#!/usr/bin/env node

import { select } from '@inquirer/prompts';
import { addLanguage, removeLanguage, listLanguages, changeDefaultLanguage } from './languages.js';
import { addContent, removeContent, regenerateOpengraph } from './content.js';
import { setupSite, setupTheme } from './setup.js';
import { error, info, handleExitError, clean } from './utils.js';

// parse command-line arguments
const args = process.argv.slice(2);

// check for shortcuts like "language add", "content remove", "clean" etc
if (args.length >= 1) {
    const [firstArg, secondArg, ...rest] = args;
    
    switch (firstArg) {
        case 'setup':
            if (!secondArg) break;
            switch (secondArg) {
                case 'site':
                    try {
                        await setupSite();
                        process.exit(0);
                    } catch (error) {
                        handleExitError(error);
                    }
                case 'theme':
                    try {
                        await setupTheme();
                        process.exit(0);
                    } catch (error) {
                        handleExitError(error);
                    }
            }
        case 'language':
        case 'languages':
            if (!secondArg) break;
            switch (secondArg) {
                case 'add':
                    try {
                        await addLanguage();
                        process.exit(0);
                    } catch (error) {
                        handleExitError(error);
                    }
                case 'remove':
                    try {
                        await removeLanguage();
                        process.exit(0);
                    } catch (error) {
                        handleExitError(error);
                    }
                case 'list':
                    listLanguages();
                    process.exit(0);
                case 'default':
                    try {
                        await changeDefaultLanguage();
                        process.exit(0);
                    } catch (error) {
                        handleExitError(error);
                    }
            }
        case 'content':
            if (!secondArg) break;
            switch (secondArg) {
                case 'add':
                    try {
                        await addContent();
                        process.exit(0);
                    } catch (error) {
                        handleExitError(error);
                    }
                case 'remove':
                    try {
                        await removeContent();
                        process.exit(0);
                    } catch (error) {
                        handleExitError(error);
                    }
                case 'regenerate':
                    try {
                        await regenerateOpengraph();
                        process.exit(0);
                    } catch (error) {
                        handleExitError(error);
                    }
            }
        case 'clean':
            try {
                clean();
                process.exit(0);
            } catch (error) {
                handleExitError(error);
            }
        default:
            try {
                await runCLI();
                process.exit(0);
            } catch (error) {
                handleExitError(error);
            }
    }
}

async function runCLI() {
    try {
        const choice = await select({
            message: 'What would you like to manage?',
            choices: [
                { name: 'Settings', value: 'settings' },
                { name: 'Languages', value: 'languages' },
                { name: 'Content', value: 'content' },
                { name: '⏹ Exit', value: 'exit' }
            ]
        });

        switch (choice) {
            case 'settings':
                await manageSettings();
                break;
            case 'languages':
                await manageLanguages();
                break;
            case 'content':
                await manageContent();
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

// sub-menu: settings
async function manageSettings() {
    const actions = [
        { name: 'Site setup', value: 'setup' },
        { name: 'Pick theme', value: 'theme' },
        { name: '⏴ Back', value: 'back' },
        { name: '⏹ Exit', value: 'exit' }
    ];

    while (true) {
        try {
            const action = await select({
                message: 'Settings:',
                choices: actions
            });

            switch (action) {
                case 'setup':
                    await setupSite();
                    break;
                case 'theme':
                    await setupTheme();
                    break;
                case 'back':
                    await runCLI();
                    break;
                case 'exit':
                    info('Goodbye!');
                    process.exit(0);
            }
        } catch (error) {
            handleExitError(error);
        }
    }
}

// sub-menu: languages
async function manageLanguages() {
    const actions = [
        { name: 'List languages', value: 'list' },
        { name: 'Add language', value: 'add' },
        { name: 'Remove language', value: 'remove' },
        { name: 'Change default language', value: 'default' },
        { name: '⏴ Back', value: 'back' },
        { name: '⏹ Exit', value: 'exit' }
    ];
    
    while (true) {
        try {
            const action = await select({
                message: 'Languages:',
                choices: actions
            });

            switch (action) {
                case 'add':
                    await addLanguage();
                    break;
                case 'remove':
                    await removeLanguage();
                    break;
                case 'list':
                    listLanguages();
                    break;
                case 'default':
                    await changeDefaultLanguage();
                    break;
                case 'back':
                    await runCLI();
                    break;
                case 'exit':
                    info('Goodbye!');
                    process.exit(0);
            }
        } catch (error) {
            handleExitError(error);
        }
    }
}

// sub-menu: content
async function manageContent() {
    const actions = [
        { name: 'Add content', value: 'add' },
        { name: 'Remove content', value: 'remove' },
        { name: 'Regenerate all open graph images', value: 'regenerate' },
        { name: '⏴ Back', value: 'back' },
        { name: '⏹ Exit', value: 'exit' }
    ];
    
    while (true) {
        try {
            const action = await select({
                message: 'Content:',
                choices: actions
            });

            switch (action) {
                case 'add':
                    await addContent();
                    break;
                case 'remove':
                    await removeContent();
                    break;
                case 'regenerate':
                    await regenerateOpengraph();
                    break;
                case 'back':
                    await runCLI();
                    break;
                case 'exit':
                    info('Goodbye!');
                    process.exit(0);
            }
        } catch (error) {
            handleExitError(error);
        }
    }
}

// start the CLI
runCLI();