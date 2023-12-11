import context from '../../context.js';
import { createMediaWidth } from '../create-media-width.js';

export function parseMedia(str) {
    const ctx = context.get()
    
    if (!str) throw new Error(`value is required, (${str})`);

    if (str.startsWith(ctx.maxPrefix)) {
        str = str.slice(ctx.maxPrefix.length);
        return createMediaWidth([null, ctx.screen[str] || str]);
    }

    return createMediaWidth(ctx.screen[str] || str);
}
