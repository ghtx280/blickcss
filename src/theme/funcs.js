import B_CALC_VAL   from "../funcs/calc-val.js";
import B_CREATE_CSS from "../funcs/create-css.js";
import B_FROMAT     from "../funcs/format.js";

export function add(obj = {}) {
  if (typeof obj === `object`) {
    if (obj.class) this.class = { ...obj.class, ...this.class }
    if (obj.flex)  this.flex  = { ...obj.flex,  ...this.flex  }
    if (obj.text)  this.text  = { ...obj.text,  ...this.text  }
    if (obj.grid)  this.grid  = { ...obj.grid,  ...this.grid  }
  } else throw new Error(`BlickCSS. The blick.add function must contain an object.`)
}

export function config(obj = {}) {
  if (typeof obj === `object`) {
    for (const key in obj) {
      this[key] = obj[key]
    }
  } else throw new Error(`BlickCSS. The blick.config function must contain an object.`)
}

export const calcVal = B_CALC_VAL
export const css = B_CREATE_CSS
export const format = B_FROMAT