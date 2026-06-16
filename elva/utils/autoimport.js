import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

export async function autoImport(eleventyConfig, dir, register, { aliases = false } = {}) {
    const resolved = path.isAbsolute(dir) ? dir : path.resolve(process.cwd(), dir);
    const files = fs.readdirSync(resolved).filter(f => f.endsWith('.js'));
    const url = pathToFileURL(resolved).href;
    
    for (const file of files) {
        const exportName = file.replace('.js', '');
        const module = await import(`${url}/${file}`);
        
        // register main export
        const fn = module[exportName];
        if (fn) register(fn, exportName);
        
        // register backward-compat aliases
        if (aliases) {
            for (const [name, aliasFn] of Object.entries(module)) {
                if (name !== exportName && typeof aliasFn === 'function') {
                    register(aliasFn, name);
                }
            }
        }
    }
}

export async function autoImportFilters(eleventyConfig, dir) {
    await autoImport(eleventyConfig, dir, (fn, name) => {
        eleventyConfig.addFilter(name, fn);
    }, { aliases: true });
}

export async function autoImportPlugins(eleventyConfig, dir) {
    await autoImport(eleventyConfig, dir, (fn) => {
        eleventyConfig.addPlugin(fn);
    }, { aliases: false });
}

export async function autoImportTransforms(eleventyConfig, dir) {
    await autoImport(eleventyConfig, dir, (fn, name) => {
        eleventyConfig.addTransform(name, fn);
    }, { aliases: false });
}

export async function autoImportShortcodes(eleventyConfig, dir) {
    await autoImport(eleventyConfig, dir, (fn, name) => {
        eleventyConfig.addShortcode(name, fn);
    }, { aliases: false });
}
