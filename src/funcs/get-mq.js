import blick from "../blick-obj.js"
import { B_MQ_STORE } from "../store.js"

export default function(mq) {
  let str = ""

  const getScr = (scr, raw) => {
    const f = (str, st) => isNaN((str+"")[0]) ? str : `${st}-width:${str}`;
    const u = num => isNaN(+num) ? num : `${num}px`

    if (typeof scr === "object") {
      const [min, max] = scr
      if (raw) {
        return u(max || min)
      }
      return `(${f(u(min),"min")})${max ? ` and (${f(u(max),"max")})` : ""}`
    }
    else {
      if (raw) {
        return  u((scr+"").replaceAll(/[()]/g, "").split(":").at(-1))
      }
      return scr[0] === "(" ? scr : `(${f(u(scr),"min")})`
    }
  }

  for (const k in B_MQ_STORE) {
    if (k.startsWith(blick.maxPrefix + '-')) {
      if (mq[k]) {
        const scr = blick.screen[k.slice(blick.maxPrefix.length + 1)]
        str += `@media (max-width:${getScr(scr, true)}){${mq[k]}}`
      }
    }
    else {
      if (blick.screen[k]) {
        if (mq[k] || blick.wrapper) {
          const scr = blick.screen[k]
          str += `@media ${getScr(scr)}{${
            blick.wrapper ? `${blick.wrapper}{max-width:${getScr(scr, true)}}` : ""
          }${mq[k]}}`
        }
      }
    }
  }
  
  return str
}