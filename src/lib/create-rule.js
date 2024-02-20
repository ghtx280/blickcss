import { is } from './check-type.js';
import { escape } from '../helpers/escape.js'
// import { parser } from './parser/index.js';



export function createRule(STRUCT) {
    // const STRUCT = parser(token, attr);
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
        

        let imp = rule.important ? "!important" : "";

        

        if (is.func(rule.prop)) {
            style = rule.prop(rule) || '';

            if (!style) return;

            if (is.arr(style)) {
                rule.values = style[1]
                style = style[0]
            }

            if (is.obj(style)) {
                for (const key in style) {
                    if (key[0] == "_") {
                        rule[key.slice(1)] = style[key]
                    }
                }
            }
            else {
                rule.prop = style;
            }
        }

        // console.log(rule);

        const re = {
            group: /\$(\d+)?/g,
            space: /^\s*(.+?):\s*/
        }

        

        function replaceDynamic(_, group) {
            if (!group) return rule.val || rule.rawVal || rule.prop;

            let vals = rule.values[group - 1] ?? rule.values[0]
            let unit = rule.unit?.[group - 1] ?? rule.unit?.[0] ?? rule.unit

            return vals.val || vals.raw || (+vals ? vals + (unit || "") : vals)
        }

        if (rule.values) {
            style = rule.prop.replace(re.group, replaceDynamic);
        }
        else {
            style = style._one || style
        }

        if (!style || !is.str(style)) return;

        

        style = style
            .replace(/([^:]+):([^;]+);?/g, (_, prop, val) => {
                    _ = imp
                    prop = prop.trim()
                    val = val.trim()
                    return `${prop}:${val}${_ ? " !important" : ""};`
                }
            )
            .slice(0, -1)
           
        // DECLARED.push(style.replace(/(?<!\\)_/g, ' '));
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






// style = style.replace(/(?<!;\s*);(?![^()]*\))|(?<!;)$/g, imp ? ` ${imp};` : ";")




    // const STYLE = DECLARED
    // .join(';')
    // .replace(/(?<!\\)_/g, ' ');



    // return [MEDIA, `${STRUCT.selector}{${STYLE}}`];






// let unit = is.arr(rule.unit) ? rule.unit : [rule.unit]
            
            
            // // console.log(vals);

            
            // if (is.arr(rule.unit) && +vals.raw) {
            //     return vals.raw + (rule.unit[group - 1] || "")
            // }