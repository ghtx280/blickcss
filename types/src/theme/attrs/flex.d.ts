export function CreateAttrFlex(): {
    _name: string;
    _using: string;
    _else: (e: any) => {
        _prop: string;
        _unit: string;
    } | undefined;
    col: {
        _one: string;
        start: string;
        center: string;
        end: string;
        rev: string;
    };
    row: {
        _one: string;
        start: string;
        center: string;
        end: string;
        rev: string;
    };
    order: {
        _prop: string;
    };
    basis: {
        _prop: string;
    };
    center: string;
    space: string;
    evenly: string;
    around: string;
    stretch: string;
    grow: {
        _one: string;
        _prop: string;
    };
    shrink: {
        _one: string;
        _prop: string;
    };
    start: string;
    end: string;
    top: string;
    bottom: string;
    wrap: {
        _one: string;
        _prop: string;
        _vals: {
            rev: string;
        };
    };
    jc: {
        _prop: string;
        _vals: {
            c: string;
            bl: string;
            s: string;
            e: string;
            sb: string;
            sa: string;
            se: string;
        };
    };
    ji: {
        _prop: string;
        _vals: {
            c: string;
            bl: string;
            s: string;
            e: string;
            st: string;
        };
    };
    ac: {
        _prop: string;
        _vals: {
            c: string;
            bl: string;
            s: string;
            e: string;
            sb: string;
            sa: string;
            se: string;
        };
    };
    ai: {
        _prop: string;
        _vals: {
            c: string;
            bl: string;
            s: string;
            e: string;
            st: string;
        };
    };
};
