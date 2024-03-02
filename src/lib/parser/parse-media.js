// import context from '../../context.js';
import sendError from '../../helpers/send-error.js';
import { is } from '../check-type.js';
import { createMediaWidth } from '../create-media-width.js';

export class MediaParser {
    constructor(ctx) {
        this.ctx = ctx
    }

    parse(str) {
        if (!str) return sendError(`value is required, (${str})`);


        if (str.startsWith(this.ctx.maxPrefix)) {
            str = str.slice(this.ctx.maxPrefix.length);
            const val = this.ctx.screen[str] || str
            return [null, is.arr(val) ? val[1] : val]
        }

        const sizes = this.ctx.screen[str] || str

        if (!is.arr(sizes)) {
            return [this.ctx.screen[str] || str, null]
        }
        
        return sizes
        
    
        // if (str.startsWith(this.ctx.maxPrefix)) {
        //     str = str.slice(this.ctx.maxPrefix.length);
        //     return createMediaWidth([null, this.ctx.screen[str] || str]);
        // }
    
        // return createMediaWidth(this.ctx.screen[str] || str);
    }
}







//  function CreateMediaParser(ctx) {
//     return function(str) {
//         // const ctx = context.get()
        
//         if (!str) throw new Error(`value is required, (${str})`);
    
//         if (str.startsWith(ctx.maxPrefix)) {
//             str = str.slice(ctx.maxPrefix.length);
//             return createMediaWidth([null, ctx.screen[str] || str]);
//         }
    
//         return createMediaWidth(ctx.screen[str] || str);
//     }
// }