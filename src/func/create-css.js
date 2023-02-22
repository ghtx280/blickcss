import blick        from "../blick-obj.js"
import B_CREATE_VAL from "./create-val.js"
import B_FROMATED   from "./formated.js"

export default (str, model, B_STYLE_STORE, B_MQ_STORE, B_MQ_ARR) => {
  let prStr = str
  let imp   = str.includes('!') ? str = str.replaceAll('!', '') : false
  let sl    = str.split(':')  
  let state = sl.length !== 1 ? sl.slice(0,sl.length-1) : false  
  let sp    = sl[sl.length-1].split("-").map(e=>e.trim())
  let fs    = blick[model][sp[0]]?.[sp[1]]
  let sc    = blick[model][sp[0]]
  let dec   = [fs??sc,fs?2:1]

  let sel   = dec[0] 
  let val   = sp.slice(dec[1]).join('-') || false
  let one   = sp.length === 1 ? (sel?.one || val) : false
  let prop  = sel?.prop || val || sp[0]

  if (!sel && model === 'class') return false
  if (one === undefined && model === 'class') return false
  

  if (prop) { 
    let create = B_CREATE_VAL(val, one, prop, sel, str, model)

    if (!create) return false 
    if (imp) create += '!important' 
    
    create = create.replaceAll("_", " ")
    
    model = blick.attr[model] || 'class'
    
    if (state) {
      for (const st of state) { 
        if (B_MQ_ARR.includes(st)) {
          B_MQ_STORE[st][B_FROMATED(prStr,model)] = create
        } else {
          B_STYLE_STORE[B_FROMATED(prStr,model) + blick.states[st] ?? st] = create
        }
      }
    } 
    else B_STYLE_STORE[B_FROMATED(prStr,model)] = create
  }
}