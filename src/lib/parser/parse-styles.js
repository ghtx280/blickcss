import { RuleParser } from './parse-rule.js';
import { ValueParser } from './parse-value.js';
import { is } from '../check-type.js';
// import context from '../../context.js';

export class StylesParser {
    constructor(ctx) {
        this.ctx = ctx;
        this.parseValue = new ValueParser(ctx);
        this.parseRule = new RuleParser(ctx);
    }

    parse(style, attr, token, states) {
        let target;
        let declaration = null;
        let values = null;
        let important = false;

        if (attr == "class") {
            target = this.ctx.class
        }
        else {
            target = this.ctx.attr[attr]
        }

        if (style.includes('!')) {
            style = style.replace(/!/g, '');
            important = true;
        }

        let { source, path, value } = this.parseRule.parse(style, target);

        /* _else func for attr where no data (flex="20" or text="red") */
        if (!source && attr !== 'class') {
            /* 
                variants _else func returning:
                [{sourse}, [values]] -> [{_prop:"color:$"}, ["red"]]
                [prop, [values]]     -> ["color:$", ["red"]]
                [{sourse}, value]    -> [{_prop:"color:$"}, "red"]
                [prop, value]        -> ["color:$", "red"]
                prop                 ->  "color:$"
            */

            const attrElseFunc = target._else

            if (!is.func(attrElseFunc)) return

            let result = attrElseFunc({ style, token, states });

            if (is.arr(result)) {
                let [src, val] = result

                if (is.obj(src)) {
                    source = src
                }
                else {
                    source = { _prop: src };
                }
                value = val || style;
            }
            else if (is.obj(result)) {
                source = result;
                value = style;
            }
            else {
                source = { _prop: result };
                value = style;
            }
        }
        

        if (!source) return;

        if (value) {
            if (is.func(source)) {
                declaration = source
            }
            else {
                declaration = source._prop
            }

            values = this.parseValue.parse(value, source);

            if (!values) return null;
        }
        else {
            declaration = source._one || source;
        }

        if (!declaration || is.obj(declaration)) return null

        
        if (is.str(declaration)) {
            declaration = declaration.trim()
        }

        return {
            src:    source,
            path:   path,
            prop:   declaration,
            values: values,
            rawVal: value,
            val:    values ? values.map((e) => e.val).join(source._join || ' ') : null,
            unit:   source._unit || '',
            join:   source._join || ' ',
            important,
        };
    }
}










// export function CreateStylesParser(ctx) {

//     const parseValue = CreateValueParser(ctx)
//     const parseRule = CreateRuleParser(ctx)

//     return function(style, attr, token, states) {

//         let object = ctx.attr[attr] || ctx.class;
//         let property = null;
//         let values = null;
//         let important = false;

//         if (style.includes("!")) {
//             style = style.replace(/!/g, '');
//             important = true
//         }

//         let { source, path, value } = parseRule(style, object);

//         if (!source && attr !== 'class') {
//             /*
//                 [{sourse}, [values]]
//                 [prop, [values]]
//                 [{sourse}, values]
//                 [prop, values]
//                 prop
//             */
//             let _else = object._else?.({style, token, states})

//             if (is.arr(_else)) {
//                 let [s, v] = _else || [null, null];
//                 source = is.obj(s) ? s : { _prop: s };
//                 value = v || style;
//             }
//             else if (is.obj(_else)) {
//                 source = _else;
//                 value = style;
//             }
//             else {
//                 source = { _prop: _else };
//                 value = style;
//             }
//         }

//         if (!source) return;

//         if (value) {
//             property = source._prop;
//             values = parseValue(value, source);

//             if (!values) {
//                 return null
//             }
//         } else {
//             property = source._one || source;
//         }

//         if (!property || is.obj(property)) {
//             return null;
//         }

//         return {
//             src: source,
//             path: path,
//             prop: property,
//             values: values,
//             rawVal: value,
//             val: values?.map((e) => e.val).join(source._join || ' ') || null,
//             unit: source._unit || '',
//             join: source._join || ' ',
//             important
//         };
//     }
// }
