import blick from "../blick-obj.js";
import { getHex, getColor, getAlpha } from "../theme/funcs.js";

export default function (val, sel = {}, model = "class") {

  function getColorCli(color, alpha) {
    let result = ""
    alpha = alpha / 100
    try {
      result = blick._COLOR_(color).alpha(alpha || 0).string()
    } catch (err) {
      throw new SyntaxError(`Invalid color "${color}"`)
    }
    return result
  }

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
            if (/^(\w|#)/.test(n1)) {
              if (blick._COLOR_) {
                return getColorCli(n1, n2)
              }
              return getHex(n1) + getAlpha(n2)
            }
            else if(n1.startsWith("$")){
              let color = getColor(n1.slice(1))
              if (color) {
                if (blick._COLOR_) {
                  return getColorCli(color, n2)
                }
                return getHex(color) + getAlpha(n2)
              }
              else return `var(--${n1.slice(1)});opacity:${n2}`;
            }
            else return `${n1};opacity:${n2 > 1 ? n2 / 100 : n2}`
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
