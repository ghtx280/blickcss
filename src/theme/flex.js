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
  col: {
    one: 'flex-direction:column',
    vals: {
      start: 'flex-direction:column;align-items:flex-start',
      center: 'flex-direction:column;align-items:center',
      end: 'flex-direction:column;align-items:flex-end',
      rev: 'flex-direction:column-reverse'
    }
  },
  row: {
    one: 'flex-direction:row',
    vals: {
      start: 'flex-direction:row;justify-content:flex-start',
      center: 'flex-direction:row;justify-content:center',
      end: 'flex-direction:row;justify-content:flex-end',
      rev: 'flex-direction:row-reverse'
    }
  },
  order: { prop: 'order:$',def:'' },
  basis: { prop: 'flex-basis:$' },
  center: 'justify-content:center;align-items:center' ,
  space: 'justify-content:space-between;align-items:center' ,
  stretch: 'align-items:stretch' ,
  grow: { one: 'flex-grow:1', prop: 'flex-grow:$',def:'' },
  shrink: { one: 'flex-shrink:1', prop: 'flex-shrink:$',def:'' },
  wrap: {
    one: 'flex-wrap:wrap',
    prop: 'flex-wrap:$',
    vals: { rev: 'wrap-reverse' }
  },
  jc: {
    prop: 'justify-content:$',
    vals: c_vals
  },
  ji: {
    prop: 'justify-items:$',
    vals: i_vals
  },
  ac: {
    prop: 'align-content:$',
    vals: c_vals
  },
  ai: {
    prop: 'align-items:$',
    vals: i_vals
  },
}