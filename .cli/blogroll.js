import { input, checkbox, confirm } from '@inquirer/prompts';
import { success, error, info, BLOGROLL_PATH } from './utils.js';
import { readFileSync, writeFileSync } from 'fs';
import colors from 'yoctocolors';

const listBlogroll = () => {
    const blogroll = JSON.parse(readFileSync(BLOGROLL_PATH, 'utf-8'));

    if (blogroll.length === 0) {
        info('Blogroll is empty.');
        return;
    }

    const header = 'Name'.padEnd(25) + 'URL'.padEnd(37) + 'Feed';
    console.log(colors.bold(colors.cyan(header)));
    console.log('-'.repeat(100));
    blogroll.forEach((entry, index) => {
        const row = (index + 1) + '. ' + entry.name.padEnd(22) + entry.url.padEnd(37) + entry.feed;
        console.log(row);
    });
    console.log('-'.repeat(100));
};

const addBlogroll = async () => {
    const blogroll = JSON.parse(readFileSync(BLOGROLL_PATH, 'utf-8'));

    const name = await input({
        message: 'Enter name:',
        required: true
    });

    let url = await input({
        message: 'Enter URL (https://):',
        required: true
    });

    if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
    }

    let feed = await input({
        message: 'Enter feed URL (https://):',
        required: true
    });

    if (!/^https?:\/\//i.test(feed)) {
        feed = 'https://' + feed;
    }

    // check for duplicate URL
    const duplicate = blogroll.find(entry => entry.url === url);
    if (duplicate) {
        error(`A blogroll entry with URL '${url}' already exists.`);
        return;
    }

    // check for duplicate feed
    const duplicateFeed = blogroll.find(entry => entry.feed === feed);
    if (duplicateFeed) {
        error(`A blogroll entry with feed URL '${feed}' already exists.`);
        return;
    }

    const newEntry = {
        name,
        feed,
        url
    };

    blogroll.push(newEntry);
    writeFileSync(BLOGROLL_PATH, JSON.stringify(blogroll, null, 4) + '\n');

    success(`Added '${name}' to blogroll.`);
};

const removeBlogroll = async () => {
    const blogroll = JSON.parse(readFileSync(BLOGROLL_PATH, 'utf-8'));

    if (blogroll.length === 0) {
        info('Blogroll is empty.');
        return;
    }

    const choices = blogroll.map((entry, index) => ({
        name: `${index + 1}. ${entry.name} (${entry.url})`,
        value: index,
        checked: false
    }));

    const selected = await checkbox({
        message: 'Select entries to remove:',
        choices: choices
    });

    if (selected.length === 0) {
        info('No entries selected.');
        return;
    }

    const selectedSet = new Set(selected);
    const filtered = blogroll.filter((_, index) => !selectedSet.has(index));
    writeFileSync(BLOGROLL_PATH, JSON.stringify(filtered, null, 4) + '\n');

    success(`Removed ${selected.length} link(s) from the blogroll.`);
};

export { listBlogroll, addBlogroll, removeBlogroll };
