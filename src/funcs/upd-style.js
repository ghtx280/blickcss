import blick       from "../blick-obj.js"
import B_CSS_RESET from "../reset.js" 
import B_GET_MQ    from "./get-mq.js"
import B_GET_ROOT  from "./get-root.js"

const B_VERSION = '1.2.1' 
const B_ROOT = B_GET_ROOT(blick)

export default function(B_STYLE_STRING, B_MQ_STR, B_STYLE_TAG, B_MQ_STORE) {

  const B_CSS_RESULT =
  `/* ! blickcss v${B_VERSION} | MIT License | https://blick.netlify.app */\n` +
  (blick.reset ? B_CSS_RESET : "") +
  (blick.root  ? B_ROOT      : "") +
  (
    blick.useAttr 
    ? `[${blick.attr.flex}]:not([${blick.attr.flex}~=off]){display:flex}`
    + `[${blick.attr.grid}]:not([${blick.attr.grid}~=off]){display:grid}` 
    : ""
  ) +
  (
    blick.autoFlex
    ? '[class*="flex-"],[class*="jc-"],[class*="ai-"],[class*="gap-"]{display:flex}'
    : ""
  ) +
  (
    blick.wrapper 
    ? `${blick.wrapperName}{width:100%;margin:0 auto;padding-left:var(--wrapper-padding,15px);padding-right:var(--wrapper-padding,15px)}` 
    : ""
  ) +
  B_STYLE_STRING + 
  B_GET_MQ(B_MQ_STR, B_MQ_STORE) +
  (
    blick.autoTheme 
    ? `@media(prefers-color-scheme:dark){${B_MQ_STR.dark}}` 
    : B_MQ_STR.dark
  )

  let prevContext = B_STYLE_TAG.textContent

  if (blick.beautify) { 
    if (!window.css_beautify) {
      throw new Error("BlickCSS. css_beautify is not defined. Make sure the 'css-beautify' is connected. Read docs for more info https://blick.netlify.app/docs/beautify")
    }
    B_STYLE_TAG.textContent = window.css_beautify(B_CSS_RESULT,blick.beautifyOption)
  }
  else {
    B_STYLE_TAG.textContent = B_CSS_RESULT
  }

  return prevContext !== B_STYLE_TAG.textContent
 
}