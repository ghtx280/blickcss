export class StatesParser {
    constructor(ctx: any);
    ctx: any;
    parseMedia: MediaParser;
    parse(state: any, attr: any): {
        raw: any;
        val: any;
        type: string;
    };
}
import { MediaParser } from './parse-media.js';
