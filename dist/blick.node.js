#!/usr/bin/env node

// src/node/index.js
import fs2 from "fs";
import fg from "fast-glob";
import url from "url";
import path from "path";
import chokidar from "chokidar";

// src/theme/attrs/text.js
var text_default = {
  _name: "text",
  _else: function({ style, states, token }) {
    if (style.includes("/")) {
      let [v1, v2, v3] = style.split("/");
      if (+v1[0] && v3) {
        return [
          {
            _prop: `font-size:$1;font-weight:$2;line-height:$3`,
            _unit: ["px", "", "px"]
          },
          [v1, v2, v3]
        ];
      }
      if (+v1[0]) {
        return [
          {
            _prop: `font-size:$;font-weight:${v2}`,
            _unit: "px"
          },
          [v1]
        ];
      }
    } else {
      if (+style[0]) {
        return { _prop: "font-size:$", _unit: "px" };
      }
    }
    return "color:$";
  },
  100: "font-weight:100",
  200: "font-weight:200",
  300: "font-weight:300",
  400: "font-weight:400",
  500: "font-weight:500",
  600: "font-weight:600",
  700: "font-weight:700",
  800: "font-weight:800",
  900: "font-weight:900",
  nowrap: "white-space: nowrap",
  light: "font-weight:300",
  regular: "font-weight:400",
  medium: "font-weight:500",
  semibold: "font-weight:600",
  bold: "font-weight:700",
  extrabold: "font-weight:800",
  tp: "color:transparent!important",
  thin: "font-weight:lighter",
  normal: "font-weight:normal",
  bolder: "font-weight:bolder",
  italic: "font-style: italic",
  delete: "text-decoration-line:line-through",
  line: "text-decoration-line:underline",
  overline: "text-decoration-line:overline",
  up: "text-transform:uppercase",
  low: "text-transform:lowercase",
  cap: "text-transform:capitalize",
  center: "text-align:center",
  left: "text-align:left",
  right: "text-align:right",
  justify: "text-align:justify",
  mono: "font-family:var(--font-mono)",
  serif: "font-family:var(--font-serif)",
  sans: "font-family:var(--font-sans)",
  vertical: "writing-mode:vertical-lr",
  wrap: "word-wrap:break-word",
  dots: "overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%",
  cols: { _prop: "columns:$", _unit: "" },
  lh: { _prop: "line-height:$", _unit: "" },
  wg: { _prop: "font-weight:$", _unit: "" },
  font: { _prop: "font-family:$", _unit: "" },
  align: { _prop: "vertical-align:$", _unit: "" },
  space: { _prop: "white-space:$", _unit: "" },
  shadow: {
    _one: "text-shadow:3px 3px 2px #0000004d",
    _prop: "text-shadow:$",
    _unit: "px"
  },
  stroke: {
    _prop: "-webkit-text-stroke:$",
    _unit: "px"
  },
  break: {
    _prop: "word-break:$",
    _vals: { all: "break-all", keep: "keep-all" },
    _unit: ""
  }
};

// src/theme/class.js
var w_vals = {
  full: "100%",
  half: "50%",
  min: "min-content",
  fit: "fit-content",
  max: "max-content",
  screen: "100vw"
};
var h_vals = {
  full: "100%",
  half: "50%",
  min: "min-content",
  fit: "fit-content",
  max: "max-content",
  screen: "100vh"
};
var c_vals = {
  c: "center",
  bl: "baseline",
  s: "start",
  e: "end",
  sb: "space-between",
  sa: "space-around",
  se: "space-evenly"
};
var i_vals = {
  c: "center",
  bl: "baseline",
  s: "start",
  e: "end",
  st: "stretch"
};
var classes = {
  m: {
    _prop: "margin:$",
    _unit: "px"
  },
  my: {
    _prop: "margin-top:$1;margin-bottom:$2",
    _unit: "px"
  },
  mx: {
    _prop: "margin-left:$1;margin-right:$2",
    _unit: "px"
  },
  mt: {
    _prop: "margin-top:$",
    _unit: "px"
  },
  mr: {
    _prop: "margin-right:$",
    _unit: "px"
  },
  mb: {
    _prop: "margin-bottom:$",
    _unit: "px"
  },
  ml: {
    _prop: "margin-left:$",
    _unit: "px"
  },
  ms: {
    _prop: "margin-inline-start:$",
    _unit: "px"
  },
  me: {
    _prop: "margin-inline-end:$",
    _unit: "px"
  },
  center: "margin:auto",
  p: {
    _prop: "padding:$",
    _unit: "px"
  },
  py: {
    _prop: "padding-top:$1;padding-bottom:$2",
    _unit: "px"
  },
  px: {
    _prop: "padding-left:$1;padding-right:$2",
    _unit: "px"
  },
  pt: {
    _prop: "padding-top:$",
    _unit: "px"
  },
  pr: {
    _prop: "padding-right:$",
    _unit: "px"
  },
  pb: {
    _prop: "padding-bottom:$",
    _unit: "px"
  },
  pl: {
    _prop: "padding-left:$",
    _unit: "px"
  },
  ps: {
    _prop: "padding-inline-start:$",
    _unit: "px"
  },
  pe: {
    _prop: "padding-inline-end:$",
    _unit: "px"
  },
  space: {
    _prop: "margin-left:$",
    _selector: "$>*+*",
    _unit: "px",
    x: { _prop: "margin-left:$", _selector: "$>*+*", _unit: "px" },
    y: { _prop: "margin-top:$", _selector: "$>*+*", _unit: "px" }
  },
  b: {
    _prop: "border-width:$",
    _unit: "px"
  },
  bt: {
    _prop: "border-top-width:$",
    _unit: "px"
  },
  br: {
    _prop: "border-right-width:$",
    _unit: "px"
  },
  bb: {
    _prop: "border-bottom-width:$",
    _unit: "px"
  },
  bl: {
    _prop: "border-left-width:$",
    _unit: "px"
  },
  bc: {
    _prop: "border-color:$",
    _vals: {
      f: "#fff",
      0: "#000",
      tp: "transparent",
      cc: "currentcolor"
    }
  },
  bs: {
    _prop: "border-style:$"
  },
  border: {
    _one: "border:1px solid",
    _prop: "border:$",
    _unit: "px"
  },
  outline: {
    _prop: "outline:$",
    _unit: "px"
  },
  fill: {
    _prop: "fill:$",
    _vals: {
      f: "#fff",
      0: "#000",
      tp: "transparent",
      cc: "currentcolor"
    }
  },
  stroke: {
    _prop: "stroke:$",
    _vals: {
      f: "#fff",
      0: "#000",
      tp: "transparent",
      cc: "currentcolor"
    }
  },
  unappearance: "appearance:none",
  unapp: "appearance:none",
  scale: {
    _prop: "scale:$"
  },
  rotate: {
    _prop: "rotate:$",
    _unit: "deg"
  },
  translate: {
    _prop: "translate:$",
    _unit: "px"
  },
  skew: {
    _prop: "transform:skew($)",
    _unit: "deg",
    _join: ",",
    x: {
      _prop: "transform:skewX($)",
      _unit: "deg"
    },
    y: {
      _prop: "transform:skewY($)",
      _unit: "deg"
    }
  },
  flip: {
    _one: "scale:-1 -1",
    _prop: "scale:$",
    _vals: {
      x: "-1 1",
      y: "1 -1"
    }
  },
  clamp: {
    _prop: "overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:$"
  },
  inset: {
    _prop: "inset:$",
    x: { _prop: "left:$;right:$" },
    y: { _prop: "top:$;bottom:$" }
  },
  start: { _prop: "inset-inline-start:$" },
  end: { _prop: "inset-inline-end:$" },
  tf: {
    _prop: "transform:$",
    sc: {
      _prop: "transform:scale($)",
      _join: ","
    },
    sc3d: {
      _prop: "transform:scale3d($)",
      _join: ","
    },
    scx: {
      _prop: "transform:scaleX($)"
    },
    scy: {
      _prop: "transform:scaleY($)"
    },
    scz: {
      _prop: "transform:scaleZ($)"
    },
    rt: {
      _prop: "transform:rotate($)",
      _unit: "deg"
    },
    rt3d: {
      _prop: "transform:rotate3d($)",
      _join: ","
    },
    rtx: {
      _prop: "transform:rotateX($)",
      _unit: "deg"
    },
    rty: {
      _prop: "transform:rotateY($)",
      _unit: "deg"
    },
    rtz: {
      _prop: "transform:rotateZ($)",
      _unit: "deg"
    },
    tl: {
      _prop: "transform:translate($)",
      _unit: "px",
      _join: ","
    },
    tl3d: {
      _prop: "transform:translate3d($)",
      _join: ","
    },
    tlx: {
      _prop: "transform:translateX($)",
      _unit: "px"
    },
    tly: {
      _prop: "transform:translateY($)",
      _unit: "px"
    },
    tlz: {
      _prop: "transform:translateZ($)",
      _unit: "px"
    },
    sk: {
      _prop: "transform:skew($)",
      _unit: "deg",
      _join: ","
    },
    skx: {
      _prop: "transform:skewX($)",
      _unit: "deg"
    },
    sky: {
      _prop: "transform:skewY($)",
      _unit: "deg"
    }
  },
  w: {
    _prop: "width:$",
    _vals: w_vals,
    _unit: "px"
  },
  h: {
    _prop: "height:$",
    _vals: h_vals,
    _unit: "px"
  },
  sq: {
    _prop: "width:$1;height:$2",
    _vals: { full: "100%" },
    _unit: "px"
  },
  max: {
    w: {
      _prop: "max-width:$",
      _vals: w_vals,
      _unit: "px"
    },
    h: {
      _prop: "max-height:$",
      _vals: h_vals,
      _unit: "px"
    }
  },
  min: {
    w: {
      _prop: "min-width:$",
      _vals: w_vals,
      _unit: "px"
    },
    h: {
      _prop: "min-height:$",
      _vals: h_vals,
      _unit: "px"
    }
  },
  minW: {
    _prop: "min-width:$",
    _vals: w_vals,
    _unit: "px"
  },
  minH: {
    _prop: "min-height:$",
    _vals: h_vals,
    _unit: "px"
  },
  maxW: {
    _prop: "max-width:$",
    _vals: w_vals,
    _unit: "px"
  },
  maxH: {
    _prop: "max-height:$",
    _vals: h_vals,
    _unit: "px"
  },
  d: {
    _prop: "display:$",
    _vals: {
      inblock: "inline-block",
      inflex: "inline-flex",
      ingrid: "inline-grid"
    }
  },
  table: {
    _one: "display:table",
    _prop: "display:table-$"
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
    _prop: "position:$"
  },
  static: "position:static",
  abs: "position:absolute",
  absolute: "position:absolute",
  rel: "position:relative",
  relative: "position:relative",
  sticky: "position:sticky",
  fixed: "position:fixed",
  r: {
    _prop: "border-radius:$",
    _unit: "px"
  },
  round: {
    _one: "border-radius:9999px",
    _prop: "border-radius:$",
    _unit: "px"
  },
  sharp: "border-radius:0",
  transition: {
    _prop: "transition:$",
    _unit: "ms"
  },
  time: {
    _prop: "transition:$",
    _unit: "ms"
  },
  select: {
    _prop: "user-select:$"
  },
  fit: {
    _prop: "object-fit:$",
    top: "object-position:top",
    bottom: "object-position:bottom",
    center: "object-position:center",
    left: {
      _one: "object-position:left",
      _prop: "object-position:left $"
    },
    right: {
      _one: "object-position:right",
      _prop: "object-position:right $"
    }
  },
  bg: {
    _prop: "background:$",
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
      text: "background-clip:text"
    },
    origin: {
      border: "background-origin:border-box",
      padding: "background-origin:padding-box",
      content: "background-origin:content-box"
    }
  },
  bgp: {
    _prop: "background-position:$",
    x: { _prop: "background-position-x:$" },
    y: { _prop: "background-position-y:$" }
  },
  c: {
    _prop: "color:$",
    _vals: {
      f: "#fff",
      0: "#000",
      tp: "transparent",
      cc: "currentcolor"
    }
  },
  accent: {
    _prop: "accent-color:$",
    _vals: {
      f: "#fff",
      0: "#000",
      tp: "transparent",
      cc: "currentcolor"
    }
  },
  caret: {
    _prop: "caret-color:$",
    _vals: {
      f: "#fff",
      0: "#000",
      tp: "transparent",
      cc: "currentcolor"
    }
  },
  over: {
    _prop: "overflow:$",
    x: {
      _prop: "overflow-x:$"
    },
    y: {
      _prop: "overflow-y:$"
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
      _prop: "box-shadow:$",
      _one: "box-shadow:3px 4px 3px #0000004d",
      _unit: "px"
    },
    text: {
      _prop: "text-shadow:$",
      _one: "text-shadow:3px 4px 3px #0000004d",
      _unit: "px"
    }
  },
  cursor: {
    _prop: "cursor:$"
  },
  resize: {
    _prop: "resize:$",
    _vals: {
      x: "horizontal",
      y: "vertical"
    }
  },
  top: {
    _prop: "top:$",
    _unit: "px"
  },
  right: {
    _prop: "right:$",
    _unit: "px"
  },
  bottom: {
    _prop: "bottom:$",
    _unit: "px"
  },
  left: {
    _prop: "left:$",
    _unit: "px"
  },
  ratio: {
    _prop({ src, rawVal, val }) {
      return `aspect-ratio:${+rawVal[0] ? rawVal.split("/").join(" / ") : val}`;
    },
    _vals: {
      sqr: "1 / 1",
      vid: "16 / 9"
    }
  },
  box: {
    _prop: "box-sizing:$",
    _vals: {
      content: "content-box",
      border: "border-box"
    },
    decoration: { _prop: "box-decoration-break:$" }
  },
  float: {
    _prop: "float:$"
  },
  clear: {
    _prop: "clear:$",
    _vals: {
      x: "horizontal",
      y: "vertical"
    }
  },
  z: {
    _prop: "z-index:$"
  },
  visible: "visibility:visible",
  invisible: "visibility:hidden",
  collapse: "visibility:collapse",
  opacity: {
    _prop: ({ val }) => `opacity:${val > 1 ? val / 100 : val}`
  },
  blend: {
    _prop: "mix-blend-mode:$"
  },
  hue: {
    _prop: "filter:hue-rotate($)",
    _unit: "deg"
  },
  invert: {
    _one: "filter:invert(1)",
    _prop: "filter:invert($)"
  },
  blur: {
    _prop: "filter:blur($)",
    _unit: "px"
  },
  brightness: {
    _prop: "filter:brightness($)"
  },
  contrast: {
    _prop: "filter:contrast($)"
  },
  saturate: {
    _prop: "filter:saturate($)"
  },
  grayscale: {
    _prop: "filter:grayscale($)",
    _unit: "%"
  },
  sepia: {
    _prop: "filter:sepia($)",
    _unit: "%"
  },
  isolate: "isolation:isolate",
  isolation: { _prop: "isolation:$" },
  pointer: "cursor:pointer",
  ws: {
    _prop: "white-space:$"
  },
  list: {
    _prop: "list-style:$",
    item: "display:list-item"
  },
  spacing: {
    _prop: "letter-spacing:$",
    _unit: "px"
  },
  fs: {
    _prop: "font-size:$",
    _unit: "px"
  },
  fsz: {
    _prop: "font-size:$",
    _unit: "px"
  },
  fst: {
    _prop: "font-style:$"
  },
  italic: "font-style:italic",
  fw: {
    _prop: "font-weight:$"
  },
  extrathin: "font-weight:100",
  thin: "font-weight:200",
  light: "font-weight:300",
  regular: "font-weight:400",
  medium: "font-weight:500",
  semibold: "font-weight:600",
  bold: "font-weight:700",
  extrabold: "font-weight:800",
  fv: {
    _prop: "font-variant:$"
  },
  ff: {
    _prop: "font-family:$",
    _vals: {
      sans: "var(--font-sans)",
      serif: "var(--font-serif)",
      mono: "var(--font-mono)"
    }
  },
  lh: {
    _prop: "line-height:$"
  },
  ta: {
    _prop: "text-align:$"
  },
  underline: "text-decoration:underline",
  td: {
    _prop: "text-decoration:$",
    _vals: {
      line: "underline"
    },
    _unit: "px"
  },
  wb: {
    _prop: "word-break:$",
    _vals: {
      all: "break-all",
      keep: "keep-all"
    }
  },
  break: {
    _prop: "word-break:$",
    _vals: {
      all: "break-all",
      keep: "keep-all"
    },
    after: { _prop: "break-after:$" },
    before: { _prop: "break-before:$" },
    inside: { _prop: "break-inside:$" }
  },
  grad: {
    _prop: "background:linear-gradient($)",
    _unit: "deg",
    _join: ","
  },
  fullscreen: "position:absolute;left:0;top:0;width:100%;height:100%",
  flex: {
    _one: "display:flex",
    _prop({ val, rawVal, src }) {
      if (rawVal in src._vals) {
        return "flex:" + val;
      }
      return "gap:" + val;
    },
    _vals: {
      1: "1 1 0%",
      auto: "1 1 auto",
      initial: "0 1 auto"
    },
    _unit: "px",
    center: "justify-content:center;align-items:center",
    col: {
      _one: "flex-direction:column",
      rev: "flex-direction:column-reverse"
    },
    row: {
      _one: "flex-direction:row",
      rev: "flex-direction:row-reverse"
    },
    space: "justify-content:space-between;align-items:center",
    evenly: "justify-content:space-evenly;align-items:center",
    around: "justify-content:space-around;align-items:center",
    wrap: {
      _one: "flex-wrap:wrap",
      rev: "flex-wrap:wrap-reverse"
    },
    nowrap: "flex-wrap:nowrap",
    stretch: "align-items:stretch",
    start: {
      _one: "justify-content:flex-start",
      top: "justify-content:flex-start;align-items:flex-start",
      center: "justify-content:flex-start;align-items:center",
      bottom: "justify-content:flex-start;align-items:flex-end"
    },
    end: {
      _one: "justify-content:flex-end",
      top: "justify-content:flex-end;align-items:flex-start",
      center: "justify-content:flex-end;align-items:center",
      bottom: "justify-content:flex-end;align-items:flex-end"
    },
    top: {
      _one: "align-items:flex-start",
      start: "justify-content:flex-start;align-items:flex-start",
      center: "justify-content:center;align-items:flex-start",
      end: "justify-content:flex-end;align-items:flex-start"
    },
    bottom: {
      _one: "align-items:flex-end",
      start: "justify-content:flex-start;align-items:flex-end",
      center: "justify-content:center;align-items:flex-end",
      end: "justify-content:flex-end;align-items:flex-end"
    }
  },
  col: {
    _one: "flex-direction:column",
    rev: "flex-direction:column-reverse",
    _prop: "grid-column:$",
    span: {
      _prop: "grid-column:span $ / span $",
      full: "grid-column:1 / -1"
    },
    start: { _prop: "grid-column-start:$" },
    end: { _prop: "grid-column-end:$" }
  },
  row: {
    _one: "flex-direction:row",
    rev: "flex-direction:row-reverse",
    _prop: "grid-row:$",
    span: {
      _prop: "grid-row:span $ / span $",
      full: "grid-row:1 / -1"
    },
    start: { _prop: "grid-row-start:$" },
    end: { _prop: "grid-row-end:$" }
  },
  flow: {
    _prop: "grid-auto-flow:$",
    _vals: {
      col: "column",
      "col-dense": "column dense",
      "row dense": "row dense"
    }
  },
  auto: {
    cols: {
      _prop: "grid-auto-columns:$",
      _vals: {
        min: "min-content",
        max: "max-content",
        fr: "minmax(0,1fr)"
      }
    },
    rows: {
      _prop: "grid-auto-rows:$",
      _vals: {
        min: "min-content",
        max: "max-content",
        fr: "minmax(0,1fr)"
      }
    }
  },
  gap: {
    _prop: "gap:$",
    _unit: "px",
    x: {
      _prop: "column-gap:$",
      _unit: "px"
    },
    y: {
      _prop: "row-gap:$",
      _unit: "px"
    }
  },
  jc: {
    _prop: "justify-content:$",
    _vals: c_vals
  },
  ji: {
    _prop: "justify-items:$",
    _vals: i_vals
  },
  js: {
    _prop: "justify-self:$",
    _vals: i_vals
  },
  ac: {
    _prop: "align-content:$",
    _vals: c_vals
  },
  ai: {
    _prop: "align-items:$",
    _vals: i_vals
  },
  as: {
    _prop: "align-self:$",
    _vals: i_vals
  },
  order: {
    _prop: "order:$",
    _vals: {
      first: "-9999",
      last: "9999",
      n_one: "0"
    }
  },
  basis: {
    _prop: "flex-basis:$"
  },
  grow: {
    _one: "flex-grow:1",
    _prop: "flex-grow:$"
  },
  shrink: {
    _one: "flex-shrink:1",
    _prop: "flex-shrink:$"
  },
  grid: {
    _one: "display:grid",
    cols: {
      _prop: "grid-template-columns:repeat($,1fr)"
    },
    rows: {
      _prop: "grid-template-rows:repeat($,1fr)"
    }
  },
  sw: {
    _prop: "stroke-width: $",
    _unit: "px"
  },
  text: {
    _prop: function({ rawVal }) {
      let [v1, v2, v3] = rawVal.split("/");
      if (+v1[0] && v3) {
        return {
          _prop: `font-size:$1;font-weight:$2;line-height:$3`,
          _values: [v1, v2, v3]
        };
      }
      if (+v1[0] && v2) {
        return {
          _prop: `font-size:$1;font-weight:$2`,
          _values: [v1, v2]
        };
      }
      if (+v1[0]) {
        return "font-size:$1";
      }
      return "color:$";
    },
    _unit: ["px", "", "px"],
    ...text_default
  }
};
classes.object = classes.fit;
classes.overflow = classes.over;
classes.op = classes.opacity;
var class_default = classes;

// src/theme/attrs/flex.js
var c_vals2 = {
  c: "center",
  bl: "baseline",
  s: "start",
  e: "end",
  sb: "space-between",
  sa: "space-around",
  se: "space-evenly"
};
var i_vals2 = {
  c: "center",
  bl: "baseline",
  s: "start",
  e: "end",
  st: "stretch"
};
var flex_default = {
  _name: "flex",
  _using: "display:flex",
  _else: function(e) {
    if (!isNaN(+e.style[0])) {
      return { _prop: "gap:$", _unit: "px" };
    }
  },
  col: {
    _one: "flex-direction:column",
    start: "flex-direction:column;align-items:flex-start",
    center: "flex-direction:column;align-items:center",
    end: "flex-direction:column;align-items:flex-end",
    rev: "flex-direction:column-reverse"
  },
  row: {
    _one: "flex-direction:row",
    start: "flex-direction:row;justify-content:flex-start",
    center: "flex-direction:row;justify-content:center",
    end: "flex-direction:row;justify-content:flex-end",
    rev: "flex-direction:row-reverse"
  },
  order: { _prop: "order:$1" },
  basis: { _prop: "flex-basis:$" },
  center: "justify-content:center;align-items:center",
  space: "justify-content:space-between;align-items:center",
  evenly: "justify-content: space-evenly;align-items:center",
  around: "justify-content: space-around;align-items:center",
  stretch: "align-items:stretch",
  grow: { _one: "flex-grow:1", _prop: "flex-grow:$" },
  shrink: { _one: "flex-shrink:1", _prop: "flex-shrink:$" },
  start: "justify-content: flex-start",
  end: "justify-content: flex-end",
  top: "align-items: flex-start",
  bottom: "align-items: flex-end",
  wrap: {
    _one: "flex-wrap:wrap",
    _prop: "flex-wrap:$",
    _vals: { rev: "wrap-reverse" }
  },
  jc: {
    _prop: "justify-content:$",
    _vals: c_vals2
  },
  ji: {
    _prop: "justify-items:$",
    _vals: i_vals2
  },
  ac: {
    _prop: "align-content:$",
    _vals: c_vals2
  },
  ai: {
    _prop: "align-items:$",
    _vals: i_vals2
  }
};

// src/theme/attrs/grid.js
var c_vals3 = {
  c: "center",
  bl: "baseline",
  s: "start",
  e: "end",
  sb: "space-between",
  sa: "space-around",
  se: "space-evenly"
};
var i_vals3 = {
  c: "center",
  bl: "baseline",
  s: "start",
  e: "end",
  st: "stretch"
};
var grid_default = {
  _name: "grid",
  _using: "display:grid",
  _else: function(e) {
    if (+e.style[0]) {
      return [{ _prop: "gap:$", _unit: "px" }];
    }
  },
  cols: {
    _prop: "grid-template-columns:repeat($,1fr)"
  },
  rows: {
    _prop: "grid-template-rows:repeat($,1fr)"
  },
  jc: {
    _prop: "justify-content:$",
    _vals: c_vals3
  },
  ji: {
    _prop: "justify-items:$",
    _vals: i_vals3
  },
  ac: {
    _prop: "align-content:$",
    _vals: c_vals3
  },
  ai: {
    _prop: "align-items:$",
    _vals: i_vals3
  }
};

// src/theme/screen.js
var screen_default = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

// src/theme/states.js
var states_default = {
  h: ":hover",
  f: ":focus",
  c: ":checked",
  a: ":active",
  first: ">*:first-child",
  ft: ">*:first-child",
  last: ">*:last-child",
  lt: ">*:last-child",
  odd: ">*:nth-child(odd)",
  od: ">*:nth-child(odd)",
  even: ">*:nth-child(even)",
  ev: ">*:nth-child(even)",
  all: " *",
  "*": " *",
  every: ">*",
  ">": ">*",
  between: ">*+*",
  bt: ">*+*",
  after: "::after",
  aft: "::after",
  before: "::before",
  bef: "::before",
  dark: (selector) => `.dark ${selector}`
};

// src/theme/colors.js
var colors_default = {
  black: { def: "#000" },
  white: { def: "#fff" },
  gray: { def: "#6b7280", 1: "#f3f4f6", 2: "#d1d5db", 3: "#374151", 4: "#111827" },
  red: { def: "#ef4444", 1: "#fee2e2", 2: "#fca5a5", 3: "#b91c1c", 4: "#7f1d1d" },
  orange: { def: "#f97316", 1: "#ffedd5", 2: "#fdba74", 3: "#c2410c", 4: "#7c2d12" },
  yellow: { def: "#eab308", 1: "#fef9c3", 2: "#fde047", 3: "#a16207", 4: "#713f12" },
  lime: { def: "#84cc16", 1: "#ecfccb", 2: "#bef264", 3: "#4d7c0f", 4: "#365314" },
  green: { def: "#22c55e", 1: "#dcfce7", 2: "#86efac", 3: "#15803d", 4: "#14532d" },
  cyan: { def: "#06b6d4", 1: "#cffafe", 2: "#67e8f9", 3: "#0e7490", 4: "#164e63" },
  blue: { def: "#3b82f6", 1: "#dbeafe", 2: "#93c5fd", 3: "#1d4ed8", 4: "#1e3a8a" },
  purple: { def: "#a855f7", 1: "#f3e8ff", 2: "#d8b4fe", 3: "#7e22ce", 4: "#581c87" },
  pink: { def: "#ec4899", 1: "#fce7f3", 2: "#f9a8d4", 3: "#be185d", 4: "#831843" }
};

// src/theme/font.js
var font_default = {
  main: "system-ui,-apple-system,sans-serif",
  serif: "serif",
  mono: "monospace",
  sans: "sans-serif"
};

// src/theme/reset.js
var reset_default = `*,::after,::before{box-sizing:border-box;object-fit:cover;-webkit-tap-highlight-color:transparent;font-feature-settings:"pnum" on,"lnum" on;outline:0;border:0;margin:0;padding:0;border-style:solid;color:inherit}h1,h2,h3,h4,h5,h6{font-size:var(--fsz);font-weight:700;line-height:1.2}h1{--fsz:2.5rem}h2{--fsz:2rem}h3{--fsz:1.75rem}h4{--fsz:1.5rem}h5{--fsz:1.25rem}h6{--fsz:1rem}a{text-decoration:none}hr{width:100%;margin:20px 0;border-top:1px solid #aaa}ul[role="list"],ol[role="list"]{list-style:none}html:focus-within{scroll-behavior:smooth}body{text-rendering:optimizeSpeed;font-family:var(--font-main)}a:not([class]){text-decoration-skip-ink:auto}img,picture{max-width:100%;vertical-align:middle}input,button,textarea,select{font:inherit}[hidden]{display:none}option{color:#000;background-color:#fff}.theme-dark{background-color:#222}.theme-dark *{color:#eee}`;

// src/lib/check-type.js
function isElement(element) {
  try {
    return element instanceof Element || element instanceof HTMLElement || element.nodeName && element.nodeType && element.ownerDocument;
  } catch (error) {
    return false;
  }
}
var TYPES = {
  func: (e) => typeof e === "function",
  str: (e) => typeof e === "string",
  obj: (e) => typeof e === "object",
  num: (e) => typeof e === "number",
  arr: (e) => Array.isArray(e),
  var: (e) => /^\$.+/.test(e),
  hex: (e) => /^#[\dabcdef]{3,8}$/.test(String(e).trim()),
  exist: (e) => e !== void 0,
  null: (e) => e === null,
  undef: (e) => e === void 0,
  element: (e) => isElement(e)
};
var is = {
  ...TYPES
  // not: new Proxy(TYPES, {
  //     get(obj, key) {
  //         if (key in obj) {
  //             return (val) => !obj[key](val);
  //         } else {
  //             throw new Error(`BlickCss: type '${key}' don't exist`);
  //         }
  //     },
  // }),
};

// src/theme/funcs.js
var canvas;
var canvas_ctx;
if (typeof window !== "undefined") {
  canvas = document.createElement("canvas");
  canvas_ctx = canvas.getContext("2d");
}
function config(updates = this, source = this, isFirstCall = true) {
  if (updates === source)
    return source;
  if (!is.obj(updates)) {
    console.error(
      "Blick: The blick.config function must contain an object."
    );
    return;
  }
  for (let key in updates) {
    if (is.null(updates[key]) || is.undef(updates[key])) {
      delete source[key];
    } else if (is.obj(updates[key]) && !is.arr(updates[key])) {
      if (!source[key] || is.str(source[key])) {
        source[key] = {};
      }
      config(updates[key], source[key], false);
    } else {
      source[key] = updates[key];
    }
  }
  if (isFirstCall) {
  }
  return source;
}
function getHex(str) {
  if (!canvas) {
    throw Error("function getHex available only in browser");
  }
  canvas_ctx.fillStyle = str;
  return canvas_ctx.fillStyle;
}
function getVarColor(str) {
  if (!colors_default)
    return;
  if (is.var(str)) {
    str = str.slice(1);
  }
  const [colorName, shade] = str.split("-");
  if (shade) {
    if (colors_default[colorName][shade]) {
      return colors_default[colorName][shade];
    } else {
      throw Error(
        `Blick: This shade "${shade}" is not exist for "${colorName}".
Available shades: ${Object.keys(colors_default[colorName]).filter(
          (e) => e !== "def"
        )}`
      );
    }
  }
  return colors_default[colorName]?.def || colors_default[colorName]?.DEFAULT || colors_default[colorName];
}
function getHexAlpha(str) {
  str = +str;
  if (str < 0 || str > 100) {
    throw Error("Blick: Alpha value must be a from 0 to 100");
  }
  let shade = Math.round(str / 100 * 255).toString(16);
  if (shade.length === 1) {
    shade = "0" + shade;
  }
  return shade;
}
var funcs_default = {
  config,
  getHex,
  getVarColor,
  getHexAlpha
};

// src/lib/format-selector.js
function format_selector_default(token, attr = "class") {
  let format = token;
  format = format.replace(/[^\w-_]/g, "\\$&").replace(/^\d/, "\\3$& ");
  if (attr === "raw") {
    return format;
  }
  if (attr === "class") {
    return `.${format}`;
  }
  return `[${attr}~="${token}"]`;
}

// src/context.js
var context;
var context_default = {
  get() {
    return context;
  },
  set(ctx2) {
    return context = ctx2;
  }
};

// src/lib/create-media-width.js
function createMediaWidth(sizes) {
  if (!is.obj(sizes))
    sizes = [sizes];
  const WIDTHS = [];
  for (const index in sizes) {
    let size = sizes[index];
    if (!size)
      continue;
    size = size.toString().replace(/\(|\)/g, "");
    if (+size[0]) {
      let type = +index === 0 ? "min" : "max";
      let unit = +size ? "px" : "";
      WIDTHS.push(`(${type}-width:${size}${unit})`);
    } else {
      WIDTHS.push(`(${size})`);
    }
  }
  return WIDTHS.join(" and ");
}

// src/lib/parser/parse-media.js
function parseMedia(str) {
  const ctx2 = context_default.get();
  if (!str)
    throw new Error(`value is required, (${str})`);
  if (str.startsWith(ctx2.maxPrefix)) {
    str = str.slice(ctx2.maxPrefix.length);
    return createMediaWidth([null, ctx2.screen[str] || str]);
  }
  return createMediaWidth(ctx2.screen[str] || str);
}

// src/lib/parser/parse-states.js
function parseStates(state, attr) {
  const ctx2 = context_default.get();
  const IS_IN_ARR = state in ctx2.screen;
  const IS_MAX_WD = state.startsWith(ctx2.maxPrefix);
  const IS_NUMBER = +state;
  let raw = state;
  let val = null;
  let type = null;
  if (IS_IN_ARR || IS_NUMBER || IS_MAX_WD) {
    val = parseMedia(state);
    type = "media";
  } else {
    if (raw.startsWith("&")) {
      val = raw.slice(1);
    } else {
      val = ctx2.states[raw] || ":" + raw;
    }
    if (is.str(val)) {
      val = val.replace(/(?<!\\)_/g, " ");
    }
    type = "pseudo";
  }
  return { raw, val, type };
}

// src/lib/parser/parse-rule.js
function parseRule(path2, object) {
  const PARTS = path2.split(/(?<!\\)-/g);
  let array_path = [];
  let value_string = null;
  for (const i in PARTS) {
    if (!object[PARTS[i]]) {
      if (i == 0)
        object = null;
      value_string = PARTS.slice(i).join("-");
      break;
    }
    array_path.push(PARTS[i]);
    object = object[PARTS[i]];
  }
  return {
    path: array_path,
    value: value_string,
    source: object
  };
}

// src/lib/parser/parse-value.js
function createColor(color, opacity) {
  const ctx2 = context_default.get();
  try {
    if (ctx2._COLOR_) {
      return ctx2._COLOR_(color, opacity);
    }
    return getHex(color) + getHexAlpha(opacity);
  } catch (error) {
    console.log(error + "");
    return null;
  }
}
function createVar(variable, opacity = "") {
  if (is.var(variable)) {
    variable = variable.slice(1);
  }
  if (opacity) {
    opacity = `;opacity:${opacity}`;
  }
  return `var(--${variable})${opacity}`;
}
function calcOpacity(number) {
  if (+number) {
    return number > 1 ? number / 100 : number;
  }
}
function getItem(item = "", source = {}, index = 0) {
  const [first, second] = item.replaceAll("\\", "").split("/");
  const UNIT = source?._unit || "";
  if (!first)
    return;
  if (second && +second) {
    if (+first) {
      return +(first / second * 100).toFixed(2) + "%";
    }
    if (is.var(first)) {
      const COLOR = getVarColor(first);
      if (COLOR) {
        return createColor(COLOR, second);
      }
      return createVar(first, calcOpacity(second));
    }
    return createColor(first, second);
  }
  if (is.var(first)) {
    return createVar(first);
  }
  if (Array.isArray(UNIT)) {
    return +item ? item + (UNIT[index] || "") : item;
  }
  return +item ? item + UNIT : item;
}
function parseValue(value = "", source = {}) {
  if (!value)
    return null;
  if (!is.arr(value)) {
    value = value.split(/(?<!\\)\+/g);
  }
  let fff = value.map((item, index) => {
    return {
      val: source._vals?.[item] ?? getItem(item, source, index)?.replace(/\\/g, ""),
      raw: item
    };
  });
  if (fff.filter((e) => e.val).length) {
    return fff;
  }
  return null;
}

// src/lib/parser/parse-styles.js
function parseStyles(style, attr, token, states) {
  const ctx2 = context_default.get();
  let object = ctx2.attr[attr] || ctx2.class;
  let property = null;
  let values = null;
  let important = false;
  if (style.includes("!")) {
    style = style.replace(/!/g, "");
    important = true;
  }
  let { source, path: path2, value } = parseRule(style, object);
  if (!source && attr !== "class") {
    let _else = object._else?.({ style, token, states });
    if (is.arr(_else)) {
      let [s, v] = _else || [null, null];
      source = is.obj(s) ? s : { _prop: s };
      value = v || style;
    } else if (is.obj(_else)) {
      source = _else;
      value = style;
    } else {
      source = { _prop: _else };
      value = style;
    }
  }
  if (!source)
    return;
  if (value) {
    property = source._prop;
    values = parseValue(value, source);
    if (!values) {
      return null;
    }
  } else {
    property = source._one || source;
  }
  if (!property || is.obj(property)) {
    return null;
  }
  return {
    src: source,
    path: path2,
    prop: property,
    values,
    rawVal: value,
    val: values?.map((e) => e.val).join(source._join || " ") || null,
    unit: source._unit || "",
    join: source._join || " ",
    important
  };
}

// src/lib/parser/index.js
function parser(token = "", attr = "class") {
  let [styles, ...states] = token.split(/(?<!\\):/g).reverse();
  let selector = format_selector_default(token, attr);
  let rawSelector = selector;
  states = states.map((e) => parseStates(e, attr, token));
  styles = styles.split(/(?<!\\);/g);
  styles = styles.map((e) => parseStyles(e, attr, token, states));
  styles = styles.filter((e) => e);
  if (!states.length) {
    states = null;
  }
  if (styles.length) {
    const EXTRA_SELECTOR = styles[0].src?._selector;
    return { states, styles, attr, selector, rawSelector, token, extra: EXTRA_SELECTOR };
  }
  return null;
}

// src/lib/create-rule.js
function createRule(token, attr) {
  const STRUCT = parser(token, attr);
  let IS_MEDIA = false;
  if (!STRUCT)
    return null;
  const MEDIA = [];
  const DECLARED = [];
  if (STRUCT.states) {
    for (let i = STRUCT.states.length - 1; i >= 0; i--) {
      const state = STRUCT.states[i];
      if (state.type === "pseudo") {
        if (is.func(state.val)) {
          STRUCT.selector = state.val(STRUCT.selector);
        } else if (state.val?.includes("$")) {
          STRUCT.selector = state.val.replace("$", STRUCT.selector);
        } else {
          STRUCT.selector += state.val;
        }
      } else if (state.type === "media") {
        MEDIA.push(state);
        IS_MEDIA = true;
      }
    }
  }
  if (STRUCT.extra && is.str(STRUCT.extra)) {
    STRUCT.selector = STRUCT.extra.replace(/\$/g, STRUCT.selector);
  }
  for (let rule of STRUCT.styles) {
    let style = rule.prop;
    let postfix = rule.important ? " !important" : "";
    if (is.func(rule.prop)) {
      style = rule.prop(rule) || "";
      if (is.obj(style)) {
        style.prop = style._prop || rule.prop;
        style.vals = style._vals || rule.vals;
        style.one = style._one || rule.one;
        style.unit = style._unit || rule.unit;
        style.values = style._values || rule.values;
        rule = { ...rule, ...style };
      } else {
        rule.prop = style;
      }
    }
    const re = {
      group: /\$(\d+)?/g,
      space: /^\s*(.+?):\s*/
    };
    if (rule.values) {
      style = rule.prop.replace(re.group, (_, group) => {
        if (group) {
          let vals = rule.values[group - 1] || rule.values[0];
          let unit = is.arr(rule.unit) ? rule.unit : [rule.unit];
          if (is.arr(rule.unit) && +vals.raw) {
            return vals.raw + (rule.unit[group - 1] || "");
          }
          return vals.val || vals.raw;
        }
        return rule.val || rule.rawVal;
      });
    }
    style = style.split(";").map((e) => e.replace(re.space, "$1:") + postfix).join(";");
    DECLARED.push(style);
  }
  const STYLE = DECLARED.join(";").replace(/(?<!\\)_/g, " ");
  return [MEDIA, `${STRUCT.selector}{${STYLE}}`];
}

// src/store.js
var STYLE_STORE = /* @__PURE__ */ Object.create(null);
var ATTRS_STORE = /* @__PURE__ */ Object.create(null);
var MEDIA_STORE = /* @__PURE__ */ Object.create(null);
var CSS_STORE = /* @__PURE__ */ Object.create(null);
CSS_STORE.MEDIA = {};
var _STORE_ = {
  STYLE_STORE,
  ATTRS_STORE,
  MEDIA_STORE,
  CSS_STORE
};
var store_default = _STORE_;

// src/style-tag.js
var STYLE_TAG = {
  textContent: ""
};
if (typeof window !== "undefined") {
  STYLE_TAG = document.createElement("style");
  STYLE_TAG.id = "BLICK_OUTPUT";
  document.head.append(STYLE_TAG);
}
var style_tag_default = STYLE_TAG;

// version.js
var version_default = "2.0";

// src/lib/deep-clone.js
function deepClone(obj) {
  if (is.element(obj)) {
    return obj;
  }
  if (typeof obj !== "object") {
    return obj;
  }
  if (is.arr(obj)) {
    return obj.map((e) => deepClone(e));
  }
  const clonedObj = {};
  for (let key in obj) {
    clonedObj[key] = deepClone(obj[key]);
  }
  return clonedObj;
}

// src/lib/create-root.js
function create_root_default() {
  const ctx2 = context_default.get();
  let fonts = "";
  let colors = "";
  for (const type in ctx2?.font) {
    fonts += `--font-${type}:${ctx2.font[type]};`;
  }
  for (const color in ctx2?.colors) {
    if (is.str(ctx2.colors[color])) {
      colors += `--${color}:${ctx2.colors[color]};`;
      continue;
    }
    for (const num in ctx2.colors[color]) {
      colors += `--${color + (num === "def" ? "" : "-" + num)}:${ctx2.colors[color][num]};`;
    }
  }
  return `:root{${colors + fonts}}`;
}

// src/lib/create-css.js
function create_css_default() {
  const ctx2 = context_default.get();
  const STORE = ctx2._STORE_.CSS_STORE;
  let media_str = "";
  let css_str = "";
  for (const attr in STORE) {
    if (attr === "MEDIA") {
      for (const md in STORE.MEDIA) {
        media_str += `@media${md}{${STORE.MEDIA[md]}}`;
      }
      continue;
    }
    css_str += STORE[attr];
  }
  let result_css = "";
  result_css += `/* ! blickcss v${ctx2.version} | MIT License | https://github.com/ghtx280/blickcss */

`;
  if (ctx2.reset) {
    result_css += ctx2.reset;
  }
  if (ctx2.root) {
    result_css += create_root_default();
  }
  if (ctx2.wrapper) {
    result_css += `${ctx2.wrapper}{display:block;width:100%;margin:0 auto;padding-left:var(--wrapper-padding,15px);padding-right:var(--wrapper-padding,15px)}`;
  }
  for (const key in ctx2.attr) {
    if (ctx2.attr[key]?._using && key in STORE) {
      result_css += `[${key}]{${ctx2.attr[key]._using}}`;
    }
  }
  if (ctx2.autoFlex) {
    result_css += '[class*="flex-"],[class*="jc-"],[class*="ai-"],[class*="gap-"]{display:flex}';
  }
  return result_css + css_str + media_str;
}

// src/lib/prerender.js
function prerender_default() {
  const ctx2 = context_default.get();
  if (!ctx2.dark) {
    ctx2.dark = ctx2.states.dark("").trim();
  }
  if (typeof window !== void 0) {
    if (ctx2.autoTheme && matchMedia("(prefers-color-scheme: dark)").matches) {
      if (ctx2.dark.startsWith(".")) {
        document.documentElement.classList.add(ctx2.dark.slice(1));
      } else if (ctx2.dark.startsWith("#")) {
        document.documentElement.id = ctx2.dark.slice(1);
      } else if (ctx2.dark.startsWith("[") && ctx2.dark.endsWith("]")) {
        document.documentElement.setAttribute(ctx2.dark.slice(1, -1));
      }
    }
  }
  if (ctx2.wrapper) {
    for (const scr in ctx2.screen) {
      let size = ctx2.screen[scr];
      ctx2._STORE_.CSS_STORE.MEDIA[parseMedia(scr)] = ctx2.wrapper + `{max-width:${is.num(size) ? size : size[0]}px}`;
    }
  }
}

// src/lib/update-store.js
function updateStore(token, attr) {
  const ctx2 = context_default.get();
  const AS = ctx2._STORE_.ATTRS_STORE;
  const SS = ctx2._STORE_.STYLE_STORE;
  const MS = ctx2._STORE_.MEDIA_STORE;
  const CS = ctx2._STORE_.CSS_STORE;
  if (!(attr in CS))
    CS[attr] = "";
  if (!(attr in SS))
    SS[attr] = /* @__PURE__ */ Object.create(null);
  if (!(attr in AS))
    AS[attr] = /* @__PURE__ */ Object.create(null);
  if (token in SS[attr])
    return false;
  if (token in AS[attr])
    return false;
  AS[attr][token] = true;
  const [MEDIA, RULE] = ctx2.createRule(token, attr) || [[], ""];
  if (!RULE) {
    SS[attr][token] = null;
    return false;
  }
  if (MEDIA.length) {
    for (const m of MEDIA) {
      if (!(m.raw in MS))
        MS[m.raw] = /* @__PURE__ */ Object.create(null);
      if (!(m.val in CS.MEDIA))
        CS.MEDIA[m.val] = "";
      if (token in MS[m.raw])
        return false;
      MS[m.raw][token] = RULE;
      CS.MEDIA[m.val] += RULE;
    }
  } else {
    SS[attr][token] = RULE;
    CS[attr] += RULE;
  }
  return true;
}

// src/node/funcs/create-attr-regexp.js
function createAttrRegexp(attr = "class") {
  attr = attr == "class" ? "(?:class|className)" : attr;
  const REGEXP = `\\s+${attr}\\s*=\\s*(["'\`])(.*?)\\1`;
  const FLAGS = "g";
  return new RegExp(REGEXP, FLAGS);
}

// src/lib/from-html.js
var ctx;
var STORE_COPY = structuredClone(store_default);
function from_html_default(html = "", config2) {
  if (config2 || !ctx) {
    ctx = theme_default.clone();
    ctx.config(config2);
    context_default.set(ctx);
  }
  const ATTRS = ["class", ...Object.keys(ctx.attr)];
  ctx._STORE_ = structuredClone(STORE_COPY);
  prerender_default();
  for (const attr of ATTRS) {
    const MATCHES = [...html.matchAll(createAttrRegexp(attr))];
    if (MATCHES.length) {
      const ATTR_VALUE = MATCHES.map((e) => e[2]).join(" ");
      if (ATTR_VALUE.trim()) {
        for (const token of ATTR_VALUE.trim().split(/\s+/g)) {
          updateStore(token, attr);
        }
      }
    }
  }
  return create_css_default();
}

// src/theme/index.js
var BLICK = {
  class: class_default,
  screen: screen_default,
  states: states_default,
  colors: colors_default,
  font: font_default,
  reset: reset_default,
  attr: {
    flex: flex_default,
    grid: grid_default,
    text: text_default
  },
  autoTheme: false,
  beautify: false,
  autoFlex: true,
  useAttr: true,
  time: false,
  root: true,
  wrapper: ".wrapper",
  maxPrefix: "m-",
  beautifyOption: {},
  version: version_default,
  is,
  parser,
  _STORE_: store_default,
  createRule,
  getStyleTag: () => style_tag_default,
  clone(field) {
    return deepClone(field ? this[field] : this);
  },
  html: from_html_default,
  ...funcs_default
};
var theme_default = BLICK;

// src/node/funcs/create-error.js
import chalk from "chalk";
function createError(stack) {
  for (const [color, msg] of stack) {
    console.log(chalk[color].bold(msg));
  }
}

// src/node/funcs/make-hex.js
function make_hex_default(color, opacity) {
  const color_names = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
  };
  const rgbToHex = (r = "0", g = "0", b = "0") => "#" + [r, g, b].map((x) => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
  opacity = opacity ? getHexAlpha(opacity) : "";
  if (color[0] === "#") {
    if (color.length === 4) {
      let r = color[1];
      let g = color[2];
      let b = color[3];
      return "#" + r + r + g + g + b + b + opacity;
    } else {
      return color + opacity;
    }
  } else if (color.startsWith("rgb")) {
    let [r, g, b, a] = color.match(/\((.+)\)/)[1].trim().split(/\s*,\s*/);
    if (a) {
      return color;
    } else {
      return rgbToHex(r, g, b) + opacity;
    }
  } else {
    if (!color_names[color]) {
      createError([["red", `Invalid color "${color}"`]]);
      return null;
    }
    return color_names[color] + opacity;
  }
}

// src/node/default-config.js
var default_config_default = (
  /*js*/
  `
import blick, { config } from "blickcss2"

export default config({
    
    input: './src/**/*.html', // Your input files by glob pattern
    output: './src/output.css', // File in which css will be generated

    // your configurations

    beautify: true, // For beautify css code
    watch: true, // For watching changing the input files and rebuilding

    
    // Uncomment the code below so that only your styles are created

    // reset: false,
    // root: false,
    // wrapper: false,
    // autoFlex: false,

})
`
);

// src/node/funcs/is-module.js
import { readFileSync } from "fs";
import { resolve } from "path";
function isModule() {
  try {
    const path2 = resolve("package.json");
    const content = readFileSync(path2, "utf-8");
    const json = JSON.parse(content);
    return json.type === "module";
  } catch (error) {
    return null;
  }
}

// src/node/funcs/cssbeautify.js
function cssbeautify(style = "", options = {
  indent: "    ",
  openbrace: "end-of-line",
  autosemicolon: true
}) {
  let index = 0;
  let length = style.length;
  let blocks;
  let formatted = "";
  let ch;
  let ch2;
  let str;
  let state;
  let State;
  let depth;
  let quote;
  let comment;
  let openbracesuffix = true;
  let autosemicolon = false;
  let trimRight;
  openbracesuffix = options.openbrace === "end-of-line";
  autosemicolon = options.autosemicolon;
  function isWhitespace(c) {
    return c === " " || c === "\n" || c === "	" || c === "\r" || c === "\f";
  }
  function isQuote(c) {
    return c === "'" || c === '"';
  }
  function isName(c) {
    return ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z" || ch >= "0" && ch <= "9" || "-_*.:#[]".indexOf(c) >= 0;
  }
  function appendIndent() {
    var i;
    for (i = depth; i > 0; i -= 1) {
      formatted += options.indent;
    }
  }
  function openBlock() {
    formatted = trimRight(formatted);
    if (openbracesuffix) {
      formatted += " {";
    } else {
      formatted += "\n";
      appendIndent();
      formatted += "{";
    }
    if (ch2 !== "\n") {
      formatted += "\n";
    }
    depth += 1;
  }
  function closeBlock() {
    var last;
    depth -= 1;
    formatted = trimRight(formatted);
    if (formatted.length > 0 && autosemicolon) {
      last = formatted.charAt(formatted.length - 1);
      if (last !== ";" && last !== "{") {
        formatted += ";";
      }
    }
    formatted += "\n";
    appendIndent();
    formatted += "}";
    blocks.push(formatted);
    formatted = "";
  }
  if (String.prototype.trimRight) {
    trimRight = function(s) {
      return s.trimRight();
    };
  } else {
    trimRight = function(s) {
      return s.replace(/\s+$/, "");
    };
  }
  State = {
    Start: 0,
    AtRule: 1,
    Block: 2,
    Selector: 3,
    Ruleset: 4,
    Property: 5,
    Separator: 6,
    Expression: 7,
    URL: 8
  };
  depth = 0;
  state = State.Start;
  comment = false;
  blocks = [];
  style = style.replace(/\r\n/g, "\n");
  while (index < length) {
    ch = style.charAt(index);
    ch2 = style.charAt(index + 1);
    index += 1;
    if (isQuote(quote)) {
      formatted += ch;
      if (ch === quote) {
        quote = null;
      }
      if (ch === "\\" && ch2 === quote) {
        formatted += ch2;
        index += 1;
      }
      continue;
    }
    if (isQuote(ch)) {
      formatted += ch;
      quote = ch;
      continue;
    }
    if (comment) {
      formatted += ch;
      if (ch === "*" && ch2 === "/") {
        comment = false;
        formatted += ch2;
        index += 1;
      }
      continue;
    }
    if (ch === "/" && ch2 === "*") {
      comment = true;
      formatted += ch;
      formatted += ch2;
      index += 1;
      continue;
    }
    if (state === State.Start) {
      if (blocks.length === 0) {
        if (isWhitespace(ch) && formatted.length === 0) {
          continue;
        }
      }
      if (ch <= " " || ch.charCodeAt(0) >= 128) {
        state = State.Start;
        formatted += ch;
        continue;
      }
      if (isName(ch) || ch === "@") {
        str = trimRight(formatted);
        if (str.length === 0) {
          if (blocks.length > 0) {
            formatted = "\n\n";
          }
        } else {
          if (str.charAt(str.length - 1) === "}" || str.charAt(str.length - 1) === ";") {
            formatted = str + "\n\n";
          } else {
            while (true) {
              ch2 = formatted.charAt(formatted.length - 1);
              if (ch2 !== " " && ch2.charCodeAt(0) !== 9) {
                break;
              }
              formatted = formatted.substr(
                0,
                formatted.length - 1
              );
            }
          }
        }
        formatted += ch;
        state = ch === "@" ? State.AtRule : State.Selector;
        continue;
      }
    }
    if (state === State.AtRule) {
      if (ch === ";") {
        formatted += ch;
        state = State.Start;
        continue;
      }
      if (ch === "{") {
        str = trimRight(formatted);
        openBlock();
        state = str === "@font-face" ? State.Ruleset : State.Block;
        continue;
      }
      formatted += ch;
      continue;
    }
    if (state === State.Block) {
      if (isName(ch)) {
        str = trimRight(formatted);
        if (str.length === 0) {
          if (blocks.length > 0) {
            formatted = "\n\n";
          }
        } else {
          if (str.charAt(str.length - 1) === "}") {
            formatted = str + "\n\n";
          } else {
            while (true) {
              ch2 = formatted.charAt(formatted.length - 1);
              if (ch2 !== " " && ch2.charCodeAt(0) !== 9) {
                break;
              }
              formatted = formatted.substr(
                0,
                formatted.length - 1
              );
            }
          }
        }
        appendIndent();
        formatted += ch;
        state = State.Selector;
        continue;
      }
      if (ch === "}") {
        closeBlock();
        state = State.Start;
        continue;
      }
      formatted += ch;
      continue;
    }
    if (state === State.Selector) {
      if (ch === "{") {
        openBlock();
        state = State.Ruleset;
        continue;
      }
      if (ch === "}") {
        closeBlock();
        state = State.Start;
        continue;
      }
      formatted += ch;
      continue;
    }
    if (state === State.Ruleset) {
      if (ch === "}") {
        closeBlock();
        state = State.Start;
        if (depth > 0) {
          state = State.Block;
        }
        continue;
      }
      if (ch === "\n") {
        formatted = trimRight(formatted);
        formatted += "\n";
        continue;
      }
      if (!isWhitespace(ch)) {
        formatted = trimRight(formatted);
        formatted += "\n";
        appendIndent();
        formatted += ch;
        state = State.Property;
        continue;
      }
      formatted += ch;
      continue;
    }
    if (state === State.Property) {
      if (ch === ":") {
        formatted = trimRight(formatted);
        formatted += ": ";
        state = State.Expression;
        if (isWhitespace(ch2)) {
          state = State.Separator;
        }
        continue;
      }
      if (ch === "}") {
        closeBlock();
        state = State.Start;
        if (depth > 0) {
          state = State.Block;
        }
        continue;
      }
      formatted += ch;
      continue;
    }
    if (state === State.Separator) {
      if (!isWhitespace(ch)) {
        formatted += ch;
        state = State.Expression;
        continue;
      }
      if (isQuote(ch2)) {
        state = State.Expression;
      }
      continue;
    }
    if (state === State.Expression) {
      if (ch === "}") {
        closeBlock();
        state = State.Start;
        if (depth > 0) {
          state = State.Block;
        }
        continue;
      }
      if (ch === ";") {
        formatted = trimRight(formatted);
        formatted += ";\n";
        state = State.Ruleset;
        continue;
      }
      formatted += ch;
      if (ch === "(") {
        if (formatted.charAt(formatted.length - 2) === "l" && formatted.charAt(formatted.length - 3) === "r" && formatted.charAt(formatted.length - 4) === "u") {
          state = State.URL;
          continue;
        }
      }
      continue;
    }
    if (state === State.URL) {
      if (ch === ")" && formatted.charAt(formatted.length - 1 !== "\\")) {
        formatted += ch;
        state = State.Expression;
        continue;
      }
    }
    formatted += ch;
  }
  formatted = blocks.join("") + formatted;
  return formatted;
}

// src/node/funcs/show-msg.js
import chalk2 from "chalk";
var times = 1;
function showMsg(file, params, time) {
  const date = /* @__PURE__ */ new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  console.log(
    "\n\n",
    chalk2.yellow(`[${h}:${m}:${s}]`),
    chalk2.blue(`Updates: ${times++}, ${time}`)
  );
  console.log(`-------------------`);
  if (file) {
    let upd_file = file.replaceAll("\\", "/");
    console.log(chalk2.green.bold(`'${upd_file}' was changed.`));
  }
  if (params.output) {
    let out_file = params.output.replaceAll(/\.+\//g, "");
    console.log(chalk2.green.bold(`'${out_file}' updated successfully.`));
  }
  console.log(`-------------------`);
  if (params.watch) {
    console.log(chalk2.gray.bold(`Waiting for changes...`));
  }
}

// src/node/funcs/node-helpers.js
import fs from "fs";
function mkdirIfNotExist(path2) {
  if (!fs.existsSync(path2)) {
    fs.mkdirSync(path2, { recursive: true });
    return true;
  }
  return false;
}
function writeFileIfNotExist(path2, content) {
  if (!fs.existsSync(path2)) {
    fs.writeFileSync(path2, content);
    return true;
  }
  return false;
}

// src/lib/timer.js
function timer(label) {
  const startTime = performance.now();
  const diff = () => performance.now() - startTime;
  return {
    stop() {
      console.log(`${label}: ${diff().toFixed(1)}ms`);
    },
    get() {
      return diff().toFixed(1);
    },
    getFormated() {
      return `${diff().toFixed(1)}ms`;
    }
  };
}

// src/node/index.js
console.log("\n================BlickCss================\n");
try {
  const ctx2 = context_default.set(theme_default);
  const DIR = path.dirname(url.fileURLToPath(import.meta.url));
  const CWD = process.cwd();
  const CONFIG_FILE_NAME = `blick.config.${!isModule() ? "m" : ""}js`;
  const CONFIG_FILE_PATH = path.resolve(CONFIG_FILE_NAME);
  const CONFIG_FILE_PATH_REL = path.relative(DIR, CONFIG_FILE_PATH);
  ctx2._COLOR_ = make_hex_default;
  ctx2._CLI_ = true;
  let user_config = {};
  let config_changed = false;
  async function filesUpdate(updatedFile) {
    let tmr = timer();
    const FILES = fg.sync(user_config.input);
    let filesText = "";
    for (const file of FILES) {
      filesText += fs2.readFileSync(file, "utf-8");
    }
    let CSS = ctx2.html(filesText, config_changed ? user_config : null);
    if (user_config.beautify) {
      CSS = cssbeautify(CSS);
    }
    mkdirIfNotExist(path.dirname(user_config.output));
    fs2.writeFile(user_config.output, CSS, (err) => {
      if (err) {
        return console.error(`BlickCss: Error writing file`, err);
      }
      showMsg(updatedFile, user_config, tmr.getFormated());
    });
    config_changed = false;
  }
  let watching_files;
  async function handleConfigUpdate() {
    watching_files?.close();
    const PATH = `./${CONFIG_FILE_PATH_REL}?update=${Date.now()}`;
    await new Promise((resolve2, reject) => {
      import(PATH).then((CONFIG) => {
        user_config = CONFIG.default;
        config_changed = true;
        filesUpdate();
        resolve2();
      }).catch((e) => createError([
        ["red", e + " in " + CONFIG_FILE_NAME],
        ["red", "Please check your config file"]
      ]));
    });
    if (user_config.watch) {
      watching_files = chokidar.watch(user_config.input).on("change", (filePath) => {
        filesUpdate(filePath);
      });
    }
  }
  ;
  async function main() {
    writeFileIfNotExist(CONFIG_FILE_PATH, default_config_default);
    await handleConfigUpdate();
    chokidar.watch(CONFIG_FILE_PATH).on("change", handleConfigUpdate);
  }
  main();
} catch (error) {
  console.log(error);
}
