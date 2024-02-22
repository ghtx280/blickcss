import { is } from './check-type.js';
import { escape } from '../helpers/escape.js'
// import { parser } from './parser/index.js';

const re = {
    group: /\$(\d+)?/g,
    space: /^\s*(.+?):\s*/,
    rule: /([^:]+):([^;]+);?/g
}

export function createRule(STRUCT) {
    if (!STRUCT) return null;
    
    const MEDIA = [];
    const DECLARED = [];

    if (STRUCT.states) {
        for (let i = STRUCT.states.length - 1; i >= 0; i--) {
            const state = STRUCT.states[i];

            if (state.type === 'pseudo') {
                if (is.func(state.val)) {
                    STRUCT.selector = state.val(STRUCT.selector);
                }
                else if (state.val?.includes('$')) {
                    STRUCT.selector = state.val.replace('$', STRUCT.selector);
                }
                else {
                    STRUCT.selector += state.val;
                }
            }
            else if (state.type === 'media') {
                MEDIA.push(state);
            }
        }
    }

    if (STRUCT.extra && is.str(STRUCT.extra)) {
        STRUCT.selector = STRUCT.extra.replace(/\$/g, STRUCT.selector )
    }

    for (let rule of STRUCT.styles) {
        let style = rule.prop;
        let important = rule.important ? "!important" : "";
        
        if (rule.values) {
            style = rule.prop.replace(re.group, (_, group) => {
                if (!group) {
                    return rule.val || rule.rawVal
                }
                
                let vals = rule.values[group - 1] ?? rule.values[0]
                let unit = rule.unit?.[group - 1] ?? rule.unit?.[0] ?? rule.unit
    
                return vals.val || vals.raw || (+vals ? vals + (unit || "") : vals)
            });
        }
        else {
            style = style._one || style
        }

        if (!style || !is.str(style)) {
            return null
        }

        style = style.replace(re.rule, (_, prop, val) => {
            return (
                `${prop.trim()}:${val.trim()}${important ? " !important" : ""};`
            )
        })
            
        if (style[style.length-1] == ";") {
            style = style.slice(0, -1)
        }
        
        DECLARED.push(escape(style, "_").replace(" "));
    }

    return {
        media: MEDIA.length ? MEDIA : null,
        selector: STRUCT.selector,
        styles: DECLARED,

        css() {
            return `${STRUCT.selector}{${this.styles.join(";")}}`
        }
    }
}