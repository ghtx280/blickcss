import { add, config } from "./obj/funcs.js"
import colors from "./obj/colors.js";
import attr   from "./obj/attr.js";
import states from "./obj/states.js";
import screen from "./obj/screen.js";
import text   from "./obj/text.js";
import _class from "./obj/class.js";
import flex   from "./obj/flex.js";
import grid   from "./obj/grid.js";
import font   from "./obj/font.js";

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

