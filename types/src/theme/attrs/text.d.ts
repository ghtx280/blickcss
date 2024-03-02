export function CreateAttrText(): {
    _name: string;
    _else: ({ style, states, token }: {
        style: any;
        states: any;
        token: any;
    }) => {
        _prop: string;
        _unit: string[];
        _values: any[];
    } | {
        _prop: string;
        _unit: string;
        _values: any[];
    } | {
        _prop: string;
        _unit: string;
        _values?: undefined;
    } | {
        _prop: string;
        _unit?: undefined;
        _values?: undefined;
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
    deleted: string;
    line: string;
    underline: string;
    overline: string;
    up: string;
    upper: string;
    low: string;
    lower: string;
    cap: string;
    capit: string;
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
