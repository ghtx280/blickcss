export class Parser {
    constructor(ctx: any);
    ctx: any;
    parseStates: StatesParser;
    parseStyles: StylesParser;
    parse(token?: string, attr?: string): {
        states: string[];
        styles: string;
        attr: string;
        selector: any;
        token: string;
        extra: any;
        create(): {
            media: any[] | null;
            selector: any;
            styles: string[];
            css(): string;
        } | null;
    } | null;
}
import { StatesParser } from './parse-states.js';
import { StylesParser } from './parse-styles.js';
