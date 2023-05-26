import blick        from "../blick-obj.js";
import B_CREATE_VAL from "./create-val.js"
import B_FROMAT     from "./format.js"
import B_VAL_PATH   from "./val-path.js"

export default function(str, model, B_STYLE_STORE, B_MQ_STORE, B_MQ_ARR) {
  let prStr   = str
  let imp     = str.includes('!') ? str = str.replaceAll('!', '') : false
  let sp      = str.split(':')  
  let state   = sp.length !== 1 ? sp.slice(0,sp.length - 1) : false 
  let autoState  
  let dec = sp
    .at(-1)
    .split(';')
    .map(el => B_CREATE_VAL(autoState = B_VAL_PATH(blick[model], el), model, str))
    .join(";")

  autoState = autoState.p?._s || ""

  if (dec === "false") {
    return false;
  }

  if (imp) {
    dec += '!important';
  }

  if (!B_STYLE_STORE && !B_MQ_STORE && !B_MQ_ARR) {
    return dec;
  }

  const selector = B_FROMAT(prStr, blick.attr[model] || 'class') + autoState

  if (state) {
    const mq_states = []
    const ps_states = []

    for (const st of state) {
      if (B_MQ_ARR.includes(st)) {
        mq_states.push(st);
      } else {
        ps_states.push(st);
      }
    }

    const str_state = ps_states.map(st => 
      (st.startsWith("&") ? st.slice(1).replaceAll(/(?<!\\)_/g, " ") : false)
      || blick.states[st] 
      || ":" + st
    ).join("")
    
    if (mq_states.length) {
      for (const sc of mq_states) {
        B_MQ_STORE[sc][((sc === "dark" && !blick.autoTheme) ? blick.dark + " " : "") + selector + str_state] = dec
      }
    }
    else B_STYLE_STORE[selector + str_state] = dec
  }
  else B_STYLE_STORE[selector] = dec 
}