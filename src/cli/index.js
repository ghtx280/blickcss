#!/usr/bin/env node

import fs from "fs";
import color from "color";
import chokidar from "chokidar";
import { glob } from "glob";
import beautify from "js-beautify";
import liveServer from "live-server";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "node:module";

import blick from "../blick-obj.js";
import B_RENDER from "../funcs/render.js";
import * as _STORE_ from "../store.js";
import defalutConfig from "./default-config.js";

import { getRelPathSync } from "./funcs/rel-path.js";
import { getProjectType } from "./funcs/proj-type.js";

const root = process.cwd();
const this_file = fileURLToPath(import.meta.url);
const requireSync = createRequire(import.meta.url);
const config_filename = `blick.config.${getProjectType("module") ? "c" : ""}js`;

let config = {
  input: "./src/**/*.{html,js}",
  output: "./src/output.css",
  beautify: true,
  watch: true,
};

(async function () {
  const filePath = getRelPathSync(config_filename, this_file);

  if (filePath) {
    config = requireSync(filePath);
  } else {
    fs.writeFileSync(`${root}/${config_filename}`, defalutConfig);
  }

  const store_copy = structuredClone({ ..._STORE_ });

  blick._STORE_ = store_copy;
  blick._COLOR_ = color;
  blick._CLI_ = true;

  blick.config(config);

  if (config.server) {
    liveServer.start({
      port: config.server?.port ?? 3500,
      host: config.server?.host ?? "0.0.0.0",
      root:
        config.server?.root ??
        (fs.existsSync(`${root}/src`) ? `${root}/src` : root),
      open: config.server?.open ?? true,
      logLevel: config.server?.logLevel ?? 0,
      wait: config.server?.wait ?? 0,
    });
  }

  const filesText = {};

  async function processHTMLFiles(updatedFile) {
    blick._STORE_ = structuredClone(store_copy);

    const files = await glob(config.input);

    for (const file of files) {
      const data = fs.readFileSync(file, "utf-8");

      if (!file) return console.error("file error");

      const unique = (e) => Array.from(new Set(e));

      const attrsValue = {};

      const f_regex_attr = (e) =>
        new RegExp(
          `\\s${blick.attr[e] || "class"}\\s*=\\s*["'\`](.*?)["'\`]`,
          "g"
        );

      const regexParser = {
        class: f_regex_attr("class"),
        text: f_regex_attr("text"),
        flex: f_regex_attr("flex"),
        grid: f_regex_attr("grid"),
      };

      for (const attr in regexParser) {
        const matches = data.matchAll(regexParser[attr]);
        attrsValue[attr] = [];
        for (const match of matches) {
          const arrVals = match[1].trim().split(/\s+/g);
          attrsValue[attr].push(...arrVals);
        }
        attrsValue[attr] = unique(attrsValue[attr]);
      }
      filesText[file] = attrsValue;
    }

    const values = Object.values(filesText);

    const all = {
      class: [],
      text: [],
      flex: [],
      grid: [],
    };

    for (const item of values) {
      for (const key in all) {
        all[key].push(...item[key]);
      }
    }

    let css = B_RENDER(all, { cli: true });

    if (config.beautify) {
      css = beautify.css(css, {
        indent_size: 2,
      });
    }

    const outputDir = dirname(config.output);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFile(config.output, css, (err) => {
      if (err) {
        console.error(`Error writing file`, err);
      } else {
        console.log(
          `\n${
            updatedFile
              ? `'${updatedFile.replaceAll("\\", "/")}' was changed.\n`
              : ""
          }'${config.output.replaceAll(/\.+\//g, "")}' updated successfully. ${
            config.watch ? "\nWaiting for change..." : ""
          }`
        );
      }
    });
  }
  processHTMLFiles();

  if (config.watch) {
    chokidar.watch(config.input).on("change", (filePath) => {
      processHTMLFiles(filePath);
    });
  }
})();
