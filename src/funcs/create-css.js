import blick        from "../blick-obj.js";
import B_CREATE_VAL from "./create-val.js"
import B_FROMAT     from "./format.js"
import B_VAL_PATH   from "./val-path.js"

export default (str, model, B_STYLE_STORE, B_MQ_STORE, B_MQ_ARR) => {
  let prStr   = str
  let imp     = str.includes('!') ? str = str.replaceAll('!', '') : false
  let splited = str.split(':')  
  let state   = splited.length !== 1 ? splited.slice(0,splited.length - 1) : false  
  let sel     = B_VAL_PATH(blick[model], splited[splited.length - 1])
  let create  = B_CREATE_VAL(sel, model)

  if (create) {
    if (imp) create += '!important' 
    
    model = blick.attr[model] || 'class'
    
    if (state) {
      for (const st of state) { 
        if (B_MQ_ARR.includes(st)) {
          B_MQ_STORE[st][B_FROMAT(prStr,model)] = create
          return (B_FROMAT(prStr,model)) + `{${create}}` 
        }
        else {
          if (st.includes('&')) { 
            B_STYLE_STORE[B_FROMAT(prStr,model) + st.replaceAll("_", " ").replace("&",'')] = create
            return (B_FROMAT(prStr,model) + st.replaceAll("_", " ").replace("&",'')) + `{${create}}` 
          }
          else {
            B_STYLE_STORE[B_FROMAT(prStr,model) + (blick.states[st] ?? ":"+st)] = create
            return (B_FROMAT(prStr,model) + (blick.states[st] ?? ":"+st)) + `{${create}}` 
          }
        }
      }
    }
    else B_STYLE_STORE[B_FROMAT(prStr,model)] = create
    return B_FROMAT(prStr,model) + `{${create}}`
  }
  else return false
}