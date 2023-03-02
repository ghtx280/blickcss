export default (val, sel, model) => {
  if (val) {
    return val.split('+').map(i => {
      if (i.includes('/')) {
        return parseFloat((i.split("/")[0] / i.split("/")[1] * 100).toFixed(2)) + '%'
      }
      else if (i.includes('$')) {
        return `var(--${i.slice(1)})`
      }
      else {
        return !isNaN(i) ? i + (sel.p?.def ?? (model !== "class" ? 'px' : '')) : i
      }
    }).join(sel.p?.join ?? ' ').replaceAll("_", " ")
  }
  else return '' 
}