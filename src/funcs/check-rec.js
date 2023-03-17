export default (rec) => {
  const elems = ["STYLE","SCRIPT","HEAD","#text"]

  function B_CHECK_ELEM(el) {
    if (!elems.includes(el.nodeName)) {
      return !(el.getAttribute('class') ||
      el.getAttribute(blick.attr.flex)  ||
      el.getAttribute(blick.attr.text)  ||
      el.getAttribute(blick.attr.grid))
    } else return false
  } 

  if (rec.length !== 1) return true
  else if (B_CHECK_ELEM(rec[0].target)) return true 
  else if (rec[0].addedNodes.length !== 1) return true 
  else if (B_CHECK_ELEM(rec[0].addedNodes[0])) return true 
  else return false
}