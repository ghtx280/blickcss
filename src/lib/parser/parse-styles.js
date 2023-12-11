import { parseRule } from './parse-rule.js';
import { parseValue } from './parse-value.js';
import { is } from '../check-type.js';
import context from '../../context.js';

export function parseStyles(style, attr, token, states) {
    const ctx = context.get()
    
    let object = ctx.attr[attr] || ctx.class;
    let property = null;
    let values = null;
    let important = false;

    if (style.includes("!")) {
        style = style.replace(/!/g, '');
        important = true
    }    

    let { source, path, value } = parseRule(style, object);

    if (!source && attr !== 'class') {
        /* 
            [{sourse}, [values]]
            [prop, [values]]
            [{sourse}, values]
            [prop, values]
            prop
        */
        let _else = object._else?.({style, token, states})

        if (is.arr(_else)) {
            let [s, v] = _else || [null, null];
            source = is.obj(s) ? s : { _prop: s };
            value = v || style;
        }
        else if (is.obj(_else)) {
            source = _else;
            value = style;
        }
        else {
            source = { _prop: _else };
            value = style;
        }
    }

    if (!source) return;

    if (value) {
        property = source._prop;
        values = parseValue(value, source);
    
        if (!values) {
            return null
        }
    } else {
        property = source._one || source;
    }

    if (!property || is.obj(property)) {
        return null;
    }
    
    return {
        src: source,
        path: path,
        prop: property,
        values: values,
        rawVal: value,
        val: values?.map((e) => e.val).join(source._join || ' ') || null,
        unit: source._unit || '',
        join: source._join || ' ',
        important
    };
}
