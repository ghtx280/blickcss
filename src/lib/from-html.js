import BLICK from "../theme/index.js";
import _STORE_ from "../store.js";
import context from "../context.js";
import createCss from "./create-css.js";
import prerender from "./prerender.js";

import { updateStore } from "./update-store.js";
import { createAttrRegexp } from "../node/funcs/create-attr-regexp.js";

let ctx 
const STORE_COPY = structuredClone(_STORE_)

export default function(html = "", config) {
    if (config || !ctx) {
        ctx = BLICK.clone()
        ctx.config(config)
        context.set(ctx)
    }

    const ATTRS = ["class", ...Object.keys(ctx.attr)];

    ctx._STORE_ = structuredClone(STORE_COPY)

    prerender()

    for (const attr of ATTRS) {
        const MATCHES = [...html.matchAll(createAttrRegexp(attr))]

        if (MATCHES.length) {
            const ATTR_VALUE = MATCHES.map(e => e[2]).join(" ")

            if (ATTR_VALUE.trim()) {
                for (const token of ATTR_VALUE.trim().split(/\s+/g)) {
                    updateStore(token, attr)
                }
            }
        }
        
    }
    return createCss()
}