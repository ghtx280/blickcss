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
        
        return +item && UNIT ? item + UNIT: item;
    }
    
    /*
      (num/num) 1/2 = 50%
      (var/num) $foo/50 = foo in blick.colors ? #xxxxxxaa : var(--foo);opacity:0.5 
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
            item = item.toString()
            const STATIC = source._vals ? source._vals[item] : null

            if (STATIC) {
                return { val: STATIC, raw: item };
            }

            const DYNAMIC = this.getItem(item, source, index)

            if (DYNAMIC) {
                return { val: DYNAMIC.replace(/\\/g, ''), raw: item };
            }
            
        })
    
        if (values.filter(e => e).length) {
            return values
        }
    
        return null
    }
}