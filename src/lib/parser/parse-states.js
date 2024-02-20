// import context from '../../context.js';
import { escape } from '../../helpers/escape.js';
import { is } from '../check-type.js';
import { MediaParser } from './parse-media.js';

export class StatesParser {
    constructor(ctx) {
        this.ctx = ctx;
        this.parseMedia = new MediaParser(ctx)
    }

    parse(state, attr) {
        const IS_IN_ARR = state in this.ctx.screen;
        const IS_MAX_WD = state.startsWith(this.ctx.maxPrefix);
        const IS_NUMBER = +state;

        let raw = state;
        let val = null;
        let type = null;

        if (IS_IN_ARR || IS_NUMBER || IS_MAX_WD) {
            val = this.parseMedia.parse(state);
            type = 'media';
        } else {
            if (raw.startsWith('&')) {
                val = raw.slice(1);
            } else {
                val = this.ctx.states[raw] || ':' + raw;
            }
            if (is.str(val)) {
                // val = val.replace(/(?<!\\)_/g, ' ');
                val = escape(val, "_").replace(" ")
            }

            type = 'pseudo';
        }
        return { raw, val, type };
    }
}

// export function CreateStatesParser(ctx){

//     const parseMedia = new MediaParser(ctx)

//     return function(state, attr) {

//         const IS_IN_ARR = state in ctx.screen;
//         const IS_MAX_WD = state.startsWith(ctx.maxPrefix);
//         const IS_NUMBER = +state;

//         let raw = state;
//         let val = null;
//         let type = null;

//         if (IS_IN_ARR || IS_NUMBER || IS_MAX_WD) {
//             val = parseMedia(state);
//             type = 'media';
//         } else {
//             if (raw.startsWith('&')) {
//                 val = raw.slice(1);
//             } else {
//                 val = ctx.states[raw] || ':' + raw;
//             }
//             if (is.str(val)) {
//                 val = val.replace(/(?<!\\)_/g, ' ');
//             }

//             type = 'pseudo';
//         }
//         return { raw, val, type };
//     }
// }
