// import blick from "../blick-obj.js";
import colors from "../theme/colors.js";
import { hex, getColor, getShade } from "../theme/funcs.js";




export default function (val, sel = {}, model = "class") {
  if (!sel.p && typeof sel === "object") {
    sel.p = sel;
  }

  if (val) {
    return val
      .split(/(?<!\\)\+/g)
      .map((item) => {
        item = item.replaceAll("\\", "");

        if (item.includes("/")) {
          const [n1, n2] = item.split("/");
          if (isNaN(n1[0])) {
            if (/^(\w|rgb|#)/.test(n1)) {
              return hex(n1) + getShade(n2)
            }
            else if(n1.startsWith("$")){
              let color = getColor(n1.slice(1))
              if (color) {
                return hex(color) + getShade(n2)
              }
              else return `var(--${n1.slice(1)});opacity:${n2}`;
            }
            else return `${n1};opacity:${n2}`
          }
          else return parseFloat(((n1 / n2) * 100).toFixed(2)) + "%";
        }
        else if (item.startsWith("$")) {
          return `var(--${item.slice(1)})`;
        }
        else {
          const defaultValue = sel.p?.def ?? (model !== "class" ? "px" : "");
          return !isNaN(item) ? item + defaultValue : item;
        }
      })
      .join(sel.p?.join ?? " ")
      .replaceAll(/(?<!\\)_/g, " ");
  } else {
    return "";
  }
}
