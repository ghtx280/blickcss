import B_CALC_VAL from "./calc-val.js"

export default (sel, model, str) => {

  // console.log(sel, model, str);
  
  if (!sel.v) {
    if (typeof sel.p == "string") {
      return sel.p
    }
    else if(typeof sel.p == "function") {
      return sel.p()
    }
    else return sel.p?.one
  }
  else if (sel.p) {
    // console.log(sel);
    if(typeof sel.p == "function") {
      // console.log(sel);
      return sel.p({
        prop:sel.s?.prop,
        val:sel.v,
        sel:sel.s,
      })  
    }
    else if (sel.p.prop) {
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