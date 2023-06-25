import blick from "../blick-obj.js"
import { B_MQ_STORE } from "../store.js"
import getMqWidth from "./get-mq-width.js"

export default function(mq) {
  let str = ""

  

  for (const k in B_MQ_STORE) {
    if (k.startsWith(blick.maxPrefix + '-')) {
      if (mq[k]) {
        const scr = blick.screen[k.slice(blick.maxPrefix.length + 1)]
        str += `@media (max-width:${getMqWidth(scr, true)}){${mq[k]}}`
      }
    }
    else {
      if (blick.screen[k]) {
        if (mq[k] || blick.wrapper) {
          const scr = blick.screen[k]
          str += `@media ${getMqWidth(scr)}{${
            blick.wrapper ? `${blick.wrapper}{max-width:${getMqWidth(scr, true)}}` : ""
          }${mq[k]}}`
        }
      }
    }
  }
  
  return str
}