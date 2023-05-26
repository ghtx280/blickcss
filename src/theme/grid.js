const c_vals = {
  c: 'center',
  bl: 'baseline',
  s: 'start',
  e: 'end',
  sb: 'space-between',
  sa: 'space-around',
  se: 'space-evenly',
}
const i_vals = {
  c: 'center',
  bl: 'baseline',
  s: 'start',
  e: 'end',
  st: 'stretch',
}

export default {
  cols: {
    prop: 'grid-template-columns:repeat($,1fr)', def:''
  },
  rows: {
    prop: 'grid-template-rows:repeat($,1fr)', def:''
  },
  jc: {
    prop: 'justify-content:$', vals: c_vals
  },
  ji: {
    prop: 'justify-items:$', vals: i_vals
  },
  ac: {
    prop: 'align-content:$', vals: c_vals
  },
  ai: {
    prop: 'align-items:$', vals: i_vals
  },
}