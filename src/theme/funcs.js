import B_CALC_VAL   from "../funcs/calc-val.js";
import B_CREATE_CSS from "../funcs/create-css.js";
import B_FROMAT     from "../funcs/format.js";


export function config(updates, source = this){
  if (typeof updates !== `object`) throw new Error(`BlickCSS. The blick.config function must contain an object.`)
  for (let key in updates) {
    if (typeof updates[key] === 'object' && updates[key] !== null && !Array.isArray(updates[key])) {
      if (!source[key]) {
        source[key] = {};
      }
      this.config(updates[key], source[key]);
    } else {
      source[key] = updates[key];
    }
  }
  return source;
}

export const calcVal = B_CALC_VAL
export const css = B_CREATE_CSS
export const format = B_FROMAT