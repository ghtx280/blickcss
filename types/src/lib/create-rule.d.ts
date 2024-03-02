export function createRule(STRUCT: any): {
    media: any[] | null;
    selector: any;
    styles: string[];
    css(): string;
} | null;
