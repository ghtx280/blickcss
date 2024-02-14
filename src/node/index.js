#!/usr/bin/env node

console.log('\n================BlickCss================\n');

import fs       from 'fs';
import fg       from 'fast-glob';
import url      from 'url';
import path     from 'path';
import chokidar from 'chokidar';

// import COLOR  from './funcs/make-hex.js';
import CONFIG from './default-config.js';

import { isModule      } from './funcs/is-module.js';
import { cssbeautify   } from './funcs/cssbeautify.js';
import { showMsg       } from './funcs/show-msg.js';

import {
    mkdirIfNotExist,
    writeFileIfNotExist
} from './funcs/node-helpers.js';
import { timer } from '../lib/timer.js';
import { BlickCss } from '../blick.js';
import sendError from '../helpers/send-error.js';
// import context from '../context.js';

let ctx = new BlickCss()

try {
    const DIR = path.dirname(url.fileURLToPath(import.meta.url));
    const CWD = process.cwd();

    const CONFIG_FILE_NAME = `blick.config.${!isModule() ? 'm' : ''}js`
    const CONFIG_FILE_PATH = path.resolve(CONFIG_FILE_NAME)
    const CONFIG_FILE_PATH_REL = path.relative(DIR, CONFIG_FILE_PATH);

    let user_config = {}

    async function filesUpdate(updatedFile) {
        let tmr = timer()
        const FILES = fg.sync(user_config.input);

        let filesText = ""

        for (const file of FILES) {        
            filesText += fs.readFileSync(file, "utf-8")
        }
        
        let CSS = ctx.html(filesText)
        
        if (ctx.beautify) {
            CSS = cssbeautify(CSS);
        }

        mkdirIfNotExist(path.dirname(user_config.output))

        fs.writeFile(user_config.output, CSS, (err) => {
            if (err) {
                return sendError(`Error writing file`, err);
            }
            showMsg(updatedFile, user_config, tmr.getFormated())
        });
    }

    let watching_files

    async function handleConfigUpdate() {
        watching_files?.close()

        const PATH = `./${CONFIG_FILE_PATH_REL}?update=${Date.now()}`

        await new Promise((resolve, reject) => {
            import(PATH)
            .then(CONFIG => {
                user_config = CONFIG.default
                ctx = new BlickCss()
                ctx.config(user_config)
                filesUpdate();
                resolve()
    
            })
            .catch(e => sendError([
                e + " in "+ CONFIG_FILE_NAME,
                "Please check your config file"
            ].join("\n")));
        });


        if (user_config.watch) {
            watching_files = chokidar
            .watch(user_config.input)
            .on('change', (filePath) => {
                filesUpdate(filePath);
            })
        }
    };


    async function main() {
        writeFileIfNotExist(CONFIG_FILE_PATH, CONFIG);
        
        await handleConfigUpdate();
    
        chokidar
        .watch(CONFIG_FILE_PATH)
        .on('change', handleConfigUpdate);
    }
    main();
}
catch (error) {
    console.log(error);
}

// let blick = ctx

// export default blick