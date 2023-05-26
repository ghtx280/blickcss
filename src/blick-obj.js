import _class from "./theme/class.js";
import flex   from "./theme/flex.js";
import grid   from "./theme/grid.js";
import text   from "./theme/text.js";
import screen from "./theme/screen.js";
import states from "./theme/states.js";
import attr   from "./theme/attr.js";
import colors from "./theme/colors.js";
import font   from "./theme/font.js";
import reset  from "./theme/reset.js";
import { config, calcVal, css, format } from "./theme/funcs.js"


export default {
  class:_class,
  flex,
  grid,
  text,
  screen,
  states,
  attr,
  colors,
  font,
  autoTheme: false,
  reset,
  root: true,
  time: false,
  wrapper:'.wrapper',
  useAttr:true,
  beautify:false,
  beautifyOption:{},
  maxPrefix:'m',
  dark:".theme-dark",
  autoFlex:true,

  config,
  calcVal,
  css,
  format
};

