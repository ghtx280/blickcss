"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var __accessCheck = (obj, member, msg) => {
    if (!member.has(obj))
      throw TypeError("Cannot " + msg);
  };
  var __privateGet = (obj, member, getter) => {
    __accessCheck(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
  };
  var __privateAdd = (obj, member, value) => {
    if (member.has(obj))
      throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  };
  var __privateSet = (obj, member, value, setter) => {
    __accessCheck(obj, member, "write to private field");
    setter ? setter.call(obj, value) : member.set(obj, value);
    return value;
  };

  // version.js
  var version_default = "2.1.10";

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
  var is = __spreadValues({}, TYPES);

  // src/lib/create-root.js
  function create_root_default(ctx) {
    let fonts = "";
    let colors = "";
    for (const type in ctx == null ? void 0 : ctx.font) {
      fonts += `--font-${type}:${ctx.font[type]};`;
    }
    for (const color in ctx == null ? void 0 : ctx.colors) {
      if (is.str(ctx.colors[color])) {
        colors += `--${color}:${ctx.colors[color]};`;
        continue;
      }
      for (const num in ctx.colors[color]) {
        colors += `--${color + (num === "def" ? "" : "-" + num)}:${ctx.colors[color][num]};`;
      }
    }
    return `:root{${colors + fonts}}`;
  }

  // src/lib/create-css.js
  function create_css_default(ctx) {
    var _a;
    const STORE = ctx._STORE_.CSS_STORE;
    let media_str = "";
    let css_str = "";
    for (const attr in STORE) {
      if (attr === "MEDIA") {
        for (const size in STORE.MEDIA.MIN) {
          media_str += `@media (min-width:${size}px){${STORE.MEDIA.MIN[size]}}`;
        }
        let max_keys = Object.keys(STORE.MEDIA.MAX);
        for (let i = max_keys.length - 1; i >= 0; i--) {
          let size = max_keys[i];
          media_str += `@media (max-width:${is.arr(size) ? size[1] : size}px){${STORE.MEDIA.MAX[size]}}`;
        }
        for (const size_min in STORE.MEDIA.RANGE) {
          for (const size_max in STORE.MEDIA.RANGE[size_min]) {
            media_str += `@media (min-width:${size_min}px) and (max-width:${size_max}px){${STORE.MEDIA.RANGE[size_min][size_max]}}`;
          }
        }
        continue;
      }
      css_str += STORE[attr];
    }
    let result_css = "";
    result_css += `/* ! blickcss v${ctx.version} | MIT License | https://github.com/ghtx280/blickcss */

`;
    if (ctx.reset) {
      result_css += ctx.reset;
    }
    if (ctx.root) {
      result_css += create_root_default(ctx);
    }
    if (ctx.wrapper) {
      result_css += `${ctx.wrapper}{display:block;width:100%;margin:0 auto;padding-left:var(--wrapper-padding,15px);padding-right:var(--wrapper-padding,15px)}`;
    }
    for (const key in ctx.attr) {
      if (((_a = ctx.attr[key]) == null ? void 0 : _a._using) && key in STORE) {
        result_css += `[${key}]{${ctx.attr[key]._using}}`;
      }
    }
    if (ctx.autoFlex) {
      result_css += '[class*="flex-"],[class*="jc-"],[class*="ai-"],[class*="gap-"]{display:flex}';
    }
    return result_css + css_str + media_str;
  }

  // src/theme/screen.js
  function CreateScreens() {
    return {
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200
    };
  }

  // src/helpers/is-browser.js
  function is_browser_default() {
    return typeof window !== "undefined";
  }

  // src/helpers/send-error.js
  function send_error_default(text) {
    if (is_browser_default()) {
      console.error("BlickError: " + text);
    } else {
      console.log("\x1B[31m\x1B[1m");
      console.log("BlickError: " + text);
      console.log("\x1B[0m");
    }
  }

  // src/lib/parser/parse-media.js
  var MediaParser = class {
    constructor(ctx) {
      this.ctx = ctx;
    }
    parse(str) {
      if (!str)
        return send_error_default(`value is required, (${str})`);
      if (str.startsWith(this.ctx.maxPrefix)) {
        str = str.slice(this.ctx.maxPrefix.length);
        const val = this.ctx.screen[str] || str;
        return [null, is.arr(val) ? val[1] : val];
      }
      const sizes = this.ctx.screen[str] || str;
      if (!is.arr(sizes)) {
        return [this.ctx.screen[str] || str, null];
      }
      return sizes;
    }
  };

  // src/lib/prerender.js
  function prerender_default(ctx) {
    if (!ctx.dark) {
      ctx.dark = ctx.states.dark("").trim();
    }
    if (typeof window !== void 0) {
      if (ctx.autoTheme && matchMedia("(prefers-color-scheme: dark)").matches) {
        if (ctx.dark.startsWith(".")) {
          document.documentElement.classList.add(ctx.dark.slice(1));
        } else if (ctx.dark.startsWith("#")) {
          document.documentElement.id = ctx.dark.slice(1);
        } else if (ctx.dark.startsWith("[") && ctx.dark.endsWith("]")) {
          document.documentElement.setAttribute(ctx.dark.slice(1, -1));
        }
      }
    }
    if (ctx.wrapper) {
      for (const scr in CreateScreens()) {
        let size = ctx.screen[scr];
        ctx._STORE_.CSS_STORE.MEDIA.MIN[size] = ctx.wrapper + `{max-width:${is.num(size) ? size : size[0]}px}`;
      }
    }
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

  // src/lib/update-store.js
  function updateStore(ctx, token, attr) {
    var _a;
    const AS = ctx._STORE_.ATTRS_STORE;
    const SS = ctx._STORE_.STYLE_STORE;
    const MS = ctx._STORE_.MEDIA_STORE;
    const CS = ctx._STORE_.CSS_STORE;
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
    const STRUCT = (_a = ctx.parse(token, attr)) == null ? void 0 : _a.create();
    if (!STRUCT)
      return false;
    const MEDIA = STRUCT.media;
    const RULE = STRUCT.css();
    if (!RULE) {
      SS[attr][token] = null;
      return false;
    }
    if (MEDIA) {
      for (const m of MEDIA) {
        const [min, max] = m.val;
        if (min && !max) {
          if (!(min in CS.MEDIA.MIN))
            CS.MEDIA.MIN[min] = "";
          CS.MEDIA.MIN[min] += RULE;
        } else if (!min && max) {
          if (!(max in CS.MEDIA.MAX))
            CS.MEDIA.MAX[max] = "";
          CS.MEDIA.MAX[max] += RULE;
        } else if (min && max) {
          if (!(min in CS.MEDIA.RANGE))
            CS.MEDIA.RANGE[min] = {};
          if (!(max in CS.MEDIA.RANGE[min]))
            CS.MEDIA.RANGE[min][max] = "";
          CS.MEDIA.RANGE[min][max] += RULE;
        }
        if (!(m.raw in MS))
          MS[m.raw] = /* @__PURE__ */ Object.create(null);
        if (token in MS[m.raw])
          return false;
        MS[m.raw][token] = RULE;
      }
    } else {
      SS[attr][token] = RULE;
      CS[attr] += RULE;
    }
    return true;
  }

  // src/lib/render.js
  var once;
  function render_default(ctx) {
    const TIMER = timer("Blick: Styles updated");
    const ATTRS = ["class", ...Object.keys(ctx.attr)];
    const NODES = document.querySelectorAll(ATTRS.map((e) => `[${e}]`).join());
    if (!once || ctx._CLI_) {
      prerender_default(ctx);
      once = true;
    }
    let is_style_updated;
    NODES.forEach((node) => {
      for (const attr of ATTRS) {
        let ATTR_VALUE = node.getAttribute(attr);
        if (is.str(ATTR_VALUE))
          ATTR_VALUE = ATTR_VALUE.trim();
        if (!ATTR_VALUE)
          continue;
        for (const token of ATTR_VALUE.trim().split(/\s+/g)) {
          if (!updateStore(ctx, token, attr)) {
            continue;
          }
          is_style_updated = true;
        }
      }
    });
    if (is_style_updated) {
      ctx.element.textContent = create_css_default(ctx);
      if (ctx.time)
        TIMER.stop();
      ctx.onUpdate();
    }
    return ctx.element.textContent;
  }

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

  // src/helpers/escape.js
  function escape(str = "", symbol = "") {
    const RE = new RegExp(`(\\\\)?\\${symbol}`, "g");
    function execRegexp(replacement) {
      return str.replace(RE, (_, esc) => {
        if (esc) {
          return _;
        }
        return replacement || "\n";
      });
    }
    return {
      replace(replacement) {
        return execRegexp(replacement);
      },
      split() {
        return execRegexp().split("\n");
      }
    };
  }

  // src/lib/parser/parse-states.js
  var StatesParser = class {
    constructor(ctx) {
      this.ctx = ctx;
      this.parseMedia = new MediaParser(ctx);
    }
    parse(state, attr) {
      const IS_IN_ARR = state in this.ctx.screen;
      const IS_MAX_WD = state.startsWith(this.ctx.maxPrefix);
      const IS_NUMBER = +state;
      let raw = state;
      let val = null;
      let type = null;
      if (IS_IN_ARR || IS_NUMBER || IS_MAX_WD) {
        val = this.parseMedia.parse(state);
        type = "media";
      } else {
        if (raw.startsWith("&")) {
          val = raw.slice(1);
        } else {
          val = this.ctx.states[raw] || ":" + raw;
        }
        if (is.str(val)) {
          val = escape(val, "_").replace(" ");
        }
        type = "pseudo";
      }
      return { raw, val, type };
    }
  };

  // src/lib/parser/parse-rule.js
  var RuleParser = class {
    constructor(ctx) {
      this.ctx = ctx;
    }
    parse(path, object) {
      const SPLIT_SYMBOL = "-";
      const RE_PATH = new RegExp(`(\\\\)?\\${SPLIT_SYMBOL}`, "g");
      const PARTS = path.replace(RE_PATH, (_, esc) => esc ? SPLIT_SYMBOL : "\n").split("\n");
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
  };

  // src/helpers/color/calc-opacity.js
  function calc_opacity_default(number) {
    if (+number) {
      return number > 1 ? number / 100 : number;
    }
    return number;
  }

  // src/helpers/color/color-names.js
  var color_names_default = {
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

  // src/helpers/color/hex-alpha.js
  function hex_alpha_default(num) {
    num = +num;
    if (num < 0 || num > 100) {
      send_error_default("Alpha value must be a from 0 to 100");
      return "";
    }
    let alpha = Math.round(num / 100 * 255).toString(16);
    if (alpha.length === 1) {
      alpha = "0" + alpha;
    }
    return alpha;
  }

  // src/helpers/color/var-color.js
  function var_color_default(ctx, str) {
    var _a, _b;
    const colors = ctx.colors;
    if (!colors)
      return;
    if (is.var(str)) {
      str = str.slice(1);
    }
    const [colorName, shade] = str.split("-");
    if (shade) {
      if (colors[colorName][shade]) {
        return colors[colorName][shade];
      } else {
        throw Error(
          `Blick: This shade "${shade}" is not exist for "${colorName}".
Available shades: ${Object.keys(colors[colorName]).filter(
            (e) => e !== "def"
          )}`
        );
      }
    }
    return ((_a = colors[colorName]) == null ? void 0 : _a.def) || ((_b = colors[colorName]) == null ? void 0 : _b.DEFAULT) || colors[colorName];
  }

  // src/helpers/color/create-var.js
  function create_var_default(ctx, variable, opacity = "") {
    if (is.var(variable)) {
      variable = variable.slice(1);
    }
    if (!opacity) {
      return `var(--${variable})`;
    }
    let result = var_color_default(ctx, variable);
    if (result) {
      return result + hex_alpha_default(opacity);
    }
    return `var(--${variable});opacity:${calc_opacity_default(opacity)}`;
  }

  // src/helpers/color/from-rgb.js
  function from_rgb_default(r = "0", g = "0", b = "0") {
    return "#" + [r, g, b].map((x) => {
      const hex = (+x).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  }

  // src/helpers/create-color.js
  function create_color_default(ctx, color, opacity) {
    if (color[0] == "$") {
      return create_var_default(ctx, color, opacity);
    }
    if (color[0] === "#") {
      if (color.length === 4) {
        let r = color[1];
        let g = color[2];
        let b = color[3];
        return "#" + r + r + g + g + b + b + hex_alpha_default(opacity);
      }
      return color + hex_alpha_default(opacity);
    }
    if (color.startsWith("rgb")) {
      let [r, g, b, a] = color.replace(/rgba?\(\s*|\s*\)/g, "").split(/\s*,\s*/);
      return a ? color : from_rgb_default(r, g, b) + hex_alpha_default(opacity);
    }
    if (color in color_names_default) {
      return color_names_default[color] + hex_alpha_default(opacity);
    } else {
      send_error_default(`Invalid color "${color}"`);
    }
    return null;
  }

  // src/lib/parser/parse-value.js
  var ValueParser = class {
    constructor(ctx) {
      this.ctx = ctx;
    }
    getItem(item = "", source = {}, index = 0) {
      const [first, second] = item.replace(/\\/g, "").split("/");
      const UNIT = source ? source._unit : "";
      if (!first)
        return;
      if (+second) {
        if (+first) {
          return +(first / second * 100).toFixed(2) + "%";
        } else {
          return create_color_default(this.ctx, first, second);
        }
      }
      if (is.var(first)) {
        return create_color_default(this.ctx, first);
      }
      if (is.arr(UNIT)) {
        return +item ? item + (UNIT[index] || "") : item;
      }
      return +item && UNIT ? item + UNIT : item;
    }
    /*
      (num/num) 1/2 = 50%
      (var/num) $foo/50 = foo in blick.colors ? #xxxxxxaa : var(--foo);opacity:0.5 
      (str/num) red/50 = #ff000080
    
      (num) 15 = 15 + (unit || "")
      (var) $foo = var(--foo)
      (str) 5em = 5em
    */
    parse(value = "", source = {}) {
      if (!value)
        return null;
      const S = this.ctx.divisionSymbol;
      const RE_SPLIT = new RegExp(`([^${S}\\\\])\\${S}`, "g");
      if (!is.arr(value)) {
        value = value.replace(RE_SPLIT, "$1\n").split("\n");
      }
      let values = value.map((item, index) => {
        item = item.toString();
        const STATIC = source._vals ? source._vals[item] : null;
        if (STATIC) {
          return { val: STATIC, raw: item };
        }
        const DYNAMIC = this.getItem(item, source, index);
        if (DYNAMIC) {
          return { val: DYNAMIC.replace(/\\/g, ""), raw: item };
        }
      });
      if (values.filter((e) => e).length) {
        return values;
      }
      return null;
    }
  };

  // src/lib/parser/parse-styles.js
  var StylesParser = class {
    constructor(ctx) {
      this.ctx = ctx;
      this.parseValue = new ValueParser(ctx);
      this.parseRule = new RuleParser(ctx);
    }
    parse(style, attr, token, states) {
      let target = null;
      let declaration = null;
      let values = null;
      let important = false;
      let parsed_value = null;
      if (attr == "class") {
        target = this.ctx.class;
      } else {
        target = this.ctx.attr[attr];
      }
      style = style.replace(/!/g, () => {
        important = true;
        return "";
      });
      let { source, path, value } = this.parseRule.parse(style, target);
      const params = {
        token,
        style,
        path,
        value,
        source,
        attr,
        important,
        parseValue: (src) => this.parseValue.parse(value, src)
      };
      if (!source && attr !== "class") {
        if (!is.func(target._else))
          return null;
        source = target._else(params);
      }
      if (!source)
        return;
      if (is.func(source)) {
        source = source(params);
        if (!source)
          return;
        if (value) {
          let rule = this.parseRule.parse(value, source);
          if (rule.source) {
            value = rule.value;
            source = rule.source;
            path.push(...rule.path);
          }
        }
      }
      if (value) {
        declaration = source._prop || source;
        values = this.parseValue.parse(source._values || value, source);
        if (!values)
          return null;
      } else {
        declaration = source._one || source;
      }
      if (!is.str(declaration))
        return null;
      declaration = declaration.toString().trim();
      return {
        src: source,
        path,
        prop: declaration,
        values,
        rawVal: value,
        val: values ? values.map((e) => e.val).join(source._join || " ") : null,
        unit: source._unit || "",
        join: source._join || " ",
        important
      };
    }
  };

  // src/lib/create-rule.js
  var re = {
    group: /\$(\d+)?/g,
    space: /^\s*(.+?):\s*/,
    rule: /([^:]+):([^;]+);?/g
  };
  function createRule(STRUCT) {
    var _a;
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
          } else if ((_a = state.val) == null ? void 0 : _a.includes("$")) {
            STRUCT.selector = state.val.replace("$", STRUCT.selector);
          } else {
            STRUCT.selector += state.val;
          }
        } else if (state.type === "media") {
          MEDIA.push(state);
        }
      }
    }
    if (STRUCT.extra && is.str(STRUCT.extra)) {
      STRUCT.selector = STRUCT.extra.replace(/\$/g, STRUCT.selector);
    }
    for (let rule of STRUCT.styles) {
      let style = rule.prop;
      let important = rule.important ? "!important" : "";
      if (rule.values) {
        style = rule.prop.replace(re.group, (_, group) => {
          var _a2, _b, _c, _d, _e;
          if (!group) {
            return rule.val || rule.rawVal;
          }
          let vals = (_a2 = rule.values[group - 1]) != null ? _a2 : rule.values[0];
          let unit = (_e = (_d = (_b = rule.unit) == null ? void 0 : _b[group - 1]) != null ? _d : (_c = rule.unit) == null ? void 0 : _c[0]) != null ? _e : rule.unit;
          return vals.val || vals.raw || (+vals ? vals + (unit || "") : vals);
        });
      } else {
        style = style._one || style;
      }
      if (!style || !is.str(style)) {
        return null;
      }
      style = style.replace(re.rule, (_, prop, val) => {
        return `${prop.trim()}:${val.trim()}${important ? " !important" : ""};`;
      });
      if (style[style.length - 1] == ";") {
        style = style.slice(0, -1);
      }
      DECLARED.push(escape(style, "_").replace(" "));
    }
    return {
      media: MEDIA.length ? MEDIA : null,
      selector: STRUCT.selector,
      styles: DECLARED,
      css() {
        return `${STRUCT.selector}{${this.styles.join(";")}}`;
      }
    };
  }

  // src/lib/parser/index.js
  var Parser = class {
    constructor(ctx) {
      this.ctx = ctx;
      this.parseStates = new StatesParser(ctx);
      this.parseStyles = new StylesParser(ctx);
    }
    parse(token = "", attr = "class") {
      let [styles, ...states] = escape(token, ":").split().reverse();
      let selector = format_selector_default(token, attr);
      let rawSelector = selector;
      states = states.map((e) => this.parseStates.parse(e, attr, token));
      styles = escape(styles, ";").split();
      styles = styles.map((e) => this.parseStyles.parse(e, attr, token, states));
      styles = styles.filter((e) => e);
      if (!states.length) {
        states = null;
      }
      ;
      if (styles.length) {
        const EXTRA_SELECTOR = (styles[0].src || 0)._selector || null;
        return {
          states,
          styles,
          attr,
          selector,
          token,
          extra: EXTRA_SELECTOR,
          create() {
            return createRule(this);
          }
        };
      }
      return null;
    }
  };

  // src/lib/create-store.js
  function CreateStore() {
    let STYLE_STORE = /* @__PURE__ */ Object.create(null);
    let ATTRS_STORE = /* @__PURE__ */ Object.create(null);
    let MEDIA_STORE = /* @__PURE__ */ Object.create(null);
    let CSS_STORE = /* @__PURE__ */ Object.create(null);
    CSS_STORE.MEDIA = {
      MIN: /* @__PURE__ */ Object.create(null),
      MAX: /* @__PURE__ */ Object.create(null),
      RANGE: /* @__PURE__ */ Object.create(null)
    };
    return {
      STYLE_STORE,
      ATTRS_STORE,
      MEDIA_STORE,
      CSS_STORE
    };
  }

  // src/theme/attrs/flex.js
  function CreateAttrFlex() {
    const c_vals = {
      c: "center",
      bl: "baseline",
      s: "start",
      e: "end",
      sb: "space-between",
      sa: "space-around",
      se: "space-evenly"
    };
    const i_vals = {
      c: "center",
      bl: "baseline",
      s: "start",
      e: "end",
      st: "stretch"
    };
    return {
      _name: "flex",
      _using: "display:flex",
      _else: function(e) {
        if (+e.style[0]) {
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
        _vals: c_vals
      },
      ji: {
        _prop: "justify-items:$",
        _vals: i_vals
      },
      ac: {
        _prop: "align-content:$",
        _vals: c_vals
      },
      ai: {
        _prop: "align-items:$",
        _vals: i_vals
      }
    };
  }

  // src/theme/attrs/grid.js
  function CreateAttrGrid() {
    const c_vals = {
      c: "center",
      bl: "baseline",
      s: "start",
      e: "end",
      sb: "space-between",
      sa: "space-around",
      se: "space-evenly"
    };
    const i_vals = {
      c: "center",
      bl: "baseline",
      s: "start",
      e: "end",
      st: "stretch"
    };
    return {
      _name: "grid",
      _using: "display:grid",
      _else: function(e) {
        if (+e.style[0]) {
          return { _prop: "gap:$", _unit: "px" };
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
        _vals: c_vals
      },
      ji: {
        _prop: "justify-items:$",
        _vals: i_vals
      },
      ac: {
        _prop: "align-content:$",
        _vals: c_vals
      },
      ai: {
        _prop: "align-items:$",
        _vals: i_vals
      }
    };
  }

  // src/theme/attrs/text.js
  function CreateAttrText() {
    return {
      _name: "text",
      _else: function({ style, states, token }) {
        if (style.includes("/")) {
          let [v1, v2, v3] = style.split("/");
          if (+v1[0] && v3) {
            return {
              _prop: `font-size:$1;font-weight:$2;line-height:$3`,
              _unit: ["px", "", "px"],
              _values: [v1, v2, v3]
            };
          }
          if (+v1[0]) {
            return {
              _prop: `font-size:$;font-weight:${v2}`,
              _unit: "px",
              _values: [v1]
            };
          }
        } else {
          if (+style[0]) {
            return {
              _prop: "font-size:$",
              _unit: "px"
            };
          }
        }
        return { _prop: "color:$" };
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
      deleted: "text-decoration-line:line-through",
      line: "text-decoration-line:underline",
      underline: "text-decoration-line:underline",
      overline: "text-decoration-line:overline",
      up: "text-transform:uppercase",
      upper: "text-transform:uppercase",
      low: "text-transform:lowercase",
      lower: "text-transform:lowercase",
      cap: "text-transform:capitalize",
      capit: "text-transform:capitalize",
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
      cols: { _prop: "columns:$" },
      lh: { _prop: "line-height:$" },
      wg: { _prop: "font-weight:$" },
      font: { _prop: "font-family:$" },
      align: { _prop: "vertical-align:$" },
      space: { _prop: "white-space:$" },
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
        _vals: {
          all: "break-all",
          keep: "keep-all"
        }
      }
    };
  }

  // src/theme/attrs/index.js
  function CreateAttrs() {
    return {
      flex: CreateAttrFlex(),
      grid: CreateAttrGrid(),
      text: CreateAttrText()
    };
  }

  // src/theme/class.js
  function CreateClasses() {
    const w_vals = {
      full: "100%",
      half: "50%",
      min: "min-content",
      fit: "fit-content",
      max: "max-content",
      screen: "100vw"
    };
    const h_vals = {
      full: "100%",
      half: "50%",
      min: "min-content",
      fit: "fit-content",
      max: "max-content",
      screen: "100vh"
    };
    const c_vals = {
      c: "center",
      bl: "baseline",
      s: "start",
      e: "end",
      sb: "space-between",
      sa: "space-around",
      se: "space-evenly"
    };
    const i_vals = {
      c: "center",
      bl: "baseline",
      s: "start",
      e: "end",
      st: "stretch"
    };
    const classes = {
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
        scale: {
          _prop: "transform:scale($)",
          _join: ",",
          "3d": {
            _prop: "transform:scale3d($)",
            _join: ","
          },
          x: {
            _prop: "transform:scaleX($)"
          },
          y: {
            _prop: "transform:scaleY($)"
          },
          z: {
            _prop: "transform:scalez($)"
          }
        },
        rotate: {
          _prop: "transform:rotate($)",
          _unit: "deg",
          "3d": {
            _prop: "transform:rotate3d($)",
            _join: ","
          },
          x: {
            _prop: "transform:rotateX($)",
            _unit: "deg"
          },
          y: {
            _prop: "transform:rotateY($)",
            _unit: "deg"
          },
          z: {
            _prop: "transform:rotateZ($)",
            _unit: "deg"
          }
        },
        translate: {
          _prop: "transform:translate($)",
          _unit: "px",
          _join: ",",
          "3d": {
            _prop: "transform:translate3d($)",
            _unit: "px",
            _join: ","
          },
          x: {
            _prop: "transform:translateX($)",
            _unit: "px"
          },
          y: {
            _prop: "transform:translateY($)",
            _unit: "px"
          },
          z: {
            _prop: "transform:translateZ($)",
            _unit: "px"
          }
        },
        skew: {
          _prop: "transform:skew($)",
          _unit: "deg",
          x: {
            _prop: "transform:skewX($)",
            _unit: "deg"
          },
          y: {
            _prop: "transform:skewY($)",
            _unit: "deg"
          }
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
        },
        pos: {
          _prop: "background-position:$",
          x: { _prop: "background-position-x:$" },
          y: { _prop: "background-position-y:$" }
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
      ratio: (e) => {
        if (!e.value)
          return;
        let _vals = {
          sqr: "1 / 1",
          vid: "16 / 9"
        };
        return `aspect-ratio:${_vals[e.value] || e.value.replace("/", " / ")}`;
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
      opacity: ({ value }) => {
        return `opacity:${value > 1 ? value / 100 : value}`;
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
      flex: (e) => {
        let _vals = {
          1: "1 1 0%",
          auto: "1 1 auto",
          initial: "0 1 auto"
        };
        return {
          _one: "display:flex",
          _prop: `${e.value in _vals || e.value && !+e.value[0] ? "flex" : "gap"}:$`,
          _vals,
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
        };
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
          none: "0"
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
      text: (e) => {
        if (!e.value)
          return;
        let data = __spreadValues({
          _unit: ["px", "", "px"]
        }, CreateAttrText());
        let [v1, v2, v3] = e.value.split("/");
        if (+v1[0] && v3) {
          data._prop = `font-size:$1;font-weight:$2;line-height:$3`;
          data._values = [v1, v2, v3];
          return data;
        }
        if (+v1[0] && v2) {
          data._prop = `font-size:$1;font-weight:$2`;
          data._values = [v1, v2];
          return data;
        }
        if (+v1[0]) {
          data._prop = "font-size:$1";
          return data;
        }
        data._prop = "color:$";
        return data;
      }
    };
    classes.object = classes.fit;
    classes.overflow = classes.over;
    classes.op = classes.opacity;
    return classes;
  }

  // src/theme/colors.js
  function CreateColors() {
    return {
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
  }

  // src/theme/font.js
  function CreateFonts() {
    return {
      main: "system-ui,-apple-system,sans-serif",
      serif: "serif",
      mono: "monospace",
      sans: "sans-serif"
    };
  }

  // src/theme/reset.js
  function CreateReset() {
    return `*,::after,::before{box-sizing:border-box;object-fit:cover;-webkit-tap-highlight-color:transparent;font-feature-settings:"pnum" on,"lnum" on;outline:0;border:0;margin:0;padding:0;border-style:solid;color:inherit}h1,h2,h3,h4,h5,h6{font-size:var(--fsz);font-weight:700;line-height:1.2}h1{--fsz:2.5rem}h2{--fsz:2rem}h3{--fsz:1.75rem}h4{--fsz:1.5rem}h5{--fsz:1.25rem}h6{--fsz:1rem}a{text-decoration:none}hr{width:100%;margin:20px 0;border-top:1px solid #aaa}ul[role="list"],ol[role="list"]{list-style:none}html:focus-within{scroll-behavior:smooth}body{text-rendering:optimizeSpeed;font-family:var(--font-main)}a:not([class]){text-decoration-skip-ink:auto}img,picture{max-width:100%;vertical-align:middle}input,button,textarea,select{font:inherit}[hidden]{display:none}option{color:#000;background-color:#fff}.theme-dark{background-color:#222}.theme-dark *{color:#eee}`;
  }

  // src/theme/states.js
  function CreateStates() {
    return {
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
  }

  // src/node/funcs/create-attr-regexp.js
  function createAttrRegexp(attr = "class") {
    attr = attr == "class" ? "(?:class|className)" : attr;
    const REGEXP = `\\s+${attr}\\s*=\\s*(["'\`])(.*?)\\1`;
    const FLAGS = "g";
    return new RegExp(REGEXP, FLAGS);
  }

  // src/lib/from-html.js
  var HTMLProcessor = class {
    constructor(ctx) {
      this.ctx = ctx;
    }
    css(html = "") {
      const ATTRS = ["class", ...Object.keys(this.ctx.attr)];
      this.ctx._STORE_ = CreateStore();
      prerender_default(this.ctx);
      for (const attr of ATTRS) {
        const MATCHES = [...html.matchAll(createAttrRegexp(attr))];
        if (MATCHES.length) {
          const ATTR_VALUE = MATCHES.map((e) => e[2]).join(" ");
          if (ATTR_VALUE.trim()) {
            for (const token of ATTR_VALUE.trim().split(/\s+/g)) {
              updateStore(this.ctx, token, attr);
            }
          }
        }
      }
      return create_css_default(this.ctx);
    }
  };

  // src/blick.js
  var _parser, _html;
  var BlickCss = class {
    constructor(params = {}) {
      __privateAdd(this, _parser, void 0);
      __privateAdd(this, _html, void 0);
      __publicField(this, "class", CreateClasses());
      // classes
      __publicField(this, "attr", CreateAttrs());
      // attributes (text, flex, grid)
      __publicField(this, "screen", CreateScreens());
      // screens variables (sm, md, lg, xl)
      __publicField(this, "states", CreateStates());
      // states variable (h, f, c, ... --> :hover, :focus, :checked, ... )
      __publicField(this, "colors", CreateColors());
      // colors css variables ($red --> #ef4444)
      __publicField(this, "font", CreateFonts());
      // fonts css variables ($font-mono --> monospace)
      __publicField(this, "reset", CreateReset());
      // css reset and normalize string
      __publicField(this, "autoTheme", false);
      // use system theme (work only in CDN version)
      __publicField(this, "beautify", false);
      // makes css code pretty (work in npm version)
      __publicField(this, "autoFlex", true);
      // [class*="flex-"], [class*="gap-"], ... {display:flex}
      __publicField(this, "useAttr", true);
      // enables/disables the use of attributes
      __publicField(this, "time", false);
      // shows the time of style generation in the console (work only in CDN version)
      __publicField(this, "root", true);
      // enables/disables the creation of :root { ... } with variables
      __publicField(this, "wrapper", ".wrapper");
      // wrapper selector or false to disable
      __publicField(this, "maxPrefix", "m-");
      // prefix that converts min to max-width in @media (m-md:bg-red, m-500:flex-center)
      __publicField(this, "divisionSymbol", "+");
      // NEW! a symbol to separate values (m-20+30 --> margin:20px 30px)
      __publicField(this, "version", version_default);
      // lib version
      __publicField(this, "element", null);
      // all processed classes and attributes are stored here to avoid re-processing
      __publicField(this, "_STORE_", CreateStore());
      this.env = params.env;
      __privateSet(this, _parser, new Parser(this));
      __privateSet(this, _html, new HTMLProcessor(this));
    }
    // element <style> in which the generated styles are located (need use setup method)
    // parsing a single piece of a class or attribute
    parse(token = "", attr = "class") {
      return __privateGet(this, _parser).parse(token, attr);
    }
    // converts html code to css (this is the method used in the npm version)
    html(code = "") {
      return __privateGet(this, _html).css(" " + code);
    }
    // configures everything written above
    config(updates = this, source = this, isFirstCall = true) {
      if (updates === source)
        return source;
      if (!is.obj(updates)) {
        return send_error_default("The blick.config function must contain an object");
      }
      for (let key in updates) {
        if (is.null(updates[key]) || is.undef(updates[key])) {
          delete source[key];
        } else if (is.obj(updates[key]) && !is.arr(updates[key])) {
          if (!source[key] || is.str(source[key])) {
            source[key] = {};
          }
          this.config(updates[key], source[key], false);
        } else {
          source[key] = updates[key];
        }
      }
      if (isFirstCall) {
      }
      return source;
    }
    // creates a <style> and binds it to this context, that is, all the generated styles will be there
    setup(params) {
      const { element, id } = params || {};
      if (typeof window == "undefined") {
        console.log("BlickError: you can only use setup in the browser");
      }
      const STYLE_TAG = element || document.createElement("style");
      STYLE_TAG.id = id || "BLICK_OUTPUT_" + Math.floor(Math.random() * 1e3);
      document.head.append(STYLE_TAG);
      this.element = STYLE_TAG;
      return this;
    }
    // used to update styles (only in the cdn version)
    render() {
      return render_default(this);
    }
    onUpdate() {
    }
  };
  _parser = new WeakMap();
  _html = new WeakMap();

  // src/browser.js
  var BLICK = new BlickCss({ env: "browser" });
  BLICK.setup({
    id: "BLICK_OUTPUT"
  });
  window.blick = BLICK;
  window.BlickCss = BlickCss;
  var observer = new MutationObserver(() => render_default(BLICK));
  var observer_params = {
    attributeFilter: [
      "class",
      ...Object.keys(BLICK.attr)
    ],
    childList: true,
    attributes: true,
    subtree: true
  };
  observer.observe(document.documentElement, observer_params);
})();
//# sourceMappingURL=blick.js.map
