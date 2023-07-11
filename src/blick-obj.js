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
import  * as funcs  from "./theme/funcs.js"

const blick = {
  class:_class,
  flex,
  grid,
  text,
  screen,
  states,
  attr,
  colors,
  font,
  reset,
  
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

  version: '1.3.5',

  ...funcs
}

export default blick

