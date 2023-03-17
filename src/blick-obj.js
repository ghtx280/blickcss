import { add, config } from "./theme/funcs.js"
import colors from "./theme/colors.js";
import attr   from "./theme/attr.js";
import states from "./theme/states.js";
import screen from "./theme/screen.js";
import text   from "./theme/text.js";
import _class from "./theme/class.js";
import flex   from "./theme/flex.js";
import grid   from "./theme/grid.js";
import font   from "./theme/font.js";

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
  reset: true,
  root: true,
  time: false,
  add,
  config
};

