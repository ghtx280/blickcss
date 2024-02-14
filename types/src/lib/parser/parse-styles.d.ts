export class StylesParser {
    constructor(ctx: any);
    ctx: any;
    parseValue: ValueParser;
    parseRule: RuleParser;
    parse(style: any, attr: any, token: any, states: any): {
        src: any;
        path: any[];
        prop: any;
        values: any;
        rawVal: any;
        val: any;
        unit: any;
        join: any;
        important: boolean;
    } | null | undefined;
}
import { ValueParser } from './parse-value.js';
import { RuleParser } from './parse-rule.js';
