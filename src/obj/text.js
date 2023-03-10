export default {
  tp: { one: 'color:transparent!important' },
  cols: { prop: 'columns:$' },
  lh: { prop: 'line-height:$', def:"" },
  bold: { one: 'font-weight:bold' },
  bolder: { one: 'font-weight:bolder' },
  wg: { prop: 'font-weight:$', def:"" },
  thin: { one: 'font-weight:lighter' },
  normal: { one: 'font-weight:normal' },
  italic: { one: 'font-style: italic' },
  delete: { one: 'text-decoration-line:line-through' },
  line: { one: 'text-decoration-line:underline' },
  overline: { one: 'text-decoration-line:overline' },
  up: { one: 'text-transform:uppercase' },
  low: { one: 'text-transform:lowercase' },
  cap: { one: 'text-transform:capitalize' },
  center: { one: 'text-align:center' },
  left: { one: 'text-align:left' },
  right: { one: 'text-align:right' },
  justify: { one: 'text-align:justify' },
  mono: { one: 'font-family:var(--font-mono)' },
  serif: { one: 'font-family:var(--font-serif)' },
  sans: { one: 'font-family:var(--font-sans)' },
  font: { prop: 'font-family:$' },
  vertical: { one: 'writing-mode:vertical-lr' },
  wrap: { one: 'word-wrap:break-word' },
  dots: { one: 'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%' },
  align: { prop: 'vertical-align:$' },
  space: { prop: 'white-space:$' },
  shadow: {
    one: 'text-shadow:3px 3px 2px #0000004d',
    prop: 'text-shadow:$',
    def: 'px',
  },
  stroke: {
    prop: '-webkit-text-stroke:$',
    def: 'px',
  },
  break: {
    prop: 'word-break:$',
    vals: { all: 'break-all', keep: 'keep-all', }
  },
}