export function createRule(STRUCT: any): {
    media: any[] | null;
    selector: any;
    styles: any[];
    css(): string;
} | null | undefined;
