import { is } from './check-type.js';
import { parser } from './parser/index.js';

export function createRule(token, attr) {
    const STRUCT = parser(token, attr);
    let IS_MEDIA = false

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
                IS_MEDIA = true
            }
        }
    }

    if (STRUCT.extra && is.str(STRUCT.extra)) {
        STRUCT.selector = STRUCT.extra.replace(/\$/g, STRUCT.selector )
    }

    for (let rule of STRUCT.styles) {
        let style = rule.prop;
        
        let postfix = rule.important ? " !important" : "";

        if (is.func(rule.prop)) {
            style = rule.prop(rule) || '';

            if (is.obj(style)) {
                style.prop   = style._prop   || rule.prop;
                style.vals   = style._vals   || rule.vals;
                style.one    = style._one    || rule.one;
                style.unit   = style._unit   || rule.unit;
                style.values = style._values || rule.values;
                rule = {...rule, ...style}
            }
            else {
                rule.prop = style;
            }
        }

        const re = {
            group: /\$(\d+)?/g,
            space: /^\s*(.+?):\s*/
        }

        if (rule.values) {           
            style = rule.prop.replace(re.group, (_, group) => {
                if (group) {
                    let vals = rule.values[group - 1] || rule.values[0]
                    let unit = is.arr(rule.unit) ? rule.unit : [rule.unit]
                    
                    if (is.arr(rule.unit) && +vals.raw) {
                        return vals.raw + (rule.unit[group - 1] || "")
                    }

                    return vals.val || vals.raw
                }
                return rule.val || rule.rawVal;
            });
        }

        style = style
            .split(";")
            .map(e => e.replace(re.space, "$1:") + postfix)
            .join(";");

           
        DECLARED.push(style);
    }

    const STYLE = DECLARED
    .join(';')
    .replace(/(?<!\\)_/g, ' ');



    return [MEDIA, `${STRUCT.selector}{${STYLE}}`];
}
