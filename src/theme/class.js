import text_attr from "./attrs/text.js";

const w_vals = {
    full: '100%',
    half: '50%',
    min: 'min-content',
    fit: 'fit-content',
    max: 'max-content',
    screen: '100vw',
};
const h_vals = {
    full: '100%',
    half: '50%',
    min: 'min-content',
    fit: 'fit-content',
    max: 'max-content',
    screen: '100vh',
};
const c_vals = {
    c: 'center',
    bl: 'baseline',
    s: 'start',
    e: 'end',
    sb: 'space-between',
    sa: 'space-around',
    se: 'space-evenly',
};
const i_vals = {
    c: 'center',
    bl: 'baseline',
    s: 'start',
    e: 'end',
    st: 'stretch',
};

const classes = {
    m: {
        _prop: 'margin:$',
        _unit: 'px',
    },
    my: {
        _prop: 'margin-top:$1;margin-bottom:$2',
        _unit: 'px',
    },
    mx: {
        _prop: 'margin-left:$1;margin-right:$2',
        _unit: 'px',
    },
    mt: {
        _prop: 'margin-top:$',
        _unit: 'px',
    },
    mr: {
        _prop: 'margin-right:$',
        _unit: 'px',
    },
    mb: {
        _prop: 'margin-bottom:$',
        _unit: 'px',
    },
    ml: {
        _prop: 'margin-left:$',
        _unit: 'px',
    },
    ms: {
        _prop: 'margin-inline-start:$',
        _unit: 'px',
    },
    me: {
        _prop: 'margin-inline-end:$',
        _unit: 'px',
    },
    center: 'margin:auto',
    p: {
        _prop: 'padding:$',
        _unit: 'px',
    },
    py: {
        _prop: 'padding-top:$1;padding-bottom:$2',
        _unit: 'px',
    },
    px: {
        _prop: 'padding-left:$1;padding-right:$2',
        _unit: 'px',
    },
    pt: {
        _prop: 'padding-top:$',
        _unit: 'px',
    },
    pr: {
        _prop: 'padding-right:$',
        _unit: 'px',
    },
    pb: {
        _prop: 'padding-bottom:$',
        _unit: 'px',
    },
    pl: {
        _prop: 'padding-left:$',
        _unit: 'px',
    },
    ps: {
        _prop: 'padding-inline-start:$',
        _unit: 'px',
    },
    pe: {
        _prop: 'padding-inline-end:$',
        _unit: 'px',
    },
    space: {
        _prop: 'margin-left:$',
        _selector: '$>*+*',
        _unit: 'px',
        x: { _prop: 'margin-left:$', _selector: '$>*+*', _unit: 'px' },
        y: { _prop: 'margin-top:$', _selector: '$>*+*', _unit: 'px' },
    },
    b: {
        _prop: 'border-width:$',
        _unit: 'px',
    },
    bt: {
        _prop: 'border-top-width:$',
        _unit: 'px',
    },
    br: {
        _prop: 'border-right-width:$',
        _unit: 'px',
    },
    bb: {
        _prop: 'border-bottom-width:$',
        _unit: 'px',
    },
    bl: {
        _prop: 'border-left-width:$',
        _unit: 'px',
    },
    bc: {
        _prop: 'border-color:$',
        _vals: {
            f: '#fff',
            0: '#000',
            tp: 'transparent',
            cc: 'currentcolor',
        },
    },
    bs: {
        _prop: 'border-style:$',
    },
    border: {
        _one: 'border:1px solid',
        _prop: 'border:$',
        _unit: 'px',
    },
    outline: {
        _prop: 'outline:$',
        _unit: 'px',
    },
    fill: {
        _prop: 'fill:$',
        _vals: {
            f: '#fff',
            0: '#000',
            tp: 'transparent',
            cc: 'currentcolor',
        },
    },
    stroke: {
        _prop: 'stroke:$',
        _vals: {
            f: '#fff',
            0: '#000',
            tp: 'transparent',
            cc: 'currentcolor',
        },
    },
    unappearance: 'appearance:none',
    unapp: 'appearance:none',
    scale: {
        _prop: 'scale:$',
    },
    rotate: {
        _prop: 'rotate:$',
        _unit: 'deg',
    },
    translate: {
        _prop: 'translate:$',
        _unit: 'px',
    },
    skew: {
        _prop: 'transform:skew($)',
        _unit: 'deg',
        _join: ',',
        x: {
            _prop: 'transform:skewX($)',
            _unit: 'deg',
        },
        y: {
            _prop: 'transform:skewY($)',
            _unit: 'deg',
        },
    },
    flip: {
        _one: 'scale:-1 -1',
        _prop: 'scale:$',
        _vals: {
            x: '-1 1',
            y: '1 -1',
        },
    },
    clamp: {
        _prop: 'overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:$',
    },
    inset: {
        _prop: 'inset:$',
        x: { _prop: 'left:$;right:$' },
        y: { _prop: 'top:$;bottom:$' },
    },
    start: { _prop: 'inset-inline-start:$' },
    end: { _prop: 'inset-inline-end:$' },
    tf: {
        _prop: 'transform:$',
        sc: {
            _prop: 'transform:scale($)',
            _join: ',',
        },
        sc3d: {
            _prop: 'transform:scale3d($)',
            _join: ',',
        },
        scx: {
            _prop: 'transform:scaleX($)',
        },
        scy: {
            _prop: 'transform:scaleY($)',
        },
        scz: {
            _prop: 'transform:scaleZ($)',
        },
        rt: {
            _prop: 'transform:rotate($)',
            _unit: 'deg',
        },
        rt3d: {
            _prop: 'transform:rotate3d($)',
            _join: ',',
        },
        rtx: {
            _prop: 'transform:rotateX($)',
            _unit: 'deg',
        },
        rty: {
            _prop: 'transform:rotateY($)',
            _unit: 'deg',
        },
        rtz: {
            _prop: 'transform:rotateZ($)',
            _unit: 'deg',
        },
        tl: {
            _prop: 'transform:translate($)',
            _unit: 'px',
            _join: ',',
        },
        tl3d: {
            _prop: 'transform:translate3d($)',
            _join: ',',
        },
        tlx: {
            _prop: 'transform:translateX($)',
            _unit: 'px',
        },
        tly: {
            _prop: 'transform:translateY($)',
            _unit: 'px',
        },
        tlz: {
            _prop: 'transform:translateZ($)',
            _unit: 'px',
        },
        sk: {
            _prop: 'transform:skew($)',
            _unit: 'deg',
            _join: ',',
        },
        skx: {
            _prop: 'transform:skewX($)',
            _unit: 'deg',
        },
        sky: {
            _prop: 'transform:skewY($)',
            _unit: 'deg',
        },
    },
    w: {
        _prop: 'width:$',
        _vals: w_vals,
        _unit: 'px',
    },
    h: {
        _prop: 'height:$',
        _vals: h_vals,
        _unit: 'px',
    },
    sq: {
        _prop: 'width:$1;height:$2',
        _vals: { full: '100%' },
        _unit: 'px',
    },
    max: {
        w: {
            _prop: 'max-width:$',
            _vals: w_vals,
            _unit: 'px',
        },
        h: {
            _prop: 'max-height:$',
            _vals: h_vals,
            _unit: 'px',
        },
    },
    min: {
        w: {
            _prop: 'min-width:$',
            _vals: w_vals,
            _unit: 'px',
        },
        h: {
            _prop: 'min-height:$',
            _vals: h_vals,
            _unit: 'px',
        },
    },
    minW: {
        _prop: 'min-width:$',
        _vals: w_vals,
        _unit: 'px',
    },
    minH: {
        _prop: 'min-height:$',
        _vals: h_vals,
        _unit: 'px',
    },
    maxW: {
        _prop: 'max-width:$',
        _vals: w_vals,
        _unit: 'px',
    },
    maxH: {
        _prop: 'max-height:$',
        _vals: h_vals,
        _unit: 'px',
    },
    d: {
        _prop: 'display:$',
        _vals: {
            inblock: 'inline-block',
            inflex: 'inline-flex',
            ingrid: 'inline-grid',
        },
    },
    table: {
        _one: 'display:table',
        _prop: 'display:table-$',
    },
    inline: 'display:inline',
    block: 'display:block',
    inblock: 'display:inline-block',
    inflex: 'display:inline-flex',
    ingrid: 'display:inline-grid',
    hide: 'display:none',
    hidden: 'display:none',
    upper: 'text-transform:uppercase',
    uppercase: 'text-transform:uppercase',
    lower: 'text-transform:lowercase',
    lowercase: 'text-transform:lowercase',
    capit: 'text-transform:capitalize',
    capitalize: 'text-transform:capitalize',
    pos: {
        _prop: 'position:$',
    },
    static: 'position:static',
    abs: 'position:absolute',
    absolute: 'position:absolute',
    rel: 'position:relative',
    relative: 'position:relative',
    sticky: 'position:sticky',
    fixed: 'position:fixed',
    r: {
        _prop: 'border-radius:$',
        _unit: 'px',
    },
    round: {
        _one: 'border-radius:9999px',
        _prop: 'border-radius:$',
        _unit: 'px',
    },
    sharp: 'border-radius:0',
    transition: {
        _prop: 'transition:$',
        _unit: 'ms',
    },
    time: {
        _prop: 'transition:$',
        _unit: 'ms',
    },
    select: {
        _prop: 'user-select:$',
    },
    fit: {
        _prop: 'object-fit:$',
        top: 'object-position:top',
        bottom: 'object-position:bottom',
        center: 'object-position:center',
        left: {
            _one: 'object-position:left',
            _prop: 'object-position:left $',
        },
        right: {
            _one: 'object-position:right',
            _prop: 'object-position:right $',
        },
    },
    bg: {
        _prop: 'background:$',
        tp: 'background-color:transparent',
        cc: 'background-color:currentcolor',
        f: 'background-color:#fff',
        0: 'background-color:#000',
        fixed: 'background-attachment:fixed',
        local: 'background-attachment:local',
        scroll: 'background-attachment:scroll',
        clip: {
            border: 'background-clip:border-box',
            padding: 'background-clip:padding-box',
            content: 'background-clip:content-box',
            text: 'background-clip:text',
        },
        origin: {
            border: 'background-origin:border-box',
            padding: 'background-origin:padding-box',
            content: 'background-origin:content-box',
        },
    },
    bgp: {
        _prop: 'background-position:$',
        x: { _prop: 'background-position-x:$' },
        y: { _prop: 'background-position-y:$' },
    },
    c: {
        _prop: 'color:$',
        _vals: {
            f: '#fff',
            0: '#000',
            tp: 'transparent',
            cc: 'currentcolor',
        },
    },
    accent: {
        _prop: 'accent-color:$',
        _vals: {
            f: '#fff',
            0: '#000',
            tp: 'transparent',
            cc: 'currentcolor',
        },
    },
    caret: {
        _prop: 'caret-color:$',
        _vals: {
            f: '#fff',
            0: '#000',
            tp: 'transparent',
            cc: 'currentcolor',
        },
    },
    over: {
        _prop: 'overflow:$',
        x: {
            _prop: 'overflow-x:$',
        },
        y: {
            _prop: 'overflow-y:$',
        },
    },
    snap: {
        x: 'scroll-snap-type:x mandatory',
        y: 'scroll-snap-type:y mandatory',
        start: 'scroll-snap-align:start',
        center: 'scroll-snap-align:center',
        end: 'scroll-snap-align:end',
        stop: 'scroll-snap-stop: always',
    },
    shadow: {
        box: {
            _prop: 'box-shadow:$',
            _one: 'box-shadow:3px 4px 3px #0000004d',
            _unit: 'px',
        },
        text: {
            _prop: 'text-shadow:$',
            _one: 'text-shadow:3px 4px 3px #0000004d',
            _unit: 'px',
        },
    },
    cursor: {
        _prop: 'cursor:$', 
    },
    resize: {
        _prop: 'resize:$',
        _vals: {
            x: 'horizontal',
            y: 'vertical',
        },
    },
    top: {
        _prop: 'top:$',
        _unit: 'px',
    },
    right: {
        _prop: 'right:$',
        _unit: 'px',
    },
    bottom: {
        _prop: 'bottom:$',
        _unit: 'px',
    },
    left: {
        _prop: 'left:$',
        _unit: 'px',
    },
    ratio: {
        _prop({ src, rawVal, val }) {
            return `aspect-ratio:${
                +rawVal[0] ? rawVal.split("/").join(" / ") : val
            }`;
        },
        _vals: {
            sqr: '1 / 1',
            vid: '16 / 9',
        },
    },
    box: {
        _prop: 'box-sizing:$',
        _vals: {
            content: 'content-box',
            border: 'border-box',
        },
        decoration: { _prop: 'box-decoration-break:$' },
    },

    float: {
        _prop: 'float:$',
    },
    clear: {
        _prop: 'clear:$',
        _vals: {
            x: 'horizontal',
            y: 'vertical',
        },
    },
    z: {
        _prop: 'z-index:$',
    },
    visible: 'visibility:visible',
    invisible: 'visibility:hidden',
    collapse: 'visibility:collapse',
    opacity: {
        _prop: ({ val }) => `opacity:${val > 1 ? val / 100 : val}`,
    },
    blend: {
        _prop: 'mix-blend-mode:$',
    },
    hue: {
        _prop: 'filter:hue-rotate($)',
        _unit: 'deg',
    },
    invert: {
        _one: 'filter:invert(1)',
        _prop: 'filter:invert($)',
    },
    blur: {
        _prop: 'filter:blur($)',
        _unit: 'px',
    },
    brightness: {
        _prop: 'filter:brightness($)',
    },
    contrast: {
        _prop: 'filter:contrast($)',
    },
    saturate: {
        _prop: 'filter:saturate($)',
    },
    grayscale: {
        _prop: 'filter:grayscale($)',
        _unit: '%',
    },
    sepia: {
        _prop: 'filter:sepia($)',
        _unit: '%',
    },
    isolate: 'isolation:isolate',
    isolation: { _prop: 'isolation:$' },
    pointer: 'cursor:pointer',
    ws: {
        _prop: 'white-space:$',
    },
    list: {
        _prop: 'list-style:$',
        item: 'display:list-item',
    },
    spacing: {
        _prop: 'letter-spacing:$',
        _unit: 'px',
    },
    fs: {
        _prop: 'font-size:$',
        _unit: 'px',
    },
    fsz: {
        _prop: 'font-size:$',
        _unit: 'px',
    },
    fst: {
        _prop: 'font-style:$',
    },
    italic: 'font-style:italic',
    fw: {
        _prop: 'font-weight:$',
    },
    extrathin: 'font-weight:100',
    thin: 'font-weight:200',
    light: 'font-weight:300',
    regular: 'font-weight:400',
    medium: 'font-weight:500',
    semibold: 'font-weight:600',
    bold: 'font-weight:700',
    extrabold: 'font-weight:800',
    fv: {
        _prop: 'font-variant:$',
    },
    ff: {
        _prop: 'font-family:$',
        _vals: {
            sans: 'var(--font-sans)',
            serif: 'var(--font-serif)',
            mono: 'var(--font-mono)',
        },
    },
    lh: {
        _prop: 'line-height:$',
    },
    ta: {
        _prop: 'text-align:$',
    },
    underline: 'text-decoration:underline',
    td: {
        _prop: 'text-decoration:$',
        _vals: {
            line: 'underline',
        },
        _unit: 'px',
    },
    wb: {
        _prop: 'word-break:$',
        _vals: {
            all: 'break-all',
            keep: 'keep-all',
        },
    },
    break: {
        _prop: 'word-break:$',
        _vals: {
            all: 'break-all',
            keep: 'keep-all',
        },
        after: { _prop: 'break-after:$' },
        before: { _prop: 'break-before:$' },
        inside: { _prop: 'break-inside:$' },
    },
    grad: {
        _prop: 'background:linear-gradient($)',
        _unit: 'deg',
        _join: ',',
    },
    fullscreen: 'position:absolute;left:0;top:0;width:100%;height:100%',
    flex: {
        _one: 'display:flex',
        _prop({ val, rawVal, src }) {
            if (rawVal in src._vals) {
                return "flex:" + val
            }
            return "gap:" + val;
        },
        _vals: {
            1: '1 1 0%',
            auto: '1 1 auto',
            initial: '0 1 auto',
        },
        _unit: 'px',
        center: 'justify-content:center;align-items:center',
        col: {
            _one: 'flex-direction:column',
            rev: 'flex-direction:column-reverse',
        },
        row: {
            _one: 'flex-direction:row',
            rev: 'flex-direction:row-reverse',
        },
        space: 'justify-content:space-between;align-items:center',
        evenly: 'justify-content:space-evenly;align-items:center',
        around: 'justify-content:space-around;align-items:center',
        wrap: {
            _one: 'flex-wrap:wrap',
            rev: 'flex-wrap:wrap-reverse',
        },
        nowrap: 'flex-wrap:nowrap',
        stretch: 'align-items:stretch',
        start: {
            _one: "justify-content:flex-start",
            top: "justify-content:flex-start;align-items:flex-start",
            center: "justify-content:flex-start;align-items:center",
            bottom: "justify-content:flex-start;align-items:flex-end",
        },
        end: {
            _one: "justify-content:flex-end",
            top: "justify-content:flex-end;align-items:flex-start",
            center: "justify-content:flex-end;align-items:center",
            bottom: "justify-content:flex-end;align-items:flex-end",
        },
        top: {
            _one:   "align-items:flex-start",
            start: "justify-content:flex-start;align-items:flex-start",
            center: "justify-content:center;align-items:flex-start",
            end: "justify-content:flex-end;align-items:flex-start",
        },
        bottom: {
            _one:   "align-items:flex-end",
            start: "justify-content:flex-start;align-items:flex-end",
            center: "justify-content:center;align-items:flex-end",
            end: "justify-content:flex-end;align-items:flex-end",
        },
    },
    col: {
        _one: 'flex-direction:column',
        rev: 'flex-direction:column-reverse',
        _prop: 'grid-column:$',
        span: {
            _prop: 'grid-column:span $ / span $',
            full: 'grid-column:1 / -1',
        },
        start: { _prop: 'grid-column-start:$' },
        end: { _prop: 'grid-column-end:$' },
    },
    row: {
        _one: 'flex-direction:row',
        rev: 'flex-direction:row-reverse',
        _prop: 'grid-row:$',
        span: {
            _prop: 'grid-row:span $ / span $',
            full: 'grid-row:1 / -1',
        },
        start: { _prop: 'grid-row-start:$' },
        end: { _prop: 'grid-row-end:$' },
    },
    flow: {
        _prop: 'grid-auto-flow:$',
        _vals: {
            col: 'column',
            'col-dense': 'column dense',
            'row dense': 'row dense',
        },
    },
    auto: {
        cols: {
            _prop: 'grid-auto-columns:$',
            _vals: {
                min: 'min-content',
                max: 'max-content',
                fr: 'minmax(0,1fr)',
            },
        },
        rows: {
            _prop: 'grid-auto-rows:$',
            _vals: {
                min: 'min-content',
                max: 'max-content',
                fr: 'minmax(0,1fr)',
            },
        },
    },
    gap: {
        _prop: 'gap:$',
        _unit: 'px',
        x: {
            _prop: 'column-gap:$',
            _unit: 'px',
        },
        y: {
            _prop: 'row-gap:$',
            _unit: 'px',
        },
    },
    jc: {
        _prop: 'justify-content:$',
        _vals: c_vals,
    },
    ji: {
        _prop: 'justify-items:$',
        _vals: i_vals,
    },
    js: {
        _prop: 'justify-self:$',
        _vals: i_vals,
    },
    ac: {
        _prop: 'align-content:$',
        _vals: c_vals,
    },
    ai: {
        _prop: 'align-items:$',
        _vals: i_vals,
    },
    as: {
        _prop: 'align-self:$',
        _vals: i_vals,
    },
    order: {
        _prop: 'order:$',
        _vals: {
            first: '-9999',
            last: '9999',
            n_one: '0',
        },
    },
    basis: {
        _prop: 'flex-basis:$',
    },
    grow: {
        _one: 'flex-grow:1',
        _prop: 'flex-grow:$',
    },
    shrink: {
        _one: 'flex-shrink:1',
        _prop: 'flex-shrink:$',
    },
    grid: {
        _one: 'display:grid',
        cols: {
            _prop: 'grid-template-columns:repeat($,1fr)',
        },
        rows: {
            _prop: 'grid-template-rows:repeat($,1fr)',
        },
    },
    sw: {
        _prop: 'stroke-width: $',
        _unit: 'px',
    },
    text: {
        _prop: function({rawVal}){
           
            let [v1, v2, v3] = rawVal.split('/');

            if (+v1[0] && v3) {
                    return {
                        _prop: `font-size:$1;font-weight:$2;line-height:$3`,
                        _values: [ v1, v2, v3 ]
                    };
            }
            if (+v1[0] && v2) {
                return {
                    _prop: `font-size:$1;font-weight:$2`,
                    _values: [ v1, v2 ]
                };
            }
            if (+v1[0]) {
                return 'font-size:$1'
            }
            
    
            return 'color:$'
        },
        _unit: ["px", "", "px"],
        ...text_attr
    }
};

classes.object = classes.fit;
classes.overflow = classes.over;
classes.op = classes.opacity;

export default classes;
