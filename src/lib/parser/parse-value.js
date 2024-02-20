// import context from '../../context.js';
import createColor from '../../helpers/create-color.js';
import { is } from '../check-type.js';

export class ValueParser {
    constructor(ctx) {
        this.ctx = ctx   
    }


    getItem(item = '', source = {}, index = 0) {
        const [first, second] = item.replace(/\\/g, '').split('/');
        const UNIT = source ? source._unit : '';
    
        if (!first) return;

        if (+second) {
            if (+first) {
                return +(first / second * 100).toFixed(2) + '%';
            }
            else {
                return createColor(this.ctx, first, second)
            }
        }
    
        if (is.var(first)) {
            return createColor(this.ctx, first)
        }
    
        if (is.arr(UNIT)) {
            return +item ? item + (UNIT[index] || "") : item;
        }
        
        return +item ? item + UNIT : item;
    }
    
    /*
      (num/num) 1/2 = 50%
      (var/num) $foo/50 = foo in blick.colors ? getVarColor(foo) : var(--foo);opacity:0.5 
      (str/num) red/50 = #ff000080
    
      (num) 15 = 15 + (unit || "")
      (var) $foo = var(--foo)
      (str) 5em = 5em
    */
    
    parse(value = '', source = {}) {
        if (!value) return null;
        const S = this.ctx.divisionSymbol
        const RE_SPLIT = new RegExp(`([^${S}\\\\])\\${S}`, 'g')
    
        if (!is.arr(value)) {  
            value = value.replace(RE_SPLIT, "$1\n").split("\n")
        }


        let values = value.map((item, index) => {
            const STATIC = source._vals ? source._vals[item] : null

            if (STATIC) {
                return { val: STATIC, raw: item };
            }

            const DYNAMIC = this.getItem(item, source, index)

            if (DYNAMIC) {
                return { val: DYNAMIC.replace(/\\/g, ''), raw: item };
            }
            
        });
    
        if (values.filter(e => e).length) {
            return values
        }
    
        return null
        
    }
}

// export function CreateValueParser(ctx) {

//     function createColor(color, opacity) {
        
//         try {
//             if (ctx._COLOR_) {
//                 return ctx._COLOR_(color, opacity);
//             }
//             // return getHex(color) + getHexAlpha(opacity);
//             return "hui"
//         } catch (error) {
//             console.log(error + "");
//             return null
//         }
        
//     }
    
//     function createVar(variable, opacity = '') {
//         if (is.var(variable)) {
//             variable = variable.slice(1);
//         }
//         if (opacity) {
//             opacity = `;opacity:${opacity}`;
//         }
    
//         return `var(--${variable})${opacity}`;
//     }
    
//     function calcOpacity(number) {
//         if (+number) {
//             return number > 1 ? number / 100 : number;
//         }
//     }
    
//     function getItem(item = '', source = {}, index = 0) {
//         const [first, second] = item.replaceAll('\\', '').split('/');
//         const UNIT = source?._unit || '';
    
//         if (!first) return;
    
//         if (second && +second) {
//             if (+first) {
//                 return +((first / second) * 100).toFixed(2) + '%';
//             }
    
//             if (is.var(first)) {
//                 const COLOR = getVarColor(first);
    
//                 if (COLOR) {
//                     return createColor(COLOR, second);
//                 }
    
//                 return createVar(first, calcOpacity(second));
//             }
    
//             return createColor(first, second);
//         }
    
//         if (is.var(first)) {
//             return createVar(first);
//         }
    
//         if (Array.isArray(UNIT)) {
//             return +item ? item + (UNIT[index] || "") : item;
//         }
        
//         return +item ? item + UNIT : item;
//     }
    
//     /*
//       (num/num) 1/2 = 50%
//       (var/num) $foo/50 = foo in blick.colors ? getVarColor(foo) : var(--foo);opacity:0.5 
//       (str/num) red/50 = #ff000080
    
//       (num) 15 = 15 + (unit || "")
//       (var) $foo = var(--foo)
//       (str) 5em = 5em
//     */
    
//     return function(value = '', source = {}) {
//         if (!value) return null;
    
//         if (!is.arr(value)) {
//             value = value.split(/(?<!\\)\+/g)
//         }
        
    
//         let fff = value.map((item, index) => {
//             return {
//                 val:
//                     source._vals?.[item] ??
//                     getItem(item, source, index)?.replace(/\\/g, ''),
//                 raw: item,
//             };
//         });
    
//         if (fff.filter(e => e.val).length) {
//             return fff
//         }
    
//         return null
        
//     }
// }
