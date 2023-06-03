import blick from "./blick-obj.js"

let B_MQ_ARR
let B_MQ_STORE
let B_MQ_STRING
let B_MQ_STR_COPY


let B_STYLE_STORE = Object.create(null)
let B_ATTRS_STORE = {
    class: [],
    flex:  [], 
    text:  [],
    grid:  [],  
  }

function F_SET_STORES() {
	F_SET_STORES = false


	B_MQ_STORE = Object.fromEntries([
		...(Object.keys(blick?.screen).map(e=>[e,{}])),
		...(Object.keys(blick?.screen).map(e=>[blick.maxPrefix+'-'+e,{}])),
		["dark",{}]
	])
	
	B_MQ_ARR = Object.keys(B_MQ_STORE)
	B_MQ_STRING = Object.fromEntries(Object.keys(B_MQ_STORE).map(e=>[e,""]))
	B_MQ_STR_COPY = {...B_MQ_STRING} 
}



export { B_MQ_ARR, B_MQ_STORE, B_STYLE_STORE, B_ATTRS_STORE, B_MQ_STR_COPY, B_MQ_STRING, F_SET_STORES }
