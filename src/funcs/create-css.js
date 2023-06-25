import blick        from "../blick-obj.js";
import B_CREATE_VAL from "./create-val.js"
import B_FROMAT     from "./format.js"
import gmqw         from "./get-mq-width.js";
import B_VAL_PATH   from "./val-path.js"


export default function(str, params, _STORE_) {
  
  let { B_STYLE_STORE, B_MQ_STORE, B_MQ_ARR } = _STORE_ || blick._STORE_ || {}

  let prev_str = str
  let auto_state = ""
  
  const model = (typeof params === "object" ? params.model : params)  || "class"

  const important = str.includes('!') ? str = str.replaceAll('!', '') : false

  const [prop, ...states] = str.split(/(?<!\\):/g).reverse();

  let dec = prop
    .split(';')
    .map(el => B_CREATE_VAL(auto_state = B_VAL_PATH(blick[model], el), model, str))
    .join(";")

  auto_state = auto_state.p?._s || ""

  if (dec === "false" || !dec) {
    return false;
  }

  if (important) {
    dec += '!important';
  }
  const selector = B_FROMAT(prev_str, blick.attr[model] || 'class') + auto_state

  if (!_STORE_) return params ? handle_data(params?.cli) : dec;


  function handle_data(CLI) {
    const CLI_PARAMS = {}

    if (states.length) {
      const state_type = {
        media:  [],
        pseudo: []
      }
  
      for (const state of states.reverse()) {
        state_type[B_MQ_ARR?.includes(state) ? "media" : "pseudo"].push(state)
      }
  
      const str_state = state_type.pseudo.map(state => 
        (state.startsWith("&") ? state.slice(1).replaceAll(/(?<!\\)_/g, " ") : false)
        || blick.states[state] 
        || ":" + state
      ).join("")
      
      if (state_type.media.length) {
        for (const sc of state_type.media) {
          let sel = ((sc === "dark" && !blick.autoTheme) ? blick.dark + " " : "") + selector + str_state
          if (CLI) {
            if (sc.startsWith(blick.maxPrefix + '-')) {
              CLI_PARAMS.media = `(max-width:${gmqw(blick.screen[sc.slice(blick.maxPrefix.length + 1)], true)})`
            }
            else {
              CLI_PARAMS.media = gmqw(blick.screen[sc])
            }
            CLI_PARAMS.mediaKey = sc
            CLI_PARAMS.selector = sel
            CLI_PARAMS.value = dec
          }
          else B_MQ_STORE[sc][sel] = dec
        }
      }
      else {
        if (CLI) {
          CLI_PARAMS.selector = selector + str_state
          CLI_PARAMS.value = dec
        }
        else B_STYLE_STORE[selector + str_state] = dec
      }
    }
    else {
      if (CLI) {
        CLI_PARAMS.selector = selector
        CLI_PARAMS.value = dec
      }
      else B_STYLE_STORE[selector] = dec 
    }

    return CLI_PARAMS
  }
  handle_data(false)
}