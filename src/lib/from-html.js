import createCss from "./create-css.js";
import prerender from "./prerender.js";

import { updateStore } from "./update-store.js";
import { createAttrRegexp } from "../node/funcs/create-attr-regexp.js";
import { CreateStore } from "./create-store.js";

export class HTMLProcessor {
    constructor(ctx) {
        this.ctx = ctx
    }

    css(html = ""){
        const ATTRS = ["class", ...Object.keys(this.ctx.attr)];
    
        this.ctx._STORE_ = CreateStore()
    
        prerender(this.ctx)
    
        for (const attr of ATTRS) {
            const MATCHES = [...html.matchAll(createAttrRegexp(attr))]
    
            if (MATCHES.length) {
                const ATTR_VALUE = MATCHES.map(e => e[2]).join(" ")
    
                if (ATTR_VALUE.trim()) {
                    for (const token of ATTR_VALUE.trim().split(/\s+/g)) {
                        updateStore(this.ctx, token, attr)
                    }
                }
            }
            
        }
    
        return createCss(this.ctx)
    }
}