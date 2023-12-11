import context from '../context.js';
import { is } from './check-type.js';

export default function () {
    const ctx = context.get()

    let fonts = '';
    let colors = '';

    for (const type in ctx?.font) {
        fonts += `--font-${type}:${ctx.font[type]};`;
    }

    for (const color in ctx?.colors) {
        if (is.str(ctx.colors[color])) {
            colors += `--${color}:${ctx.colors[color]};`;
            continue;
        }

        for (const num in ctx.colors[color]) {
            colors += `--${color + (num === 'def' ? '' : '-' + num)}:${
                ctx.colors[color][num]
            };`;
        }
    }
    return `:root{${colors + fonts}}`;
}
