/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// NAMESPACE OBJECT: ./src/theme/funcs.js
var funcs_namespaceObject = {};
__webpack_require__.r(funcs_namespaceObject);
__webpack_require__.d(funcs_namespaceObject, {
  calcVal: () => (calcVal),
  config: () => (config),
  css: () => (css),
  format: () => (funcs_format),
  getColor: () => (getColor),
  getShade: () => (getShade),
  hex: () => (hex)
});

;// CONCATENATED MODULE: ./src/theme/class.js
const w_vals = {
  full: "100%",
  half: "50%",
  min: "min-content",
  fit: "fit-content",
  max: "max-content",
  screen: "100vw"
}
const h_vals = {
  full: "100%",
  half: "50%",
  min: "min-content",
  fit: "fit-content",
  max: "max-content",
  screen: "100vh"
}
const c_vals = {
  c: "center",
  bl: "baseline",
  s: "start",
  e: "end",
  sb: "space-between",
  sa: "space-around",
  se: "space-evenly"
}
const i_vals = {
  c: "center",
  bl: "baseline",
  s: "start",
  e: "end",
  st: "stretch"
}

const classes = {
  m: {
    prop: "margin:$",
    def: "px"
  },
  my: {
    prop: "margin-top:$;margin-bottom:$",
    def: "px"
  },
  mx: {
    prop: "margin-left:$;margin-right:$",
    def: "px"
  },
  mt: {
    prop: "margin-top:$",
    def: "px"
  },
  mr: {
    prop: "margin-right:$",
    def: "px"
  },
  mb: {
    prop: "margin-bottom:$",
    def: "px"
  },
  ml: {
    prop: "margin-left:$",
    def: "px"
  },
  ms: {
    prop: "margin-inline-start:$",
    def: "px"
  },
  me: {
    prop: "margin-inline-end:$",
    def: "px"
  },
  center: "margin:auto",
  p: {
    prop: "padding:$",
    def: "px"
  },
  py: {
    prop: "padding-top:$;padding-bottom:$",
    def: "px"
  },
  px: {
    prop: "padding-left:$;padding-right:$",
    def: "px"
  },
  pt: {
    prop: "padding-top:$",
    def: "px"
  },
  pr: {
    prop: "padding-right:$",
    def: "px"
  },
  pb: {
    prop: "padding-bottom:$",
    def: "px"
  },
  pl: {
    prop: "padding-left:$",
    def: "px"
  },
  ps: {
    prop: "padding-inline-start:$",
    def: "px"
  },
  pe: {
    prop: "padding-inline-end:$",
    def: "px"
  },
  space:{
    prop:"margin-left:$", _s:">*+*", def:"px",
    x:{ prop:"margin-left:$", _s:">*+*", def:"px" },
    y:{ prop:"margin-top:$",  _s:">*+*", def:"px" },
  },
  b: {
    prop: "border-width:$",
    def: "px"
  },
  bt: {
    prop: "border-top-width:$",
    def: "px"
  },
  br: {
    prop: "border-right-width:$",
    def: "px"
  },
  bb: {
    prop: "border-bottom-width:$",
    def: "px"
  },
  bl: {
    prop: "border-left-width:$",
    def: "px"
  },
  bc: {
    prop: "border-color:$",
    vals: {
      f: "#fff",
      0: "#000",
      tp: "transparent",
      cc: "currentcolor"
    }
  },
  bs: {
    prop: "border-style:$"
  },
  border: {
    one: "border:1px solid",
    prop: "border:$",
    def: "px"
  },
  outline: {
    prop: "outline:$",
    def: "px"
  },
  fill: {
    prop: "fill:$",
    vals: {
      f: "#fff",
      0: "#000",
      tp: "transparent",
      cc: "currentcolor"
    }
  },
  stroke: {
    prop: "stroke:$",
    vals: {
      f: "#fff",
      0: "#000",
      tp: "transparent",
      cc: "currentcolor"
    }
  },
  unappearance: "appearance:none",
  unapp: "appearance:none",
  scale: {
    prop: "scale:$"
  },
  rotate: {
    prop: "rotate:$",
    def: "deg"
  },
  translate: {
    prop: "translate:$",
    def: "px"
  },
  skew: {
    prop: "transform:skew($)",
    def: "deg",
    join: ",",
    x: {
      prop: "transform:skewX($)",
      def: "deg"
    },
    y: {
      prop: "transform:skewY($)",
      def: "deg"
    }
  },
  flip: {
    one: "scale:-1 -1",
    prop: "scale:$",
    vals: {
      x: "-1 1",
      y: "1 -1"
    }
  },
  clamp: {
    prop: "overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:$"
  },
  inset: {
    prop:  "inset:$",
    x: { prop:"left:$;right:$"},
    y: { prop:"top:$;bottom:$"},
  },
  start: {prop:"inset-inline-start:$"},
  end: {prop:"inset-inline-end:$"},
  tf: {
    prop: "transform:$",
    sc: {
      prop: "transform:scale($)"
    },
    sc3d: {
      prop: "transform:scale3d($)",
      join: ","
    },
    scx: {
      prop: "transform:scaleX($)"
    },
    scy: {
      prop: "transform:scaleY($)"
    },
    scz: {
      prop: "transform:scaleZ($)"
    },
    rt: {
      prop: "transform:rotate($)",
      def: "deg"
    },
    rt3d: {
      prop: "transform:rotate3d($)",
      join: ","
    },
    rtx: {
      prop: "transform:rotateX($)",
      def: "deg"
    },
    rty: {
      prop: "transform:rotateY($)",
      def: "deg"
    },
    rtz: {
      prop: "transform:rotateZ($)",
      def: "deg"
    },
    tl: {
      prop: "transform:translate($)",
      def: "px"
    },
    tl3d: {
      prop: "transform:translate3d($)",
      join: ","
    },
    tlx: {
      prop: "transform:translateX($)",
      def: "px"
    },
    tly: {
      prop: "transform:translateY($)",
      def: "px"
    },
    tlz: {
      prop: "transform:translateZ($)",
      def: "px"
    },
    sk: {
      prop: "transform:skew($)",
      def: "deg",
      join: ","
    },
    skx: {
      prop: "transform:skewX($)",
      def: "deg"
    },
    sky: {
      prop: "transform:skewY($)",
      def: "deg"
    }
  },
  w: {
    prop: "width:$",
    vals: w_vals,
    def: "px"
  },
  h: {
    prop: "height:$",
    vals: h_vals,
    def: "px"
  },
  sq: {
    prop:"width:$;height:$",
    def:"px"
  },
  max: {
    w: {
      prop: "max-width:$",
      vals: w_vals,
      def: "px"
    },
    h: {
      prop: "max-height:$",
      vals: h_vals,
      def: "px"
    }
  },
  min: {
    w: {
      prop: "min-width:$",
      vals: w_vals,
      def: "px"
    },
    h: {
      prop: "min-height:$",
      vals: h_vals,
      def: "px"
    }
  },
  minW: {
    prop: "min-width:$",
    vals: w_vals,
    def: "px"
  },
  minH: {
    prop: "min-height:$",
    vals: h_vals,
    def: "px"
  },
  maxW: {
    prop: "max-width:$",
    vals: w_vals,
    def: "px"
  },
  maxH: {
    prop: "max-height:$",
    vals: h_vals,
    def: "px"
  },
  d: {
    prop: "display:$",
    vals: {
      inblock: "inline-block",
      inflex:  "inline-flex",
      ingrid:  "inline-grid"
    }
  },
  table:{
    one: 'display:table',
    prop:"display:table-$"
  },
  inline: "display:inline",
  block: "display:block",
  inblock: "display:inline-block",
  inflex: "display:inline-flex",
  ingrid: "display:inline-grid",
  hide: "display:none",
  hidden: "display:none",
  upper: "text-transform:uppercase",
  uppercase: "text-transform:uppercase",
  lower: "text-transform:lowercase",
  lowercase: "text-transform:lowercase",
  capit: "text-transform:capitalize",
  capitalize: "text-transform:capitalize",
  pos: {
    prop: "position:$"
  },
  static: "position:static",
  abs: "position:absolute",
  absolute: "position:absolute",
  rel: "position:relative",
  relative: "position:relative",
  sticky: "position:sticky",
  fixed: "position:fixed",
  r: {
    prop: "border-radius:$",
    def: "px"
  },
  round: {
    one: "border-radius:9999px",
    prop: "border-radius:$",
    def: "px"
  },
  sharp: "border-radius:0",
  transition: {
    prop: "transition:$",
    def: "ms"
  },
  time: {
    prop: "transition:$",
    def: "ms"
  },
  select: {
    prop: "user-select:$"
  },
  fit: {
    prop: "object-fit:$",
    top:	'object-position:top',
    bottom:	'object-position:bottom',
    center:	'object-position:center',
    left:	{
      one:'object-position:left',
      prop:"object-position:left $"
    },
    right:	{
      one:'object-position:right',
      prop:"object-position:right $"
    },
  },
  bg: {
    prop: "background:$",
    tp: "background-color:transparent",
    cc: "background-color:currentcolor",
    f: "background-color:#fff",
    0: "background-color:#000",
    fixed: "background-attachment:fixed",
    local: "background-attachment:local",
    scroll: "background-attachment:scroll",
    clip: {
      border: "background-clip:border-box",
      padding: "background-clip:padding-box",
      content: "background-clip:content-box",
      text: "background-clip:text",
    },
    origin: {
      border: "background-origin:border-box",
      padding: "background-origin:padding-box",
      content: "background-origin:content-box"
    }
  },
  bgp: {
    prop:"background-position:$",
    x: { prop:"background-position-x:$" },
    y: { prop:"background-position-y:$" }
  },
  c: {
    prop: "color:$",
    vals: {
      f: "#fff",
      0: "#000",
      tp: "transparent",
      cc: "currentcolor",
      
    },
    
  },
  accent: {
    prop: "accent-color:$",
    vals: {
      f: "#fff",
      0: "#000",
      tp: "transparent",
      cc: "currentcolor"
    }
  },
  caret: {
    prop: "caret-color:$",
    vals: {
      f: "#fff",
      0: "#000",
      tp: "transparent",
      cc: "currentcolor"
    }
  },
  over: {
    prop: "overflow:$",
    x: {
      prop: "overflow-x:$"
    },
    y: {
      prop: "overflow-y:$"
    }
  },
  snap: {
    x: "scroll-snap-type:x mandatory",
    y: "scroll-snap-type:y mandatory",
    start: "scroll-snap-align:start",
    center: "scroll-snap-align:center",
    end: "scroll-snap-align:end",
    stop: "scroll-snap-stop: always"
  },
  shadow: {
    box: {
      prop: "box-shadow:$",
      one: "box-shadow:3px 4px 3px #0000004d",
      def: "px"
    },
    text: {
      prop: "text-shadow:$",
      one: "text-shadow:3px 4px 3px #0000004d",
      def: "px"
    }
  },
  cursor: {
    prop: "cursor:$"
  },
  resize: {
    prop: "resize:$",
    vals: {
      x: "horizontal",
      y: "vertical"
    }
  },
  top: {
    prop: "top:$",
    def: "px"
  },
  right: {
    prop: "right:$",
    def: "px"
  },
  bottom: {
    prop: "bottom:$",
    def: "px"
  },
  left: {
    prop: "left:$",
    def: "px"
  },
  ratio: {
    prop: ({val}) => `aspect-ratio:${val}`,
    vals: {
      sqr: "1 / 1",
      vid: "16 / 9"
    }
  },
  box: {
    prop: "box-sizing:$",
    vals: {
      content: "content-box",
      border: "border-box"
    },
    decoration: { prop:"box-decoration-break:$" },
  },
  
  float: {
    prop: "float:$"
  },
  clear: {
    prop: "clear:$",
    vals: {
      x: "horizontal",
      y: "vertical"
    }
  },
  z: {
    prop: "z-index:$"
  },
  visible:"visibility:visible",
  invisible: "visibility:hidden",
  collapse: "visibility:collapse",
  opacity: {
    prop: "opacity:$"
  },
  blend: {
    prop: "mix-blend-mode:$"
  },
  hue: {
    prop: "filter:hue-rotate($)",
    def: "deg"
  },
  invert: {
    one: "filter:invert(1)",
    prop: "filter:invert($)"
  },
  blur: {
    prop: "filter:blur($)",
    def: "px"
  },
  brightness: {
    prop: "filter:brightness($)"
  },
  contrast: {
    prop: "filter:contrast($)"
  },
  saturate: {
    prop: "filter:saturate($)"
  },
  contrast: {
    prop: "filter:contrast($)"
  },
  grayscale: {
    prop: "filter:grayscale($)",
    def: "%"
  },
  sepia: {
    prop: "filter:sepia($)",
    def: "%"
  },
  isolate: "isolation:isolate",
  isolation: { prop:"isolation:$" },
  pointer: "cursor:pointer",
  ws: {
    prop: "white-space:$"
  },
  list: {
    prop: "list-style:$",
    item: 'display:list-item'
  },
  spacing:{
    prop:'letter-spacing:$',
    def:'px'
  },
  fs: {
    prop: "font-size:$",
    def: "px"
  },
  fsz: {
    prop: "font-size:$",
    def: "px"
  },
  fst: {
    prop: "font-style:$"
  },
  italic:"font-style:italic",
  fw: {
    prop: "font-weight:$"
  },
  light:"font-weight:300",
  regular:"font-weight:400",
  medium: "font-weight:500",
  semibold: "font-weight:600",
  bold: "font-weight:700",
  extrabold: "font-weight:800",
  fv: {
    prop: "font-variant:$"
  },
  ff: {
    prop: "font-family:$",
    vals: {
      sans: "var(--font-sans)",
      serif: "var(--font-serif)",
      mono: "var(--font-mono)"
    }
  },
  lh: {
    prop: "line-height:$"
  },
  ta: {
    prop: "text-align:$"
  },
  underline: "text-decoration:underline",
  td: {
    prop: "text-decoration:$",
    vals: {
      line: "underline"
    },
    def: "px"
  },
  wb: {
    prop: "word-break:$",
    vals: {
      all: "break-all",
      keep: "keep-all"
    }
  },
  break: {
    prop: "word-break:$",
    vals: {
      all: "break-all",
      keep: "keep-all"
    },
    after:  { prop: "break-after:$"  },
    before: { prop: "break-before:$" },
    inside: { prop: "break-inside:$" },

  },
  grad: {
    prop: "background:linear-gradient($)",
    def: "deg",
    join: ","
  },
  fullscreen: "position:absolute;left:0;top:0;width:100%;height:100%",
  flex: {
    one: "display:flex",
    prop:"flex:$",
    vals:{
      1: "1 1 0%",
      auto: "1 1 auto",
      initial: "0 1 auto",
    },
    center: "justify-content:center;align-items:center",
    col:{
      one:"flex-direction:column",
      rev:"flex-direction:column-reverse"
    },
    row:{
      one: "flex-direction:row",
      rev: "flex-direction:row-reverse",
    },
    space: "justify-content:space-between;align-items:center",
    wrap:{
      one: "flex-wrap:wrap",
      rev: "flex-wrap:wrap-reverse",
    },
    nowrap: "flex-wrap:nowrap",
    stretch: "align-items:stretch"

  },
  col: {
    one: "flex-direction:column",
    rev: "flex-direction:column-reverse",
    prop:'grid-column:$',
    span: {
      prop:"grid-column:span $ / span $",
      full:"grid-column:1 / -1"
    },
    start: { prop:"grid-column-start:$" },
    end:   { prop:"grid-column-end:$" },
    
  },
  row: {
    one: "flex-direction:row",
    rev: "flex-direction:row-reverse",
    prop:'grid-row:$',
    span: {
      prop:"grid-row:span $ / span $",
      full:"grid-row:1 / -1"
    },
    start: { prop:"grid-row-start:$" },
    end:   { prop:"grid-row-end:$" },
  },
  flow:{
    prop:"grid-auto-flow:$",
    vals:{
      col:"column",
      "col-dense":'column dense',
      "row dense":'row dense'
    }
  },
  auto:{
    cols:{
      prop:"grid-auto-columns:$",
      vals:{
        min: "min-content",
        max: "max-content",
        fr:	 "minmax(0,1fr)",
      }
    },
    rows:{
      prop:"grid-auto-rows:$",
      vals:{
        min: "min-content",
        max: "max-content",
        fr:	 "minmax(0,1fr)",
      }
    }
  },
  gap: {
    prop: "gap:$",
    def: "px",
    x: {
      prop: "column-gap:$",
      def: "px"
    },
    y: {
      prop: "row-gap:$",
      def: "px"
    }
  },
  jc: {
    prop: "justify-content:$",
    vals: c_vals
  },
  ji: {
    prop: "justify-items:$",
    vals: i_vals
  },
  js: {
    prop: "justify-self:$",
    vals: i_vals
  },
  ac: {
    prop: "align-content:$",
    vals: c_vals
  },
  ai: {
    prop: "align-items:$",
    vals: i_vals
  },
  as: {
    prop: "align-self:$",
    vals: i_vals
  },
  order: {
    prop: "order:$",
    vals:{
      first: "-9999",
      last: "9999",
      none: "0",
    }
  },
  basis: {
    prop: "flex-basis:$"
  },
  grow: {
    one: "flex-grow:1",
    prop: "flex-grow:$"
  },
  shrink: {
    one: "flex-shrink:1",
    prop: "flex-shrink:$"
  },
  grid: {
    one: "display:grid",
    cols: {
      prop: "grid-template-columns:repeat($,1fr)"
    },
    rows: {
      prop: "grid-template-rows:repeat($,1fr)"
    }
  }
};

classes.object   = classes.fit
classes.overflow = classes.over

/* harmony default export */ const theme_class = (classes);
;// CONCATENATED MODULE: ./src/theme/flex.js
const flex_c_vals = {
  c: 'center',
  bl: 'baseline',
  s: 'start',
  e: 'end',
  sb: 'space-between',
  sa: 'space-around',
  se: 'space-evenly',
}
const flex_i_vals = {
  c: 'center',
  bl: 'baseline',
  s: 'start',
  e: 'end',
  st: 'stretch',
}

/* harmony default export */ const flex = ({
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
    vals: flex_c_vals
  },
  ji: {
    prop: 'justify-items:$',
    vals: flex_i_vals
  },
  ac: {
    prop: 'align-content:$',
    vals: flex_c_vals
  },
  ai: {
    prop: 'align-items:$',
    vals: flex_i_vals
  },
});
;// CONCATENATED MODULE: ./src/theme/grid.js
const grid_c_vals = {
  c: 'center',
  bl: 'baseline',
  s: 'start',
  e: 'end',
  sb: 'space-between',
  sa: 'space-around',
  se: 'space-evenly',
}
const grid_i_vals = {
  c: 'center',
  bl: 'baseline',
  s: 'start',
  e: 'end',
  st: 'stretch',
}

/* harmony default export */ const grid = ({
  cols: {
    prop: 'grid-template-columns:repeat($,1fr)', def:''
  },
  rows: {
    prop: 'grid-template-rows:repeat($,1fr)', def:''
  },
  jc: {
    prop: 'justify-content:$', vals: grid_c_vals
  },
  ji: {
    prop: 'justify-items:$', vals: grid_i_vals
  },
  ac: {
    prop: 'align-content:$', vals: grid_c_vals
  },
  ai: {
    prop: 'align-items:$', vals: grid_i_vals
  },
});
;// CONCATENATED MODULE: ./src/theme/text.js
/* harmony default export */ const theme_text = ({
  tp:       'color:transparent!important',
  thin:     'font-weight:lighter',
  normal:   'font-weight:normal',
  bold:     'font-weight:bold',
  bolder:   'font-weight:bolder',
  italic:   'font-style: italic',
  delete:   'text-decoration-line:line-through',
  line:     'text-decoration-line:underline',
  overline: 'text-decoration-line:overline',
  up:       'text-transform:uppercase',
  low:      'text-transform:lowercase',
  cap:      'text-transform:capitalize',
  center:  'text-align:center',
  left:    'text-align:left',
  right:   'text-align:right',
  justify: 'text-align:justify',
  mono:    'font-family:var(--font-mono)',
  serif:   'font-family:var(--font-serif)',
  sans:    'font-family:var(--font-sans)',
  vertical: 'writing-mode:vertical-lr' ,
  wrap:     'word-wrap:break-word',
  dots:     'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%',
  cols:    { prop: 'columns:$',        def:"" },
  lh:      { prop: 'line-height:$',    def:"" },
  wg:      { prop: 'font-weight:$',    def:"" },
  font:    { prop: 'font-family:$',    def:"" },
  align:   { prop: 'vertical-align:$', def:"" },
  space:   { prop: 'white-space:$',    def:"" },
  shadow:  {
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
    vals: { all: 'break-all', keep: 'keep-all', },
    def:""
  }
});
;// CONCATENATED MODULE: ./src/theme/screen.js
/* harmony default export */ const screen = ({
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
});
;// CONCATENATED MODULE: ./src/theme/states.js
/* harmony default export */ const states = ({
  h: `:hover`,
  f: `:focus`,
  c: `:checked`,
  a: `:active`,
  first: `>*:first-child`,
  last: `>*:last-child`,
  odd: `>*:nth-child(odd)`,
  even: `>*:nth-child(even)`,
  ft: `>*:first-child`,
  lt: `>*:last-child`,
  od: `>*:nth-child(odd)`,
  ev: `>*:nth-child(even)`,
  all: ` *`,
  "*": ` *`,
  every: `>*`,
  ">": `>*`,
  bt: `>*+*`,
  between: `>*+*`,
  aft: `::after`,
  bef: `::before`,
  after: `::after`,
  before: `::before`,
});
;// CONCATENATED MODULE: ./src/theme/attr.js
/* harmony default export */ const attr = ({
  text: "text",
  flex: "flex",
  grid: "grid"
});
;// CONCATENATED MODULE: ./src/theme/colors.js
/* harmony default export */ const colors = ({
  black:  { def: "#000" },
  white:  { def: "#fff" },
  gray:   { def: "#6b7280", 1: "#f3f4f6", 2: "#d1d5db", 3: "#374151", 4: "#111827" }, 
  red:    { def: "#ef4444", 1: "#fee2e2", 2: "#fca5a5", 3: "#b91c1c", 4: "#7f1d1d" }, 
  orange: { def: "#f97316", 1: "#ffedd5", 2: "#fdba74", 3: "#c2410c", 4: "#7c2d12" }, 
  yellow: { def: "#eab308", 1: "#fef9c3", 2: "#fde047", 3: "#a16207", 4: "#713f12" }, 
  lime:   { def: "#84cc16", 1: "#ecfccb", 2: "#bef264", 3: "#4d7c0f", 4: "#365314" }, 
  green:  { def: "#22c55e", 1: "#dcfce7", 2: "#86efac", 3: "#15803d", 4: "#14532d" }, 
  cyan:   { def: "#06b6d4", 1: "#cffafe", 2: "#67e8f9", 3: "#0e7490", 4: "#164e63" }, 
  blue:   { def: "#3b82f6", 1: "#dbeafe", 2: "#93c5fd", 3: "#1d4ed8", 4: "#1e3a8a" }, 
  purple: { def: "#a855f7", 1: "#f3e8ff", 2: "#d8b4fe", 3: "#7e22ce", 4: "#581c87" }, 
  pink:   { def: "#ec4899", 1: "#fce7f3", 2: "#f9a8d4", 3: "#be185d", 4: "#831843" }, 
  
});
;// CONCATENATED MODULE: ./src/theme/font.js
/* harmony default export */ const font = ({
  main: "system-ui,-apple-system,sans-serif",
  serif: "serif",
  mono: "monospace",
  sans: "sans-serif"
});
;// CONCATENATED MODULE: ./src/theme/reset.js
/* harmony default export */ const theme_reset = (`*,::after,::before{text-decoration:none;object-fit:cover;box-sizing:border-box;-webkit-tap-highlight-color:transparent;font-feature-settings:"pnum" on,"lnum" on;outline:0;border:0;margin:0;padding:0;border-style:solid;color:inherit}h1,h2,h3,h4,h5,h6{font-size:var(--fsz);font-weight:700;line-height:1.2}h1{--fsz:2.5rem}h2{--fsz:2rem}h3{--fsz:1.75rem}h4{--fsz:1.5rem}h5{--fsz:1.25rem}h6{--fsz:1rem}a{color:inherit}hr{width:100%;margin:20px 0;border-top:1px solid #aaa}ul[role="list"],ol[role="list"]{list-style:none}html:focus-within{scroll-behavior:smooth}body{text-rendering:optimizeSpeed;font-family:var(--font-main)}a:not([class]){text-decoration-skip-ink:auto}img,picture{max-width:100%;vertical-align:middle}input,button,textarea,select{font:inherit}[hidden]{display:none}option{color:#000;background-color:#fff}.theme-dark{background-color:#222}.theme-dark *{color:#fff}`);
 
// normalize_css
//export default `html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}details,main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline dotted}b,strong{font-weight:bolder}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{color:inherit;display:table;max-width:100%;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio],legend{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}[hidden],template{display:none}`

;// CONCATENATED MODULE: ./src/funcs/calc-val.js
// import blick from "../blick-obj.js";






/* harmony default export */ function calc_val(val, sel = {}, model = "class") {
  if (!sel.p && typeof sel === "object") {
    sel.p = sel;
  }

  if (val) {
    return val
      .split(/(?<!\\)\+/g)
      .map((item) => {
        item = item.replaceAll("\\", "");

        if (item.includes("/")) {
          const [n1, n2] = item.split("/");
          if (isNaN(n1[0])) {
            if (/^(\w|#)/.test(n1)) {
              return hex(n1) + getShade(n2)
            }
            else if(n1.startsWith("$")){
              let color = getColor(n1.slice(1))
              if (color) {
                return hex(color) + getShade(n2)
              }
              else return `var(--${n1.slice(1)});opacity:${n2}`;
            }
            else return `${n1};opacity:${n2}`
          }
          else return parseFloat(((n1 / n2) * 100).toFixed(2)) + "%";
        }
        else if (item.startsWith("$")) {
          return `var(--${item.slice(1)})`;
        }
        else {
          const defaultValue = sel.p?.def ?? (model !== "class" ? "px" : "");
          return !isNaN(item) ? item + defaultValue : item;
        }
      })
      .join(sel.p?.join ?? " ")
      .replaceAll(/(?<!\\)_/g, " ");
  } else {
    return "";
  }
}

;// CONCATENATED MODULE: ./src/funcs/create-val.js


/* harmony default export */ function create_val(sel, model) {
  if (!sel.v) {
    if (typeof sel.p === "string") {
      return sel.p
    }
    else if(typeof sel.p === "function") {
      return sel.p()
    }
    else return sel.p?.one
  }
  else if (sel.p) {
    if(typeof sel.p === "function") {
      return sel.p({
        prop:sel.s?.prop,
        val:sel.v,
        sel:sel.s,
      })  
    }
    else if (sel.p.prop) {
      if (typeof sel.p.prop === "function") {
        return sel.p.prop({
          prop:sel.p?.prop,
          val:sel.p?.vals?.[sel?.v] || sel?.v || "",
          sel:sel.p,
          rawVal:sel?.v
        })
      }
      else {
        return sel.p.prop.replaceAll("$", sel.p.vals?.[sel.v] ?? calc_val(sel.v, sel, model)) 
      }
    }
    else {
      return sel.p.vals?.[sel.v]
    }
  }
  else {
    if (model === 'class') {
      return false
    }
    else if (model === 'text') {
      if (parseFloat(sel.v)) return `font-size:${calc_val(sel.v, false, model)}`
      else return `color:${calc_val(sel.v, false, model)}`
    }
    else {
      return `gap:${calc_val(sel.v, false, model)}`
    }
  }
}
;// CONCATENATED MODULE: ./src/funcs/format.js
/* harmony default export */ function format(str, model = "class") {
  let format = str;
  
  format = format
  .replace(/[^\w-_]/g, '\\$&')
  .replace(/^\d/, '\\3$& ')

  if (model === "raw") {
    return format
  }

  if (model === 'class') {
    return `.${format}`;
  } else {
    return `[${model}~="${str}"]`;
  }
};

;// CONCATENATED MODULE: ./src/funcs/val-path.js


/* harmony default export */ function val_path(obj, path) {
  let parts = path.split("-");
  let value = obj || blick_obj["class"];
  let prop
  let prevProp

  for (const i in parts) {
    const part = parts[i];
    value = value[part]

    if (!value) {
      let val = parts.slice(i).join("-");
      return { p: prop, v: val, s: prevProp } 
    }

    prevProp = prop
    prop = value
  }
  return { p: prop, v: false };
}
;// CONCATENATED MODULE: ./src/funcs/create-css.js





/* harmony default export */ function create_css(str, model, B_STYLE_STORE, B_MQ_STORE, B_MQ_ARR) {
  let prStr   = str
  let imp     = str.includes('!') ? str = str.replaceAll('!', '') : false
  let sp      = str.split(':')  
  let state   = sp.length !== 1 ? sp.slice(0,sp.length - 1) : false 
  let autoState  
  let dec = sp
    .at(-1)
    .split(';')
    .map(el => create_val(autoState = val_path(blick_obj[model], el), model, str))
    .join(";")

  autoState = autoState.p?._s || ""

  if (dec === "false") {
    return false;
  }

  if (imp) {
    dec += '!important';
  }

  if (!B_STYLE_STORE && !B_MQ_STORE && !B_MQ_ARR) {
    return dec;
  }

  const selector = format(prStr, blick_obj.attr[model] || 'class') + autoState

  if (state) {
    const mq_states = []
    const ps_states = []

    for (const st of state) {
      if (B_MQ_ARR.includes(st)) {
        mq_states.push(st);
      } else {
        ps_states.push(st);
      }
    }

    const str_state = ps_states.map(st => 
      (st.startsWith("&") ? st.slice(1).replaceAll(/(?<!\\)_/g, " ") : false)
      || blick_obj.states[st] 
      || ":" + st
    ).join("")
    
    if (mq_states.length) {
      for (const sc of mq_states) {
        B_MQ_STORE[sc][((sc === "dark" && !blick_obj.autoTheme) ? blick_obj.dark + " " : "") + selector + str_state] = dec
      }
    }
    else B_STYLE_STORE[selector + str_state] = dec
  }
  else B_STYLE_STORE[selector] = dec 
}
;// CONCATENATED MODULE: ./src/theme/funcs.js






function config(updates, source = this, isFirstCall = true) {
  if (typeof updates !== 'object') throw new Error('BlickCSS. The blick.config function must contain an object.');
  for (let key in updates) {
    if (typeof updates[key] === 'object' && updates[key] !== null && !Array.isArray(updates[key])) {
      if (!source[key] || typeof source[key] == "string") {
        source[key] = {};
      }
      this.config(updates[key], source[key], false);
    } else {
      source[key] = updates[key];
    }
  }
  if (isFirstCall) {
    // code on use config
  }
  return source;
}

function hex(str){
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = str;
  const color = ctx.fillStyle
  canvas.remove()
  return color
}

function getColor(str) {
  const [colorName, shade] = str.split('-');

  if (colors == undefined) {
    colors
  }

  if (shade !== undefined) {
    if (colors.hasOwnProperty(colorName) && colors[colorName].hasOwnProperty(shade)) {
      return colors[colorName][shade];
    }
  }

  return colors[colorName]?.["def" || 0];
}

function getShade(str) {
  let shade = Math.round(+str / 100 * 255).toString(16);
  if (shade.length === 1) {
    shade = "0" + shade
  }
  return shade
}

const calcVal = calc_val
const css = create_css
const funcs_format = format
;// CONCATENATED MODULE: ./src/blick-obj.js













/* harmony default export */ const blick_obj = ({
  class:theme_class,
  flex: flex,
  grid: grid,
  text: theme_text,
  screen: screen,
  states: states,
  attr: attr,
  colors: colors,
  font: font,
  reset: theme_reset,
  
  autoTheme: false,
  root: true,
  time: false,
  wrapper:'.wrapper',
  useAttr:true,
  beautify:false,
  beautifyOption:{},
  maxPrefix:'m',
  dark:".theme-dark",
  autoFlex:true,

  ...funcs_namespaceObject
});


;// CONCATENATED MODULE: ./src/style-tag.js
const B_STYLE_TAG = document.createElement('style')
B_STYLE_TAG.id = 'BLICK_OUTPUT'
document.head.append(B_STYLE_TAG)

/* harmony default export */ const style_tag = (B_STYLE_TAG);
;// CONCATENATED MODULE: ./src/funcs/get-kf.js
/* harmony default export */ function get_kf(obj) {
  if (!("keyframes" in obj)) return ""
  
  obj = obj.keyframes

  if (typeof obj !== "object") throw new Error("BlickCss. Keyframes must be written as an object");

  return Object.entries(obj)
  .map(
    ([key,val]) => `@keyframes ${key}{${
      Object.entries(val)
      .map(([p,c]) => `${isNaN(p)?p:`${p}%`}{${c}}`)
      .join("")
    }}`
  )
  .join("")
}
;// CONCATENATED MODULE: ./src/store.js


let B_MQ_ARR
let B_MQ_STORE
let B_MQ_STRING
let B_MQ_STR_COPY


let B_STYLE_STORE = Object.create(null)
let B_ATTRS_STORE = {
    class: [],
    flex:  [], 
    text:  [],
    grid:  [],  
  }

function F_SET_STORES() {
	F_SET_STORES = false


	B_MQ_STORE = Object.fromEntries([
		...(Object.keys(blick_obj?.screen).map(e=>[e,{}])),
		...(Object.keys(blick_obj?.screen).map(e=>[blick_obj.maxPrefix+'-'+e,{}])),
		["dark",{}]
	])
	
	B_MQ_ARR = Object.keys(B_MQ_STORE)
	B_MQ_STRING = Object.fromEntries(Object.keys(B_MQ_STORE).map(e=>[e,""]))
	B_MQ_STR_COPY = {...B_MQ_STRING} 
}





;// CONCATENATED MODULE: ./src/funcs/get-mq.js



/* harmony default export */ function get_mq(mq) {
  let str = ""

  const getScr = (scr, raw) => {
    const f = (str, st) => isNaN((str+"")[0]) ? str : `${st}-width:${str}`;
    const u = num => isNaN(+num) ? num : `${num}px`

    if (typeof scr === "object") {
      const [min, max] = scr
      if (raw) {
        return u(max || min)
      }
      return `(${f(u(min),"min")})${max ? ` and (${f(u(max),"max")})` : ""}`
    }
    else {
      if (raw) {
        return  u((scr+"").replaceAll(/[()]/g, "").split(":").at(-1))
      }
      return scr[0] === "(" ? scr : `(${f(u(scr),"min")})`
    }
  }

  for (const k in B_MQ_STORE) {
    if (k.startsWith(blick_obj.maxPrefix + '-')) {
      if (mq[k]) {
        const scr = blick_obj.screen[k.slice(blick_obj.maxPrefix.length + 1)]
        str += `@media (max-width:${getScr(scr, true)}){${mq[k]}}`
      }
    }
    else {
      if (blick_obj.screen[k]) {
        if (mq[k] || blick_obj.wrapper) {
          const scr = blick_obj.screen[k]
          str += `@media ${getScr(scr)}{${
            blick_obj.wrapper ? `${blick_obj.wrapper}{max-width:${getScr(scr, true)}}` : ""
          }${mq[k]}}`
        }
      }
    }
  }
  
  return str
}
;// CONCATENATED MODULE: ./src/funcs/get-root.js
/* harmony default export */ function get_root(blick) {
  let fonts = ''
  let colors = ''

  for (const [type, val] of Object.entries(blick.font)) {
    fonts += `--font-${type}:${val};`
  }
  for (const [color, obj] of Object.entries(blick.colors)) {
    for (const [num, code] of Object.entries(obj)) {
      colors += `--${color+(num==='def'?'':'-'+num)}:${code};`
    }
  }
  return `:root{${ colors + fonts }}`
}
;// CONCATENATED MODULE: ./src/funcs/upd-style.js






const B_VERSION = '1.2.8' 
let B_ROOT
let B_KEYFRAMES

/* harmony default export */ function upd_style(B_STYLE_STRING, B_MQ_STRING) {
  B_ROOT      ||= get_root(blick_obj)
  B_KEYFRAMES ||= get_kf(blick_obj)

  const B_CSS_RESULT =
  `/* ! blickcss v${B_VERSION} | MIT License | https://blick.netlify.app */\n`
  + (blick_obj.reset || "") 
  + (blick_obj.root  ? B_ROOT : "")
  + (
    blick_obj.useAttr 
    ? `[${blick_obj.attr.flex}]:not([${blick_obj.attr.flex}~=off]){display:flex}`
    + `[${blick_obj.attr.grid}]:not([${blick_obj.attr.grid}~=off]){display:grid}` 
    : ""
  )
  + (blick_obj.autoFlex ? '[class*="flex-"],[class*="jc-"],[class*="ai-"],[class*="gap-"]{display:flex}' : "")
  + (
    blick_obj.wrapper 
    ? `${blick_obj.wrapper}{width:100%;margin:0 auto;padding-left:var(--wrapper-padding,15px);padding-right:var(--wrapper-padding,15px)}` 
    : ""
  )
  + B_STYLE_STRING
  + get_mq(B_MQ_STRING)
  + (blick_obj.autoTheme ? `@media(prefers-color-scheme:dark){${B_MQ_STRING.dark}}` : B_MQ_STRING.dark) 
  + B_KEYFRAMES

  let prevContext

  if (blick_obj.time) {
    prevContext = style_tag.textContent
  }

  if (blick_obj.beautify) { 
    if (!window.css_beautify) {
      throw new Error("BlickCSS. css_beautify is not defined. Make sure the 'css-beautify' is connected. Read docs for more info https://blick.netlify.app/docs/beautify")
    }
    style_tag.textContent = window.css_beautify(B_CSS_RESULT, blick_obj.beautifyOption)
  }
  else {
    style_tag.textContent = B_CSS_RESULT
  }

  if (blick_obj.time) {
    return prevContext !== style_tag.textContent
  }
}
;// CONCATENATED MODULE: ./src/funcs/check-rec.js
/* harmony default export */ function check_rec(rec) {
  if (rec === undefined) return true;

  const elems = ["STYLE", "SCRIPT", "HEAD", "#text"];

  function B_CHECK_ELEM(el) {
    return (
      !elems.includes(el?.nodeName) &&
      !!(
        el?.getAttribute("class") ||
        el?.getAttribute(blick.attr.flex) ||
        el?.getAttribute(blick.attr.text) ||
        el?.getAttribute(blick.attr.grid)
      )
    );
  }

  if (rec.length !== 1) return true;
  if (B_CHECK_ELEM(rec[0].target) && !rec[0].addedNodes) return true;
  if (rec[0].addedNodes.length > 1) return true;
  if (B_CHECK_ELEM(rec[0].addedNodes[0])) return true;
}

;// CONCATENATED MODULE: ./src/funcs/render.js








let B_STYLE_STRING = ""
let B_MQ_STR = B_MQ_STRING

function timer(label) {
  const startTime = performance.now();
  return {
    stop: function() {
      const endTime = performance.now();
      const elapsedTime = endTime - startTime;
      console.log(`${label}: ${elapsedTime.toFixed(1)}ms`);
    },
  };
}


/* harmony default export */ function render(record) {
  if (!document.body) return
  if (!(check_rec(record) || !style_tag.textContent)) return
  if (F_SET_STORES) F_SET_STORES()
  
  let nodes = document.querySelectorAll(
  `[class],[${blick_obj.attr.flex}],[${blick_obj.attr.text}],[${blick_obj.attr.grid}]`
  )

  if (!nodes.length) return
    
  let consoleTimer

  if (blick_obj.time) consoleTimer = timer('blick. styles upd')

  for (const elem of nodes) {
    for (const model in B_ATTRS_STORE) {
      let attr = blick_obj.attr[model] || 'class'
      if (elem.hasAttribute(attr)) {
        for (const str of elem.getAttribute(attr).trim().split(' ').filter(el => el)){
          if (!B_ATTRS_STORE[model].includes(str)) {
            create_css(str, model, B_STYLE_STORE, B_MQ_STORE, B_MQ_ARR)
            B_ATTRS_STORE[model].push(str)
          }
        }
      }
    }
  } 

  B_MQ_STR = {...B_MQ_STR_COPY}

  for (const key in B_MQ_STORE) {
    for (const [a, b] of Object.entries(B_MQ_STORE[key])) {
      B_MQ_STR[key] += `${a}{${b}}`
    }
  }

  B_STYLE_STRING = ''

  for (const [a, b] of Object.entries(B_STYLE_STORE)) {
    B_STYLE_STRING += `${a}{${b}}`
  }

  let isUpd = upd_style(B_STYLE_STRING, B_MQ_STR, B_MQ_STORE)

  if (blick_obj.time && isUpd) consoleTimer.stop()
}
;// CONCATENATED MODULE: ./src/index.js



window.blick = blick_obj
window.blickcss = blick_obj

const B_SCRIPT_TAG = document.currentScript

if (B_SCRIPT_TAG?.src.includes('?')) {
	new URLSearchParams(B_SCRIPT_TAG.src.split("?")[1])
	.forEach((val, prop) => {
		blick_obj[prop] = (
			["", "1", "true"].includes(val) ||
			!["0","false"].includes(val) && val
		)
	})
}

new MutationObserver(render)
.observe(document.documentElement, {
	attributeFilter: [
		'class',
		blick_obj.attr.text,
		blick_obj.attr.flex,
		blick_obj.attr.grid
	],
	childList: true,
	attributes: true,
	subtree: true,
})
/******/ })()
;
//# sourceMappingURL=blick.js.map