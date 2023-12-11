import fs from 'fs';
import { createAttrRegexp } from "./create-attr-regexp.js";

export function processFile(file, attrs) {
    const html = fs.readFileSync(file, 'utf-8');

    if (!file) {
        return console.error('BlickCss: File error');
    }

    const NODE = {
        getAttribute: function(token) {
            return this[token]
        }
    }

    for (const attr of attrs) {
        const ATTR_REGEXP = createAttrRegexp(attr)
        const MATCHES = html.matchAll(ATTR_REGEXP)
        const MATCHES_ARR = [...MATCHES]

        NODE[attr] = MATCHES_ARR.map(e => e[2]).join(" ")
    }

    return NODE
}