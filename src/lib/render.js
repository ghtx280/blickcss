import tag from '../style-tag.js';
import context from '../context.js';
import createCss from './create-css.js';
import prerender from './prerender.js';

import { is } from './check-type.js';
import { timer } from './timer.js';
import { updateStore } from './update-store.js';

let once;

export default function (record, params = {}) {
    const ctx = context.get()
    
    // temporarily disabled
    // if (record && !checkRecord(record)) return;
    
    const TIMER = timer('Blick: Styles updated');
    const ATTRS = ['class', ...Object.keys(ctx.attr)];
    const NODES = params.NODES || document.querySelectorAll(ATTRS.map((e) => `[${e}]`).join());

    if (!once || ctx._CLI_) {
        prerender();
        once = true;
    }

    let is_style_updated;

    NODES.forEach((node) => {
        for (const attr of ATTRS) {
            let ATTR_VALUE = node.getAttribute(attr);
            
            if (is.str(ATTR_VALUE)) ATTR_VALUE = ATTR_VALUE.trim();

            if (!ATTR_VALUE) continue;

            for (const token of ATTR_VALUE.trim().split(/\s+/g)) {
                if (!updateStore(token, attr)) {
                    continue
                }
                is_style_updated = true;
            }
        }
    });

    if (is_style_updated) {
        tag.textContent = createCss();
        if (ctx.time) TIMER.stop(); // debugging the script execution time
    }

    return tag.textContent;
}
