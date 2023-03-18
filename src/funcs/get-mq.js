export default (mq, B_MQ_STORE) => {
  let str = ""

  for (const k in B_MQ_STORE) {
    if (k.startsWith(blick.maxPrefix+'-')) {
      if (mq[k]) {
        str += (
          blick.beautify
          ? `\n\n@media(max-width:${blick.screen[k.slice(blick.maxPrefix.length + 1)]}){${mq[k]}\n}`
          : `@media(max-width:${blick.screen[k.slice(blick.maxPrefix.length + 1)]}){${mq[k]}}`
        )
      }
    }
    else {
      if (blick.screen[k]) {
        if (mq[k] || blick.wrapper) {
          str += (
            blick.beautify
            ? `\n@media(min-width:${blick.screen[k]}){${
              blick.wrapper ? `\n.wrapper {max-width:${blick.screen[k]}}` : ""
            }${mq[k]}\n}`
            : `@media(min-width:${blick.screen[k]}){${
              blick.wrapper ? `.wrapper{max-width:${blick.screen[k]}}` : ""
            }${mq[k]}}`
          )
        }
      }
    }
  }
  return str
}