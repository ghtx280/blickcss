import context from '../../context.js';
import { getHexAlpha, getVarColor, getHex } from '../../theme/funcs.js';
import { is } from '../check-type.js';

function createColor(color, opacity) {
    const ctx = context.get()
    
    try {
        if (ctx._COLOR_) {
            return ctx._COLOR_(color, opacity);
        }
        return getHex(color) + getHexAlpha(opacity);
    } catch (error) {
        console.log(error + "");
        return null
    }
    
}

function createVar(variable, opacity = '') {
    if (is.var(variable)) {
        variable = variable.slice(1);
    }
    if (opacity) {
        opacity = `;opacity:${opacity}`;
    }

    return `var(--${variable})${opacity}`;
}

function calcOpacity(number) {
    if (+number) {
        return number > 1 ? number / 100 : number;
    }
}

function getItem(item = '', source = {}, index = 0) {
    const [first, second] = item.replaceAll('\\', '').split('/');
    const UNIT = source?._unit || '';

    if (!first) return;

    if (second && +second) {
        if (+first) {
            return +((first / second) * 100).toFixed(2) + '%';
        }

        if (is.var(first)) {
            const COLOR = getVarColor(first);

            if (COLOR) {
                return createColor(COLOR, second);
            }

            return createVar(first, calcOpacity(second));
        }

        return createColor(first, second);
    }

    if (is.var(first)) {
        return createVar(first);
    }

    if (Array.isArray(UNIT)) {
        return +item ? item + (UNIT[index] || "") : item;
    }
    
    return +item ? item + UNIT : item;
}

/*
  (num/num) 1/2 = 50%
  (var/num) $foo/50 = foo in blick.colors ? getVarColor(foo) : var(--foo);opacity:0.5 
  (str/num) red/50 = #ff000080

  (num) 15 = 15 + (unit || "")
  (str) 5em = 5em
*/

export function parseValue(value = '', source = {}) {
    if (!value) return null;

    if (!is.arr(value)) {
        value = value.split(/(?<!\\)\+/g)
    }
    

    let fff = value.map((item, index) => {
        return {
            val:
                source._vals?.[item] ??
                getItem(item, source, index)?.replace(/\\/g, ''),
            raw: item,
        };
    });

    if (fff.filter(e => e.val).length) {
        return fff
    }

    return null
    
}
