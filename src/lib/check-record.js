import context from '../context.js';
import BLICK from '../theme/index.js';

const ctx = context.get() || BLICK;
const IGNORE = { STYLE: 1, SCRIPT: 1, HEAD: 1, HTML: 1 };
const ATTRS = ['class', ...Object.keys(ctx.attr)];

function check(el = {}) {
    if (!el.getAttribute) return false;
    if (el.nodeName in IGNORE) return false;
    if (!ATTRS.some((attr) => el.getAttribute(attr))) return false;
    return true;
}

export function checkRecord(rec = []) {
    if (!rec.length) return false;

    for (const r of rec) {
        // for empty body tag
        if (
            r.target.nodeName === 'HTML' &&
            r.addedNodes?.[0]?.nodeName === 'BODY'
        ) {
            return true;
        }
        // ---------------------
        if (!check(r.target)) {
            continue;
        }
        if (!r.addedNodes.length) {
            return true;
        }
        for (const n of r.addedNodes) {
            if (check(n)) {
                return true;
            }
        }
    }
}
