import blick       from "../blick-obj.js"
import B_STYLE_TAG from "../style-tag.js"
import B_GET_KF    from "./get-kf.js"
import B_GET_MQ    from "./get-mq.js"
import B_GET_ROOT  from "./get-root.js"

const B_VERSION = '1.2.4' 
let B_ROOT
let B_KEYFRAMES

export default function(B_STYLE_STRING, B_MQ_STRING) {
  B_ROOT      ||= B_GET_ROOT(blick)
  B_KEYFRAMES ||= B_GET_KF(blick)

  const B_CSS_RESULT =
  `/* ! blickcss v${B_VERSION} | MIT License | https://blick.netlify.app */\n`
  + (blick.reset || "") 
  + (blick.root  ? B_ROOT : "")
  + (
    blick.useAttr 
    ? `[${blick.attr.flex}]:not([${blick.attr.flex}~=off]){display:flex}`
    + `[${blick.attr.grid}]:not([${blick.attr.grid}~=off]){display:grid}` 
    : ""
  )
  + (blick.autoFlex ? '[class*="flex-"],[class*="jc-"],[class*="ai-"],[class*="gap-"]{display:flex}' : "")
  + (
    blick.wrapper 
    ? `${blick.wrapper}{width:100%;margin:0 auto;padding-left:var(--wrapper-padding,15px);padding-right:var(--wrapper-padding,15px)}` 
    : ""
  )
  + B_STYLE_STRING
  + B_GET_MQ(B_MQ_STRING)
  + (blick.autoTheme ? `@media(prefers-color-scheme:dark){${B_MQ_STRING.dark}}` : B_MQ_STRING.dark) 
  + B_KEYFRAMES

  let prevContext

  if (blick.time) {
    prevContext = B_STYLE_TAG.textContent
  }

  if (blick.beautify) { 
    if (!window.css_beautify) {
      throw new Error("BlickCSS. css_beautify is not defined. Make sure the 'css-beautify' is connected. Read docs for more info https://blick.netlify.app/docs/beautify")
    }
    B_STYLE_TAG.textContent = window.css_beautify(B_CSS_RESULT, blick.beautifyOption)
  }
  else {
    B_STYLE_TAG.textContent = B_CSS_RESULT
  }

  if (blick.time) {
    return prevContext !== B_STYLE_TAG.textContent
  }
}