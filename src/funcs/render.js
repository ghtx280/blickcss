import blick        from "../blick-obj.js"
import B_CREATE_CSS from "./create-css.js"
import B_UPD_STYLE  from "./upd-style.js"
import B_CHECK_REC  from "./check-rec.js"
import B_STYLE_TAG  from "../style-tag.js"

import {
  B_MQ_ARR,
  B_MQ_STORE,
  B_STYLE_STORE,
  B_ATTRS_STORE,
  B_MQ_STR_COPY,
  B_MQ_STRING,
  F_SET_STORES
} from "../store.js"

let B_STYLE_STRING = ""
let B_MQ_STR = B_MQ_STRING

function timer(label) {
  const startTime = performance.now();
  return {
    stop: function() {
      const endTime = performance.now();
      const elapsedTime = endTime - startTime;
      console.log(`${label}: ${elapsedTime.toFixed(1)}ms`);
    },
  };
}


export default function(record) {
  if (!document.body) return
  if (!(B_CHECK_REC(record) || !B_STYLE_TAG.textContent)) return
  if (F_SET_STORES) F_SET_STORES()
  
  let nodes = document.querySelectorAll(
  `[class],[${blick.attr.flex}],[${blick.attr.text}],[${blick.attr.grid}]`
  )

  if (!nodes.length) return
    
  let consoleTimer

  if (blick.time) consoleTimer = timer('blick. styles upd')

  for (const elem of nodes) {
    for (const model in B_ATTRS_STORE) {
      let attr = blick.attr[model] || 'class'
      if (elem.hasAttribute(attr)) {
        for (const str of elem.getAttribute(attr).trim().split(' ').filter(el => el)){
          if (!B_ATTRS_STORE[model].includes(str)) {
            B_CREATE_CSS(str, model, B_STYLE_STORE, B_MQ_STORE, B_MQ_ARR)
            B_ATTRS_STORE[model].push(str)
          }
        }
      }
    }
  } 

  B_MQ_STR = {...B_MQ_STR_COPY}

  for (const key in B_MQ_STORE) {
    for (const [a, b] of Object.entries(B_MQ_STORE[key])) {
      B_MQ_STR[key] += `${a}{${b}}`
    }
  }

  B_STYLE_STRING = ''

  for (const [a, b] of Object.entries(B_STYLE_STORE)) {
    B_STYLE_STRING += `${a}{${b}}`
  }

  let isUpd = B_UPD_STYLE(B_STYLE_STRING, B_MQ_STR, B_MQ_STORE)

  if (blick.time && isUpd) consoleTimer.stop()
}