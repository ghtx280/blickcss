export function CreateAttrs(): {
    flex: {
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
    grid: {
        _name: string;
        _using: string;
        _else: (e: any) => {
            _prop: string;
            _unit: string;
        }[] | undefined;
        cols: {
            _prop: string;
        };
        rows: {
            _prop: string;
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
    text: {
        _name: string;
        _else: ({ style, states, token }: {
            style: any;
            states: any;
            token: any;
        }) => "color:$" | (any[] | {
            _prop: string;
            _unit: string[];
        })[] | (any[] | {
            _prop: string;
            _unit: string;
        })[] | {
            _prop: string;
            _unit: string;
        };
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        nowrap: string;
        light: string;
        regular: string;
        medium: string;
        semibold: string;
        bold: string;
        extrabold: string;
        tp: string;
        thin: string;
        normal: string;
        bolder: string;
        italic: string;
        delete: string;
        line: string;
        overline: string;
        up: string;
        low: string;
        cap: string;
        center: string;
        left: string;
        right: string;
        justify: string;
        mono: string;
        serif: string;
        sans: string;
        vertical: string;
        wrap: string;
        dots: string;
        cols: {
            _prop: string;
        };
        lh: {
            _prop: string;
        };
        wg: {
            _prop: string;
        };
        font: {
            _prop: string;
        };
        align: {
            _prop: string;
        };
        space: {
            _prop: string;
        };
        shadow: {
            _one: string;
            _prop: string;
            _unit: string;
        };
        stroke: {
            _prop: string;
            _unit: string;
        };
        break: {
            _prop: string;
            _vals: {
                all: string;
                keep: string;
            };
        };
    };
};
