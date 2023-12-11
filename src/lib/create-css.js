import context from '../context.js';
import createRoot from './create-root.js';

export default function() {
    const ctx = context.get()
    const STORE = ctx._STORE_.CSS_STORE
    
    let media_str = '';
    let css_str = '';

    for (const attr in STORE) {
        if (attr === 'MEDIA') {
            for (const md in STORE.MEDIA) {
                media_str += `@media${md}{${STORE.MEDIA[md]}}`;
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
        result_css += createRoot()
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
