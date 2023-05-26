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
          return parseFloat(((n1 / n2) * 100).toFixed(2)) + "%";
        } else if (item.startsWith("$")) {
          return `var(--${item.substring(1)})`;
        } else {
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
