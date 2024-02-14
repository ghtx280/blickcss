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
        rawSelector: any;
        token: string;
        extra: any;
        create(): {
            media: any[] | null;
            selector: any;
            styles: any[];
            css(): string;
        } | null | undefined;
    } | null;
}
import { StatesParser } from './parse-states.js';
import { StylesParser } from './parse-styles.js';
