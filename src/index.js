import blick    from "./blick-obj.js"
import B_RENDER from "./funcs/render.js";

window.blick = blick
window.blickcss = blick

const B_SCRIPT_TAG = document.currentScript

if (B_SCRIPT_TAG?.src.includes('?')) {
	new URLSearchParams(B_SCRIPT_TAG.src.split("?")[1])
	.forEach((val, prop) => {
		blick[prop] = (
			["", "1", "true"].includes(val) ||
			!["0","false"].includes(val) && val
		)
	})
}

new MutationObserver(B_RENDER)
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