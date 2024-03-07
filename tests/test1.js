import { cssbeautify } from "./src/node/funcs/cssbeautify.js";

import { BlickCss } from "../src/blick.js"


const css = new BlickCss.html(
    `<div class="sq-100 bg-$foo md:flex" text="25 red/50" id="fff"></div>`
)


console.log(cssbeautify(css));
