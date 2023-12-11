import colors from './colors.js';
import { is } from '../lib/check-type.js';

let canvas;
let canvas_ctx;

if (typeof window !== 'undefined') {
    canvas = document.createElement('canvas');
    canvas_ctx = canvas.getContext('2d');
}

export function config(updates = this, source = this, isFirstCall = true) {
    if (updates === source) return source
    
    
    if (!is.obj(updates)) {
        console.error(
            'Blick: The blick.config function must contain an object.'
        );
        return
    }

    for (let key in updates) {
        if (is.null(updates[key]) || is.undef(updates[key])) {
            delete source[key]
        }
        else if (is.obj(updates[key]) && !is.arr(updates[key])) {
            if (!source[key] || is.str(source[key])) {
                source[key] = {};
            }
            config(updates[key], source[key], false);
        }
        else {
            source[key] = updates[key];
        }
    }
    if (isFirstCall) {
        // code on use config
    }
    return source;
}

export function getHex(str) {
    if (!canvas) {
        throw Error('function getHex available only in browser');
    }
    canvas_ctx.fillStyle = str;
    return canvas_ctx.fillStyle;
}

export function getVarColor(str) {
    if (!colors) return;

    if (is.var(str)) {
        str = str.slice(1);
    }

    const [colorName, shade] = str.split('-');

    if (shade) {
        if (colors[colorName][shade]) {
            return colors[colorName][shade];
        } else {
            throw Error(
                `Blick: This shade "${shade}" is not exist for "${colorName}".\n` +
                    `Available shades: ${Object.keys(colors[colorName]).filter(
                        (e) => e !== 'def'
                    )}`
            );
        }
    }
    return (
        colors[colorName]?.def ||
        colors[colorName]?.DEFAULT ||
        colors[colorName]
    );
}

export function getHexAlpha(str) {
    str = +str;
    if (str < 0 || str > 100) {
        throw Error('Blick: Alpha value must be a from 0 to 100');
    }
    let shade = Math.round((str / 100) * 255).toString(16);
    if (shade.length === 1) {
        shade = '0' + shade;
    }
    return shade;
}


export default {
    config,
    getHex,
    getVarColor,
    getHexAlpha,
}