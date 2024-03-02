// import context from '../context.js';
import { CreateScreens } from '../theme/screen.js';
import { is } from './check-type.js';
import { MediaParser } from './parser/parse-media.js';

export default function(ctx) {
    // const ctx = context.get()
   
    if (!ctx.dark) {
        ctx.dark = ctx.states.dark('').trim();
    }

    if (typeof window !== undefined) {
        if (
            ctx.autoTheme &&
            matchMedia('(prefers-color-scheme: dark)').matches
        ) {
            if (ctx.dark.startsWith('.')) {
                document.documentElement.classList.add(ctx.dark.slice(1));
            } else if (ctx.dark.startsWith('#')) {
                document.documentElement.id = ctx.dark.slice(1);
            } else if (ctx.dark.startsWith('[') && ctx.dark.endsWith(']')) {
                document.documentElement.setAttribute(ctx.dark.slice(1, -1));
            }
        }
    }

    if (ctx.wrapper) {
        // const parseMedia = new MediaParser(ctx)

        for (const scr in CreateScreens()) {
            let size = ctx.screen[scr];

            ctx._STORE_.CSS_STORE.MEDIA.MIN[size] =
                ctx.wrapper + `{max-width:${is.num(size) ? size : size[0]}px}`;
        }
    }
}
