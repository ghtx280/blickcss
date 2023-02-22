export default (mq, B_MQ_STORE) => {
  let str = ""

  for (const k in B_MQ_STORE) {
    if (k.startsWith('m-')) {
      if (mq[k]) {
        str += `@media(max-width:${blick.screen[k.slice(2)]}){${mq[k]}}`
      }
    }
    else {
      if (blick.screen[k]) {
        str += `@media(min-width:${blick.screen[k]}){.wrapper{max-width:${blick.screen[k]}}${mq[k]}}`
      }
    }
  }

  return str
}