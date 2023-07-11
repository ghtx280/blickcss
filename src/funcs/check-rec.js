export default function (rec) {
  if (rec === undefined) return true;

  const g = (el, at) => !!el?.getAttribute?.(at);

  const elems = ["STYLE", "SCRIPT", "HEAD", "HTML", "#text"];

  function B_CHECK_ELEM(el) {
    if (!el || !el?.nodeName) return false;
    const a = blick.attr;
    return (
      !elems.includes(el?.nodeName) ||
      g(el, "class") ||
      g(el, a.flex) ||
      g(el, a.text) ||
      g(el, a.grid)
    );
  }

  if (rec.length !== 1) return "0";
  if (B_CHECK_ELEM(rec[0].target)) return "t";
  if (rec[0].addedNodes.length > 1) return "a0";
  else {
    if (B_CHECK_ELEM(rec[0].addedNodes[0])) return "a1";
  }
}
