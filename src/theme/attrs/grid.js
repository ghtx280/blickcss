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
    _name: 'grid',
    _using: "display:grid",

    _else: function (e) {
        if (+e.style[0]) {
            return [{ _prop: 'gap:$', _unit: 'px' }];
        }
    },
    cols: {
        _prop: 'grid-template-columns:repeat($,1fr)',
    },
    rows: {
        _prop: 'grid-template-rows:repeat($,1fr)',
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
