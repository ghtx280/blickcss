import B_CREATE_CSS_STR from "./create-css.js"
import B_CHECK_REC from "./check-rec.js"
import B_UPD_STYLE from "./upd-style.js"
import blick from "../blick-obj.js"

const B_ATTRS_STORE = {
  class: [],
  flex:  [],
  text:  [],
  grid:  [],  
} 

let B_STYLE_STORE = {}
let B_STYLE_STRING = ""
let B_MQ_STORE = 
Object.fromEntries([
  ...(Object.keys(blick.screen).map(e=>[e,{}])),
  ...(Object.keys(blick.screen).map(e=>[blick.maxPrefix+'-'+e,{}])),
  ["dark",{}]
])
let B_MQ_STR = Object.fromEntries(Object.keys(B_MQ_STORE).map(e=>[e,""]))
let B_MQ_ARR = Object.keys(B_MQ_STORE)
let B_MQ_STR_COPY = {...B_MQ_STR} 

export default function(record, B_STYLE_TAG){

  if (document.body) {
    if (B_CHECK_REC(record)) {

      let nodes = document.querySelectorAll(
        `[class],[${blick.attr.flex}],[${blick.attr.text}],[${blick.attr.grid}]`
      )

      if (nodes.length) {
        if (blick.time) console.time('blick. styles upd')
      
        for (const elem of nodes) {
          for (const model in B_ATTRS_STORE) {
            let attr = blick.attr[model] || 'class'
            if (elem.hasAttribute(attr)) {
              for (const str of elem.getAttribute(attr).trim().split(' ').filter(el => el)){
                if (!B_ATTRS_STORE[model].includes(str)) {
                  B_CREATE_CSS_STR(str, model, B_STYLE_STORE, B_MQ_STORE, B_MQ_ARR)
                  B_ATTRS_STORE[model].push(str)
                }
              }
            }
          }
        } 

        function getBeautify(a,b) {
          `${a} {\n  ${b}\n}\n`
        }

        B_MQ_STR = {...B_MQ_STR_COPY}

        for (const key in B_MQ_STORE) {
          for (const [a, b] of Object.entries(B_MQ_STORE[key])) {
            getBeautify(a,b);
            B_MQ_STR[key] += (blick.beautify ? `\n${a} {${b}}` : `${a}{${b}}`)
          }
        }
  
        B_STYLE_STRING = ''

        for (const [a, b] of Object.entries(B_STYLE_STORE)) {
          B_STYLE_STRING += (blick.beautify ? `\n${a} {${b}}` : `${a}{${b}}`)

        }

        B_UPD_STYLE(B_STYLE_STRING, B_MQ_STR, B_STYLE_TAG, B_MQ_STORE)

        if (blick.time) console.timeEnd('blick. styles upd')
      }
    }
  }
}