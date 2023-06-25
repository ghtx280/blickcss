#!/usr/bin/env node

import liveServer        from "live-server" 
import B_RENDER          from "./funcs/render.js" 
import blick             from "./blick-obj.js" 
import fs                from 'fs' ;
import chokidar          from 'chokidar' ;
import { fileURLToPath } from 'url';
import { dirname, join, relative } from 'path';
import * as _STORE_      from "./store.js";
import { glob }          from 'glob';
import beautify          from 'js-beautify'
import color             from "color"

import { createRequire } from 'node:module';

const root = process.cwd()

const require = createRequire(import.meta.url);

let config = {};

const config_filename = "blick.config.js"

function getRelPathSync(fileName) {
  try {
    fs.accessSync(fileName, fs.constants.F_OK)
    return relative(
      dirname(fileURLToPath(import.meta.url)),
      join(root, fileName)
    ); 
  } catch {}
  return null;
}

const filePath = getRelPathSync(config_filename);

if (filePath) {
  config = require(filePath)
}

const store_copy = structuredClone({..._STORE_})

blick._STORE_ = store_copy
blick._COLOR_ = color
blick._CLI_   = true

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
 
const intputPath = config.input  || './src/*.html';
const outputPath = config.output || './src/output.css';

blick.config(config)

if (config.server) {
  liveServer.start({
    port: config.server?.port ?? 3500,
    host: config.server?.host ?? "0.0.0.0",
    root: config.server?.root ?? (fs.existsSync(`${root}/src`) ? `${root}/src` : root),
    open: config.server?.open ?? true,
    logLevel: config.server?.logLevel ?? 0,
    wait: config.server?.wait ?? 0
  });
}

let filesText = {};

async function processHTMLFiles(updatedFile) {
  blick._STORE_ = structuredClone(store_copy)

  const files = await glob(intputPath)

  for (const file of files) {
    const data = fs.readFileSync(file, 'utf-8')

    if (!file) return console.error("file error")

    const unique = e => Array.from(new Set(e))

    const attrsValue = {};

    const f_regex_attr = e => new RegExp(`\\s${blick.attr[e] || "class"}\\s*=\\s*["'\`](.*?)["'\`]`,"g") 

    const regexParser = {
      class: f_regex_attr("class"),
      text:  f_regex_attr("text"),
      flex:  f_regex_attr("flex"),
      grid:  f_regex_attr("grid"),
    }

    for (const attr in regexParser) {
      const matches = data.matchAll(regexParser[attr]);
      attrsValue[attr] = []
      for (const match of matches) {
        const arrVals = match[1].trim().split(/\s+/g);
        attrsValue[attr].push(...arrVals);
      }
      attrsValue[attr] = unique(attrsValue[attr])
    }
    filesText[file] = attrsValue;
  }

  const values = Object.values(filesText)

  const all = {
    class: [],
    text:  [],
    flex:  [],
    grid:  [],
  }

  for (const item of values) {
    for (const key in all) {
      all[key].push(...item[key])
     }
  }

  let css = B_RENDER(all, { cli: true })

  if (config.beautify) {
    css = beautify.css(css, {
      indent_size: 2
    })
  }

  fs.writeFile(outputPath, css, function(err) {
    if (err) {
      console.error("Error writing file", err);
    } else {
      console.log(`${updatedFile ? `'${updatedFile}' was changed. ` : ""}'${outputPath}' updated successfully`);
    }
  });
}
processHTMLFiles();


chokidar.watch(intputPath).on('change', (filePath) => {
  processHTMLFiles(filePath)
})