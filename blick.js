const flex_content_values = {
	c: 'center',
	bl: 'baseline',
	s: 'flex-start',
	e: 'flex-end',
	sb: 'space-between',
	sa: 'space-around',
	se: 'space-evenly',
}
const flex_items_values = {
	c: 'center',
	bl: 'baseline',
	s: 'flex-start',
	e: 'flex-end',
	st: 'stretch',
}


const blick = {
	class: {
		m: {
			prop: 'margin:$', def: 'px'
		},
		my: {
			prop: "margin-top:$;margin-bottom:$", def: "px"
		},
		mx: {
			prop: "margin-left:$;margin-right:$", def: "px"
		},
		mt: {
			prop: 'margin-top:$', def: 'px'
		},
		mr: {
			prop: 'margin-right:$', def: 'px'
		},
		mb: {
			prop: 'margin-bottom:$', def: 'px'
		},
		ml: {
			prop: 'margin-left:$', def: 'px'
		},
		p: {
			prop: 'padding:$', def: 'px'
		},
		py: {
			prop: "padding-top:$;padding-bottom:$", def: "px"
		},
		px: {
			prop: "padding-left:$;padding-right:$", def: "px"
		},
		pt: {
			prop: 'padding-top:$', def: 'px'
		},
		pr: {
			prop: 'padding-right:$', def: 'px'
		},
		pb: {
			prop: 'padding-bottom:$', def: 'px'
		},
		pl: {
			prop: 'padding-left:$', def: 'px'
		},
		b: {
			prop: 'border-width:$', def: 'px'
		},
		bt: {
			prop: 'border-top-width:$', def: 'px'
		},
		br: {
			prop: 'border-right-width:$', def: 'px'
		},
		bb: {
			prop: 'border-bottom-width:$', def: 'px'
		},
		bl: {
			prop: 'border-left-width:$', def: 'px'
		},
		bc: {
			prop: 'border-color:$'
		},
		bs: {
			prop: 'border-style:$'
		},
		border: {
			one: 'border:1px solid', prop: 'border:$', def: 'px'
		},
		scale: {
			prop: 'scale:$', def: ''
		},
		rotate: {
			prop: 'rotate:$', def: 'deg'
		},
		translate: {
			prop: 'translate:$', def: 'px'
		},
		skewX: {
			prop: 'transform:skewX($)', def: 'deg'
		},
		skewY: {
			prop: 'transform:skewY($)', def: 'deg'
		},
		accent: {
			prop: 'accent-color:$'
		},
		caret: {
			prop: 'caret-color:$'
		},
		fill: {
			prop: 'fill:$'
		},
		stroke: {
			prop: 'stroke:$'
		},
		unappearance: {
			one: 'appearance:none',
		},
		flip: {
			one: 'scale:-1 -1',
			prop: 'scale:$',
			vals: { x: '-1 1', y: '1 -1' }
		},
		w: {
			prop: 'width:$',
			vals: {
				full: '100%',
				half: '50%',
				min: 'min-content',
				fit: 'fit-content',
				max: 'max-content',
				screen: '100vw'
			},
			def: 'px'
		},
		h: {
			prop: 'height:$',
			vals: {
				full: '100%',
				half: '50%',
				min: 'min-content',
				fit: 'fit-content',
				max: 'max-content',
				screen: '100vh'
			},
			def: 'px'
		},
		minW: {
			prop: 'min-width:$',
			vals: {
				full: '100%',
				half: '50%',
				min: 'min-content',
				fit: 'fit-content',
				max: 'max-content',
				screen: '100vw'
			},
			def: 'px'
		},
		minH: {
			prop: 'min-height:$',
			vals: {
				full: '100%',
				half: '50%',
				min: 'min-content',
				fit: 'fit-content',
				max: 'max-content',
				screen: '100vh'
			},
			def: 'px'
		},
		maxW: {
			prop: 'max-width:$',
			vals: {
				full: '100%',
				half: '50%',
				min: 'min-content',
				fit: 'fit-content',
				max: 'max-content',
				screen: '100vw'
			},
			def: 'px'
		},
		maxH: {
			prop: 'max-height:$',
			vals: {
				full: '100%',
				half: '50%',
				min: 'min-content',
				fit: 'fit-content',
				max: 'max-content',
				screen: '100vh'
			},
			def: 'px'
		},
		hue: {
			prop: 'filter:hue-rotate($)', def: 'deg'
		},
		d: {
			prop: 'display:$',
			vals: {
				inblock: 'inline-block',
				inflex: 'display:inline-flex',
				ingrid: 'display:inline-grid'
			}
		},
		inline: {
			one: 'display:inline'
		},
		block: {
			one: 'display:block'
		},
		inblock: {
			one: 'display:inline-block'
		},
		inflex: {
			one: 'display:inline-flex'
		},
		ingrid: {
			one: 'display:inline-grid'
		},
		upper: {
			one: "text-transform:uppercase"
		},
		uppercase: {
			one: "text-transform:uppercase"
		},
		lower: {
			one: "text-transform:lowercase"
		},
		lowercase: {
			one: "text-transform:lowercase"
		},
		capit: {
			one: "text-transform:capitalize"
		},
		capitalize: {
			one: "text-transform:capitalize"
		},
		hide: {
			one: "display:none!important"
		},
		pos: {
			prop: "position:$"
		},
		abs: {
			one: 'position:absolute'
		},
		absolute: {
			one: 'position:absolute'
		},
		rel: {
			one: 'position:relative'
		},
		relative: {
			one: 'position:relative'
		},
		sticky: {
			one: 'position:sticky'
		},
		fixed: {
			one: 'position:fixed'
		},
		center: {
			one: "margin:auto"
		},
		invert: {
			prop: 'filter:invert($)'
		},
		r: {
			prop: 'border-radius:$', def: 'px'
		},
		round: {
			one: 'border-radius:9999px', prop: 'border-radius:$', def: 'px'
		},
		transition: {
			prop: 'transition:$', def: 'ms'
		},
		select: {
			prop: 'user-select:$'
		},
		fit: {
			prop: 'object-fit:$'
		},
		bg: {
			prop: 'background:$',
			_vals: {
				fixed: 'background-attachment:fixed',
				local: 'background-attachment:local',
				scroll: 'background-attachment:scroll',
				'clip-border': 'background-clip:border-box',
				'clip-padding': 'background-clip:padding-box',
				'clip-content': 'background-clip:content-box',
				'clip-text': 'background-clip:text',
				'origin-border': 'background-origin:border-box',
				'origin-padding': 'background-origin:padding-box',
				'origin-content': 'background-origin:content-box',
			},

		},
		c: {
			prop: 'color:$'
		},
		over: {
			prop: 'overflow:$'
		},
		overX: {
			prop: 'overflow-x:$'
		},
		overY: {
			prop: 'overflow-y:$'
		},
		snap: {
			vals: {
				x: 'scroll-snap-type:x mandatory',
				y: 'scroll-snap-type:y mandatory',
				start: 'scroll-snap-align:start',
				center: 'scroll-snap-align:center',
				end: 'scroll-snap-align:end',
				stop: 'scroll-snap-stop: always',
			}
		},
		shadow: {
			vals: {
				box: 'box-shadow:3px 4px 3px #0000004d',
				text: 'text-shadow:3px 4px 3px #0000004d'
			}
		},
		cursor: {
			prop: 'cursor:$'
		},
		resize: {
			prop: 'resize:$',
			vals: { x: 'horizontal', y: 'vertical', }
		},
		top: {
			prop: 'top:$', def: 'px'
		},
		right: {
			prop: 'right:$', def: 'px'
		},
		bottom: {
			prop: 'bottom:$', def: 'px'
		},
		left: {
			prop: 'left:$', def: 'px'
		},
		ratio: {
			prop: 'aspect-ratio:$',
			vals: { sqr: '1/1', vid: '16/9' }
		},
		box: {
			prop: 'box-sizing:$',
			vals: {
				content: 'content-box',
				border: 'border-box'
			}
		},
		float: {
			prop: 'float:$',
		},
		clear: {
			prop: 'clear:$',
			vals: { x: 'horizontal', y: 'vertical' }
		},
		z: {
			prop: 'z-index:$',
		},
		visible: {
			one: 'visibility:visible',
		},
		invisible: {
			one: 'visibility:hidden',
		},
		collapse: {
			one: 'visibility:collapse',
		},
		opacity: {
			prop: 'opacity:$'
		},
		blend: {
			prop: 'mix-blend-mode:$'
		},
		blur: {
			prop: 'filter:blur($)', def: 'px'
		},
		brightness: {
			prop: 'filter:brightness($)',
		},
		contrast: {
			prop: 'filter:contrast($)',
		},
		saturate: {
			prop: 'filter:saturate($)',
		},
		contrast: {
			prop: 'filter:contrast($)',
		},
		grayscale: {
			prop: 'filter:grayscale($)', def: '%'
		},
		sepia: {
			prop: 'filter:sepia($)', def: '%'
		},
		pointer: {
			one: 'cursor:pointer'
		},
		sharp: {
			one: 'border-radius:0!important'
		},
		fsz: {
			prop: 'font-size:$', def: 'px'
		},
		fst: {
			prop: 'font-style:$'
		},
		ffm: {
			prop: 'font-family:$',
			vals: {
				sans:  'var(--font-sans)',
				serif: 'var(--font-serif)',
				mono:  'var(--font-mono)'
			}
		},
		fwg: {
			prop: 'font-weight:$'
		},
		wsp: {
			prop: 'white-space:$'
		},
		space: {
			prop: 'white-space:$'
		},
		list: {
			prop: 'list-style:$'
		},
		align: {
			prop: 'text-align:$'
		},
		decorate: {
			prop: 'text-decoration:$'
		},
		tdc: {
			prop: 'text-decoration:$',
			vals: { line: 'underline' }
		},
		outline: {
			prop: 'outline:$', def: 'px'
		},
		grad: {
			prop: 'background:linear-gradient($)',
			def: 'deg',
			join: ','
		},
		flex: {
			one: 'display:flex',
			vals: {
				center: 'justify-content:center;align-items:center',
				col: 'flex-direction:column',
				'col-rev': 'flex-direction:column-reverse',
				row: 'flex-direction:row',
				'row-rev': 'flex-direction:row-reverse',
				space: 'justify-content:space-between;align-items:center',
				wrap: 'flex-wrap:wrap',
				"wrap-rev": 'flex-wrap:wrap-reverse',
				nowrap: 'flex-wrap:nowrap',
				stretch: 'align-items:stretch'
			}
		},
		gap: {
			prop: 'gap:$', def: 'px'
		},
		gapX: {
			prop: 'column-gap:$', def: 'px'
		},
		gapY: {
			prop: 'row-gap:$', def: 'px'
		},
		jc: {
			prop: 'justify-content:$',
			vals: flex_content_values
		},
		ji: {
			prop: 'justify-items:$',
			vals: flex_items_values
		},
		ac: {
			prop: 'align-content:$',
			vals: flex_content_values
		},
		ai: {
			prop: 'align-items:$',
			vals: flex_items_values
		},
		order: {
			prop: 'order:$',
		},
		basis: {
			prop: 'flex-basis:$'
		},
		grow: {
			one: 'flex-grow:1', prop: 'flex-grow:$'
		},
		shrink: {
			one: 'flex-shrink:1', prop: 'flex-shrink:$',
		},
		break: {
			prop: 'word-break:$',
			vals: { all: 'break-all', keep: 'keep-all' }
		},
	},
	flex: {
		order: {
			prop: 'order:$'
		},
		basis: {
			prop: 'flex-basis:$'
		},
		col: {
			one: 'flex-direction:column',
			vals: {
				start: 'flex-direction:column;align-items:flex-start',
				center: 'flex-direction:column;align-items:center',
				end: 'flex-direction:column;align-items:flex-end',
				rev: 'flex-direction:column-reverse'
			}
		},
		row: {
			one: 'flex-direction:row',
			vals: {
				start: 'flex-direction:row;justify-content:flex-start',
				center: 'flex-direction:row;justify-content:center',
				end: 'flex-direction:row;justify-content:flex-end',
				rev: 'flex-direction:row-reverse'
			}
		},
		colRev: {
			one: 'flex-direction:column-reverse',
		},
		rowRev: {
			one: 'flex-direction:row-reverse',
		},
		center: {
			one: 'justify-content:center;align-items:center'
		},
		space: {
			one: 'justify-content:space-between;align-items:center'
		},
		stretch: {
			one: 'align-items:stretch'
		},
		wrap: {
			one: 'flex-wrap:wrap',
			prop: 'flex-wrap:$',
			vals: { rev: 'wrap-reverse' }
		},
		grow: {
			one: 'flex-grow:1',
			prop: 'flex-grow:$'
		},
		shrink: {
			one: 'flex-shrink:1',
			prop: 'flex-shrink:$',
		},
		jc: {
			prop: 'justify-content:$',
			vals: flex_content_values
		},
		ji: {
			prop: 'justify-items:$',
			vals: flex_items_values
		},
		ac: {
			prop: 'align-content:$',
			vals: flex_content_values
		},
		ai: {
			prop: 'align-items:$',
			vals: flex_items_values
		},
	},
	grid: {
		cols: {
			prop: 'grid-template-columns:repeat($,1fr)',
		},
		rows: {
			prop: 'grid-template-rows:repeat($,1fr)',
		},
		jc: {
			prop: 'justify-content:$',
			vals: flex_content_values
		},
		ji: {
			prop: 'justify-items:$',
			vals: flex_items_values
		},
		ac: {
			prop: 'align-content:$',
			vals: flex_content_values
		},
		ai: {
			prop: 'align-items:$',
			vals: flex_items_values
		},
	},
	text: {
		tp: {
			one: 'color:transparent!important'
		},
		cols: {
			prop: 'columns:$'
		},
		lh: {
			prop: 'line-height:$'
		},
		bold: {
			one: 'font-weight:bold'
		},
		bolder: {
			one: 'font-weight:bolder'
		},
		wg: {
			prop: 'font-weight:$'
		},
		thin: {
			one: 'font-weight:lighter'
		},
		normal: {
			one: 'font-weight:normal'
		},
		italic: {
			one: 'font-style: italic'
		},
		delete: {
			one: 'text-decoration-line:line-through'
		},
		line: {
			one: 'text-decoration-line:underline'
		},
		overline: {
			one: 'text-decoration-line:overline'
		},
		up: {
			one: 'text-transform:uppercase'
		},
		low: {
			one: 'text-transform:lowercase'
		},
		cap: {
			one: 'text-transform:capitalize'
		},
		center: {
			one: 'text-align:center'
		},
		left: {
			one: 'text-align:left'
		},
		right: {
			one: 'text-align:right'
		},
		justify: {
			one: 'text-align:justify'
		},
		mono: {
			one: 'font-family:var(--font-mono)'
		},
		serif: {
			one: 'font-family:var(--font-serif)'
		},
		sans: {
			one: 'font-family:var(--font-sans)'
		},
		font: {
			prop: 'font-family:$'
		},
		vertical: {
			one: 'writing-mode:vertical-lr'
		},
		wrap: {
			one: 'word-wrap:break-word'
		},
		shadow: {
			one: 'text-shadow:3px 3px 2px #0000004d',
			prop: 'text-shadow:$',
			def: 'px',
		},
		stroke: {
			prop: '-webkit-text-stroke:$',
			def: 'px',
		},
		dots: {
			one: 'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%'
		},
		align: {
			prop: 'vertical-align:$'
		},
		space: {
			prop: 'white-space:$'
		},
		break: {
			prop: 'word-break:$',
			vals: { all: 'break-all', keep: 'keep-all', }
		},
	},
	screen: {
		min: '576px',
		max: '1024px'
	},
	states: {
		h: ':hover',
		f: ':focus',
		c: ':checked',
		a: ':active',
		first: '>*:first-child',
		last: '>*:last-child',
		odd: '>*:nth-child(odd)',
		even: '>*:nth-child(even)',
		all: ' *',
		every: '>*',
		after: '::after',
		before: '::before',
	},
	attr: {
		text: 'text',
		flex: 'flex',
		grid: 'grid'
	},
	colors:{
		black:{ def:'#000' },
		white:{ def:'#fff' },
		gray:{
			def:'#888',
			1:'#dbdbdb',
			2:'#b8b8b8',
			3:'#585858',
			4:'#353535'
		},
		red:{
			def:'#f03333',
			1:'#ebb1b1',
			2:'#e69292',
			3:'#e77171',
			4:'#e34949'
		},
		green:{
			def:'#2ab72a',
			1:'#a7eea7',
			2:'#71cf71',
			3:'#5ec65e',
			4:'#44c044'
		},
		blue:{
			def:'#0077ff',
			1:'#a1c5ee',
			2:'#70a9ea',
			3:'#539bed',
			4:'#338aef'
		},
		yellow:{
			def:'#efef21',
			1:'#efefb3',
			2:'#efef8c',
			3:'#e8e84c',
			4:'#c7c720'
		},
		orange:{
			def:'#febd44',
			1:'#ffebc6',
			2:'#ffdd9f',
			3:'#ffd483',
			4:'#ffc861'
		},
		pink:{
			def:'#f1aab6',
			1:'#f0cad0',
			2:'#e0a6b0',
			3:'#d47b8a',
			4:'#c45265'
		},
		purple:{
			def:'#9d319d',
			1:'#efafef',
			2:'#d87ed8',
			3:'#c76bc7',
			4:'#b351b3'
		}
	},
	font:{
		main:'system-ui,-apple-system,sans-serif',
		serif:'serif',
		mono:'monospace',
		sans:'sans-serif'
	},

	autoTheme: false,
	layers(e) {
		this.cmps = e
	},
	add(obj = {}) {
		if (typeof obj === 'object') {
			if (obj.class) this.class = {
				...obj.class, ...this.class
			}
			if (obj.flex) this.flex = {
				...obj.flex,
				...this.flex
			}
			if (obj.text) this.text = {
				...obj.text,
				...this.text
			}
			if (obj.grid) this.grid = {
				...obj.grid,
				...this.grid
			}
		} else console.error('BlickCSS. The blick.add function must contain an object.')
	}
};
(() => {
	const B_STYLE_TAG = document.createElement('style')
	B_STYLE_TAG.id = 'blick-styles'
	document.head.append(B_STYLE_TAG)

	let B_RESET_CSS = "*,::after,::before{text-decoration:none;object-fit:cover;box-sizing:border-box;-webkit-tap-highlight-color:transparent;font-feature-settings:'pnum' on,'lnum' on;outline:0;border:0;margin:0;padding:0;border-style:solid;line-height:1.35em}body,button,input,textarea,select{font-family:var(--font-main)}hr{width:100%;margin:20px 0;border-top:1px solid #aaa}"
	let B_STYLE_STRING = ''
  let B_ATTRS_STORE = []
	let B_STYLE_STORE = {}
	let B_MQ_STORE = {
		m: {},
		t: {},
		d: {},
		'm-t': {},
		't-d': {},
		'm-d': {},
		dark:  {}
	}
	let B_MQ_STR = {
		m: "",
		t: "",
		d: "",
		'm-t': "",
		't-d': "",
		'm-d': "",
		dark:  ""
	}
  
  let B_MQ_STR_COPY = {...B_MQ_STR}

	function B_CREATE_VAL(_vals, vals, prop, val, one, sel) {
		return one
    || (_vals ? (_vals[val] ?? false) : false) 
    || (prop ? prop.replaceAll('$', B_CALC_VAL(vals ? (vals[val] ?? val) : val, sel)) : false)
    || (vals ? (vals[val] ?? false) : false)
	}

	function B_CALC_VAL(val, sel) {
		if (val) {
			return val.split('+').map(i => {
				if (i.includes('/')) {
					return parseFloat((i.split("/")[0] / i.split("/")[1] * 100).toFixed(2)) + '%'
				} else if (i.includes('$')) {
					return `var(--${i.slice(1)})`
				} else {
					return !isNaN(i) ? i + (sel?.def ?? '') : i
				}
			}).join(sel?.join ?? ' ')
		} else return ''
	}

	function B_CREATE_CSS_STR(str, model) {
		let prStr = str
		let imp = str.includes('!') ? str = str.replaceAll('!', '') : false
		let sp = str.split(':')
		let state = sp[1] ? (blick.states[sp[0]] ?? ":" + sp[0]) : false
		let dec = state ? B_SPLIT_INDEX(sp[1], '-') : B_SPLIT_INDEX(sp[0], '-')
		let prop = dec[1] ? dec[0] : dec[0]
		let val = dec[1] ? dec[1] : false
		let one = !val ? blick[model][prop]?.one : false
		let sel = blick[model]?.[prop]

		if (!sel && model === 'class') return false
		if (one === undefined && model === 'class') return false
		let crtArg = [sel?._vals, sel?.vals, sel?.prop, val, one, sel]
		let create
		let includeStore
		let includeMqStore
		let res = false

		if (prop) {
			if (model === 'flex' || model === 'grid') {
				create = B_CREATE_VAL(...crtArg)
        || `gap:${prop}${isNaN(prop)?'':'px'}`
			}
			if (model === 'text') {
				prop = str.startsWith("$") ? str : prop
				val = str.startsWith("$") ? false : val

				let txtVal = B_CALC_VAL(prop, sel)

				create = B_CREATE_VAL(...crtArg) 
        || (parseFloat(prop) ? `font-size:${txtVal}${isNaN(txtVal)?'':'px'}` : `color:${txtVal}`)
			}
			if (model === 'class') {
				create = B_CREATE_VAL(...crtArg)
			}
			create = create?.includes('_') ? create.replaceAll('_', ' ') : create

			if (imp) create += '!important'
			
			includeStore = B_STYLE_STORE[B_FROMATED(prStr,model)]
			includeMqStore = B_MQ_STORE[state.slice?.(1)]?.[B_FROMATED(prStr,model)]
			
			if (!includeStore && !includeMqStore) {
				if (!res) res = true
				if ([':m', ':t', ':d', ':m-t', ':m-d', ':t-d', ':dark'].includes(state)) {
					B_MQ_STORE[state.slice(1)][B_FROMATED(prStr,model)] = create
				} else {
					B_STYLE_STORE[B_FROMATED(prStr,model)] = { st: state, str: create }
				}
			}
		}
		return res

	}

	function B_SPLIT_INDEX(elem, ind) {
		if (elem.includes(ind)) {
			let a = elem.slice(0, elem.indexOf(ind))
			let b = elem.slice(elem.indexOf(ind) + 1)
			return [a, b]
		} else return [elem]
	}

	function B_GET_SLICE_STR(str) {
		return str.trim().split(' ').filter(el => el)
	}

	function B_GET_ROOT() {
		let fonts = ''
		let colors = ''

		for (const [type, val] of Object.entries(blick.font)) {
			fonts += `--font-${type}:${val};`
		}
		for (const [color, obj] of Object.entries(blick.colors)) {
			for (const [num, code] of Object.entries(obj)) {
				colors += `--${color+(num==='def'?'':'-'+num)}:${code};`
			}
		}

		return `:root{${ colors + fonts }}`
	}

	function B_UPD_STYLE(str, mq) {
		B_STYLE_TAG.textContent =
		B_RESET_CSS + B_GET_ROOT() +
		`[${blick.attr.flex}]:not([${blick.attr.flex}~=off]){display:flex}[${blick.attr.grid}]:not([${blick.attr.grid}~=off]){display:grid}.wrapper{margin:auto}` + str +
		`@media(max-width:${blick.screen.min}){.wrapper{width:100%}${mq.m}${mq['m-t']}${mq['m-d']}}` +
		`@media(min-width:${blick.screen.min}) and (max-width:${blick.screen.max}){.wrapper{width:${blick.screen.min}}${mq.t}${mq['m-t']}${mq['t-d']}}` +
		`@media(min-width:${blick.screen.max}){.wrapper{width:${blick.screen.max}}${mq.d}${mq['m-d']}${mq['t-d']}}` +
		(blick.autoTheme ? "@media(prefers-color-scheme:dark){" + mq.dark + "}" : (document.body?.classList.contains('theme-dark') ? mq.dark : ''))
	} 
	B_UPD_STYLE(B_STYLE_STRING, B_MQ_STR)

	function B_CHECK_ELEM(t){
    return !!t?.getAttribute
    && !(t === B_STYLE_TAG 
    || t === document.head 
    || "script" === t.localName)
  }

  function B_GET_REC(r) {
		if (r.length === 1) {
      if (!B_CHECK_ELEM(r[0].target)) {
        if (r[0].addedNodes.length <= 1) {
          if (!B_CHECK_ELEM(r[0].addedNodes[0]) || r[0].addedNodes[0]) {
            return false
          } else return true
        } else return true
			} else return true
		} else return true
	}

	function B_FROMATED(str, model) {
    let formated = str
    Array.from(new Set(formated.match(/[$/.+:!#()%@*^=]/g)))?.forEach(e => formated = formated.replaceAll(e, `\\${e}`))
    if (model === 'class') {
      return `.${formated}`
    }
    else {
      return `[${model}~="${str}"]`
    }
  }
  
  function B_RENDER(record) {
    
    if (document.body) {
      if (B_GET_REC(record)) {
        // console.log(record);
        console.time('blick. styles upd')
				let prevAttr 
				let query     = `[class],[${blick.attr.flex}],[${blick.attr.text}],[${blick.attr.grid}]`
				let nodes     = document.querySelectorAll(query)
				let strExist  = false
        let atHes     = (elem, attr) => elem.hasAttribute(attr)
        let atGet     = (elem, attr) => elem.getAttribute(attr)

        function setCssStr(attr, model) {
          let attrJoin = B_GET_SLICE_STR(attr).join()

          if (attr !== prevAttr && !B_ATTRS_STORE.includes(attrJoin)) {
            B_ATTRS_STORE.push(attrJoin)
            for (const str of attrJoin.split(',')) {
              if (B_CREATE_CSS_STR(str, model)) {
                strExist = true
              } 
            }
          }
          prevAttr = attr
        }
        
				if (nodes.length) {
					for (const elem of nodes) {
            if (atHes(elem,'class')) setCssStr(atGet(elem,'class'),'class')
            if (atHes(elem,'flex' )) setCssStr(atGet(elem,'flex' ),'flex' )
            if (atHes(elem,'text' )) setCssStr(atGet(elem,'text' ),'text' )
            if (atHes(elem,'grid' )) setCssStr(atGet(elem,'grid' ),'grid' )
					}

					if(strExist) {
						B_MQ_STR = {...B_MQ_STR_COPY}
	
						for (const [key, obj] of Object.entries(B_MQ_STORE)) {
							Object.entries(obj).map(([a, b]) => B_MQ_STR[key] += `${a}{${b}}`)
						}
		
						B_STYLE_STRING = ''
		
						for (const [key, obj] of Object.entries(B_STYLE_STORE)) {
							B_STYLE_STRING += `${key}${obj.st||''}{${obj.str}}`
						}
	
						B_UPD_STYLE(B_STYLE_STRING, B_MQ_STR)
					}
					strExist = false
				}
        console.timeEnd('blick. styles upd')
			}
		}
  }

	new MutationObserver(B_RENDER)
  .observe(document, {
		attributeFilter: [
			'class',
			blick.attr.text,
			blick.attr.flex,
			blick.attr.grid
		],
		childList: true,
		attributes: true,
		subtree: true,
		attributeOldValue: true
	})
})()