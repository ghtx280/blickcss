import blick from "../blick-obj.js"
import B_CSS_RESET from "../reset.js" 
import B_GET_MQ from "./get-mq.js"
import B_GET_ROOT from "./get-root.js"


const B_VERSION = '1.0.2' 


export default (B_STYLE_STRING, B_MQ_STR, B_STYLE_TAG, B_MQ_STORE) => {

  B_STYLE_TAG.textContent =

  `/* ! blickcss v${B_VERSION} | MIT License | https://blick.netlify.app */\n` +

  (blick.reset ? B_CSS_RESET       : "") +
  (blick.root  ? B_GET_ROOT(blick) : "") +

  `[${blick.attr.flex}]:not([${blick.attr.flex}~=off]){display:flex}`+
  `[${blick.attr.grid}]:not([${blick.attr.grid}~=off]){display:grid}`+

  `.wrapper{width:100%;margin:0 auto;padding-left:var(--wrapper-padding,15px);padding-right:var(--wrapper-padding,15px)}`+
  
  B_STYLE_STRING + 
  B_GET_MQ(B_MQ_STR, B_MQ_STORE) +

  (
    blick.autoTheme
    ? "@media(prefers-color-scheme:dark){" + B_MQ_STR.dark + "}" 
    : (document.body?.classList.contains('theme-dark') ? B_MQ_STR.dark : '')
  )
}