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
        let target = null;
        let declaration = null;
        let values = null;
        let important = false;
        let parsed_value = null

        if (attr == "class") {
            target = this.ctx.class
        }
        else {
            target = this.ctx.attr[attr]
        }

        style = style.replace(/!/g, () => {
            important = true
            return ""
        })
            
        let { source, path, value } = this.parseRule.parse(style, target);

        const params = {
            token,
            style,
            path,
            value,
            source,
            attr,
            important,
            parseValue: (src) => this.parseValue.parse(value, src)
        }

        /* _else func for attr where no data (flex="20" or text="red") */
        if (!source && attr !== 'class') {
            /* 
                { sourse } -> { _prop: "color:$" } 
                one -> "color: red" 
            */
            if (!is.func(target._else)) return null
            source = target._else(params);
        }

        if (!source) return;

        
        // convert function to source
        if (is.func(source)) {
            source = source(params)
            
            if (!source) return;

            if (value) {
                let rule = this.parseRule.parse(value, source)
            
                if (rule.source) {
                    value = rule.value
                    source = rule.source
                    path.push(...rule.path)
                }
            }
        }
        
        if (value) {
            declaration = source._prop || source
            values = this.parseValue.parse(source._values || value, source);


            if (!values) return null;
        }
        else {
            declaration = source._one || source;
        }

        if (!is.str(declaration)) return null

        declaration = declaration.toString().trim()

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
