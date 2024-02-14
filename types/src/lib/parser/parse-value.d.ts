export class ValueParser {
    constructor(ctx: any);
    ctx: any;
    getItem(item?: string, source?: {}, index?: number): string | null | undefined;
    parse(value?: string, source?: {}): any;
}
