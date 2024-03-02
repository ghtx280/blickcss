// import context from '../context.js';
import { is } from './check-type.js';
import createRoot from './create-root.js';


export default function(ctx) {
    // const ctx = context.get()
    const STORE = ctx._STORE_.CSS_STORE
    
    let media_str = '';
    let css_str = '';

    for (const attr in STORE) {
        if (attr === 'MEDIA') {
            for (const size in STORE.MEDIA.MIN) {
                media_str += `@media (min-width:${size}px){${
                    STORE.MEDIA.MIN[size]
                }}`;
            }

            let max_keys = Object.keys(STORE.MEDIA.MAX)
            for (let i = max_keys.length - 1; i >= 0; i--) {
                let size = max_keys[i];
                media_str += `@media (max-width:${
                    is.arr(size) ? size[1] : size 
                }px){${
                    STORE.MEDIA.MAX[size]
                }}`;
            }

            for (const size_min in STORE.MEDIA.RANGE) {
                for (const size_max in STORE.MEDIA.RANGE[size_min]) {
                    media_str += 
                    `@media (min-width:${size_min}px) and (max-width:${size_max}px){${
                        STORE.MEDIA.RANGE[size_min][size_max]
                    }}`;
                }
            }
            continue;
        }
        css_str += STORE[attr];
    }

    let result_css = ""

    result_css += `/* ! blickcss v${ctx.version} | MIT License | https://github.com/ghtx280/blickcss */\n\n`

    if (ctx.reset) {
        result_css += ctx.reset
    }
    if (ctx.root) {
        result_css += createRoot(ctx)
    }
    if (ctx.wrapper) {
        result_css += `${ctx.wrapper}{display:block;width:100%;margin:0 auto;padding-left:var(--wrapper-padding,15px);padding-right:var(--wrapper-padding,15px)}`
    }

    for (const key in ctx.attr) {
        if (ctx.attr[key]?._using && key in STORE) {
            result_css += `[${key}]{${ctx.attr[key]._using}}`
        }
    }

    if (ctx.autoFlex) {
        result_css += '[class*="flex-"],[class*="jc-"],[class*="ai-"],[class*="gap-"]{display:flex}'
    }

    return (
        result_css + css_str + media_str
    )
}

// ${KEYFRAMES}
