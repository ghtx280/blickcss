export let B_STYLE_STORE = Object.create(null)
export let B_STYLE_STRING = ""
export let B_MQ_STORE = 
Object.fromEntries([
  ...(Object.keys(blick.screen).map(e=>[e,{}])),
  ...(Object.keys(blick.screen).map(e=>[blick.maxPrefix+'-'+e,{}])),
  ["dark",{}]
])
export let B_MQ_STR = Object.fromEntries(Object.keys(B_MQ_STORE).map(e=>[e,""]))
export let B_MQ_ARR = Object.keys(B_MQ_STORE)
export let B_MQ_STR_COPY = {...B_MQ_STR} 

export let B_ATTRS_STORE = {
  class: [],
  flex:  [],
  text:  [],
  grid:  [],  
} 