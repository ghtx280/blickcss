import B_CALC_VAL   from "../funcs/calc-val.js";
import B_CREATE_CSS from "../funcs/create-css.js";
import B_FROMAT     from "../funcs/format.js";

export function config(updates, source = this, isFirstCall = true) {
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

export function hex(str){
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = str;
  const color = ctx.fillStyle
  canvas.remove()
  return color
}

export function getColor(str) {
  const [colorName, shade] = str.split('-');

  if (shade !== undefined) {
    if (colors.hasOwnProperty(colorName) && colors[colorName].hasOwnProperty(shade)) {
      return colors[colorName][shade];
    }
  }

  return colors[colorName]?.["def" || "DEFAULT"];
}

export function getShade(str) {
  let shade = Math.round(+str / 100 * 255).toString(16);
  if (shade.length === 1) {
    shade = "0" + shade
  }
  return shade
}

export const calcVal = B_CALC_VAL
export const css = B_CREATE_CSS
export const format = B_FROMAT