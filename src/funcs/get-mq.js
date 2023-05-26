import blick from "../blick-obj.js"
import { B_MQ_STORE } from "../store.js"

export default function(mq) {
  let str = ""

  for (const k in B_MQ_STORE) {
    if (k.startsWith(blick.maxPrefix + '-')) {
      if (mq[k]) {
        str += `@media(max-width:${blick.screen[k.slice(blick.maxPrefix.length + 1)]}){${mq[k]}}`
      }
    }
    else {
      if (blick.screen[k]) {
        if (mq[k] || blick.wrapper) {
          str += `@media(min-width:${blick.screen[k]}){${
            blick.wrapper ? `${blick.wrapper}{max-width:${blick.screen[k]}}` : ""
          }${mq[k]}}`
        }
      }
    }
  }
  
  return str
}