import B_CALC_VAL from "./calc-val.js"

export default function(sel, model, str, attr) {
  if (!sel.v) {
    if (typeof sel.p === "string") {
      return sel.p
    }
    else if(typeof sel.p === "function") {
      return sel.p()
    }
    else if(typeof sel.p?.one === "function") {
      return sel.p.one({ str, attr })
    }
    else return sel.p?.one
  }
  else if (sel.p) {
    if(typeof sel.p === "function") {
      return sel.p({
        prop:sel.s?.prop,
        val:sel.v,
        sel:sel.s,
        str,
        attr
      })  
    }
    else if (sel.p.prop) {
      if (typeof sel.p.prop === "function") {
        return sel.p.prop({
          prop:sel.p?.prop,
          val:sel.p?.vals?.[sel?.v] || sel?.v || "",
          sel:sel.p,
          rawVal:sel?.v,
          str,
          attr
        })
      }
      else {
        return sel.p.prop.replaceAll("$", sel.p.vals?.[sel.v] ?? B_CALC_VAL(sel.v, sel, model)) 
      }
    }
    else {
      return sel.p.vals?.[sel.v]
    }
  }
  else {
    if (model === 'class') {
      return false
    }
    else if (model === 'text') {
      if (parseFloat(sel.v)) return `font-size:${B_CALC_VAL(sel.v, false, model)}`
      else return `color:${B_CALC_VAL(sel.v, false, model)}`
    }
    else {
      return `gap:${B_CALC_VAL(sel.v, false, model)}`
    }
  }
}