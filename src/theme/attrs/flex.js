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

export default {
    _name: 'flex',
    _using: "display:flex",

    _else: function (e) {
        if (!isNaN(+e.style[0])) {
            return { _prop: 'gap:$', _unit: 'px' };
        }
    },
    col: {
        _one: 'flex-direction:column',
        start: 'flex-direction:column;align-items:flex-start',
        center: 'flex-direction:column;align-items:center',
        end: 'flex-direction:column;align-items:flex-end',
        rev: 'flex-direction:column-reverse',
    },
    row: {
        _one: 'flex-direction:row',
        start: 'flex-direction:row;justify-content:flex-start',
        center: 'flex-direction:row;justify-content:center',
        end: 'flex-direction:row;justify-content:flex-end',
        rev: 'flex-direction:row-reverse',
    },
    order: { _prop: 'order:$1' },
    basis: { _prop: 'flex-basis:$' },
    center: 'justify-content:center;align-items:center',
    space: 'justify-content:space-between;align-items:center',
    evenly: 'justify-content: space-evenly;align-items:center',
    around: 'justify-content: space-around;align-items:center',
    stretch: 'align-items:stretch',
    grow: { _one: 'flex-grow:1', _prop: 'flex-grow:$' },
    shrink: { _one: 'flex-shrink:1', _prop: 'flex-shrink:$' },

    start:  "justify-content: flex-start",
    end:    "justify-content: flex-end",
    top:    "align-items: flex-start",
    bottom: "align-items: flex-end",

    wrap: {
        _one: 'flex-wrap:wrap',
        _prop: 'flex-wrap:$',
        _vals: { rev: 'wrap-reverse' },
    },
    jc: {
        _prop: 'justify-content:$',
        _vals: c_vals,
    },
    ji: {
        _prop: 'justify-items:$',
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
};
