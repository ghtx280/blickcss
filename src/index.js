import blick        from "./blick-obj.js"
import B_RENDER     from "./funcs/render.js";

window.blick = blick
window.blickcss = blick

const B_SCRIPT_TAG = document.currentScript

if (B_SCRIPT_TAG?.src.includes('?')) {
	new URLSearchParams(B_SCRIPT_TAG.src)
	.forEach((a,b)=>{
		let num = parseFloat(a)
		blick[b.split('?')[1] ?? b] = isNaN(num) ? a : num
	})
}

const B_STYLE_TAG = document.createElement('style')
B_STYLE_TAG.id = 'BLICK_OUTPUT'
document.head.append(B_STYLE_TAG)

new MutationObserver(rec => B_RENDER(rec, B_STYLE_TAG))
.observe(document.documentElement, {
	attributeFilter: [
		'class',
		blick.attr.text,
		blick.attr.flex,
		blick.attr.grid
	],
	childList: true,
	attributes: true,
	subtree: true,
})