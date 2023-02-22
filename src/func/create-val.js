import B_CALC_VAL from "./calc-val.js"

export default (val, one, prop, sel, str, model) => {
  if (one) {
    return one 
  }
  else if (sel?._vals?.[val]) {
    return sel?._vals[val] 
  }
  else if (sel?.vals && !sel?.prop) {
    return sel?.vals[val]
  }
  else { 
    if (model === 'flex' || model === 'grid') {
      return "gap:" + B_CALC_VAL(str, false, model)
    }
    else if (model === 'text') {
      if (parseFloat(prop)) return "font-size:" + B_CALC_VAL(str, false, model)
      else return "color:" + str
    }
    else {
      return prop.replaceAll('$',
        sel.vals ? (sel.vals[val] ?? B_CALC_VAL(val, sel)) : B_CALC_VAL(val, sel)
      )
    }
  }
}