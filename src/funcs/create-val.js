import B_CALC_VAL from "./calc-val.js"

export default (sel, model) => {
  
  if (!sel.v) {
    return sel.p.one
  }
  else if (sel.p?._vals) {
    // return sel.p._vals[sel.v] 

    if (sel.p.prop) {
      return sel.p.prop.replaceAll("$", sel.p.vals?.[sel.v] ?? B_CALC_VAL(sel.v, sel, model)) 
    }
    else {
      return sel.p_.vals[sel.v]
    }
  }
  else if (sel.p?.vals || sel.p?.prop) {
    if (sel.p.prop) {
      return sel.p.prop.replaceAll("$", sel.p.vals?.[sel.v] ?? B_CALC_VAL(sel.v, sel, model)) 
    }
    else {
      return sel.p.vals[sel.v]
    }
  }
  else {
    if (model === 'class') {
      return false
    }
    else if (model === 'text') {
      if (parseFloat(sel.v)) return "font-size:" + B_CALC_VAL(sel.v, false, model)
      else return "color:" + B_CALC_VAL(sel.v, false, model)
    }
    else {
      return "gap:" + B_CALC_VAL(sel.v, false, model)
    }
  }
}