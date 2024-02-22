console.log("=========START========")

import varColor from '../src/helpers/color/var-color.js';
import getHexNode from '../src/helpers/create-color.js';
import { BlickCss } from '../src/blick.js';

function test1() {
    console.clear();
    console.log('\n\n\n\n');

    /* 

    size   - any numeric size with px, rem, em, %, ...
    number - just a number float or int
    color  - hex, rgb or color name
    var    - any variable like $foo
    string - value that inside "..." or '...'
    none   - only none value
*/

    let blick = new BlickCss();

    blick.config({
        class: {
            m: {
                _prop: 'margin: $[size | none]',
            },
        },
    });

    /* 
    margin: 20px - ok
    margin: none - ok
    margin: auto - bad
*/

    console.log(
        [
            getHexNode(blick, 'red', 50),
            getHexNode(blick, 'hui', 50),
            getHexNode(blick, '$ggg', 60),
            getHexNode(blick, 'rgb(255,0,0)', 60),
            getHexNode(blick, '$red'),
        ]
            .map((e) => e || '=== no value ===')
            .join('\n\n')
    );

    console.log('\n\n\n\n');
}

// test1()


export function test2() {
    const err_stack = []
    const b = new BlickCss()

    function eq(token, val, attr) {
        let res = b.parse(token, attr)?.create() 

        if (val.err) {
            if (res) {
                let msg = `❌ ${token} some reason value exist ${JSON.stringify(res)}`
                err_stack.push({msg, token})
                return console.log(msg);
            }
            
            return console.log(
                `✅ ${token} not be genetated`,
            );
        }

        res ||= {}
        
        let sel = res.selector || "-"
        let stl = res.styles?.join(";") || "-"
        let mda = res.media?.[0].val
        let eq_sel = val.sel
        let eq_stl = val.style
        let eq_mda = val.media

        console.log(
            [
                "\n=====================",
                `${token} | ${attr || "class"}`,
                "------------",
                [sel == eq_sel ? "✅" : "❌", sel, "🔸", eq_sel].join(" "),
                [stl == eq_stl ? "✅" : "❌", stl, "🔸", eq_stl].join(" "),
                [mda == eq_mda ? "✅" : "❌", mda, "🔸", eq_mda].join(" "),
                "=====================\n"
            ]
            .join("\n"),
        );

        if (sel != eq_sel || stl != eq_stl || mda != eq_mda) {
            err_stack.push({
                token,
                msg: [
                    sel + "🔸" + eq_sel,
                    stl + "🔸" + eq_stl,
                    mda + "🔸" + eq_mda
                ]
                // .join("\n")
            })
        }
    }

    // non-existent class
    eq("fdfdfd", { err: true })

    // just key:val
    eq('abs', { sel: '.abs',style: 'position:absolute' })

    // without value 
    eq("pos", { err: true })

    // wrong value
    eq('pos-abs', { sel: '.pos-abs',style: 'position:abs' })

    // _prop
    eq('pos-absolute', { sel: '.pos-absolute',style: 'position:absolute' })

    // _prop & _unit
    eq('m-20',    { sel: '.m-20',style: 'margin:20px' })
    eq('m-10+20', { sel: '.m-10\\+20',style: 'margin:10px 20px' })

    // _prop without _unit
    eq('bg-red',     { sel: '.bg-red',style: 'background:red' })
    eq('bg-#f00',    { sel: '.bg-\\#f00',style: 'background:#f00' })
    eq('bg-$red',    { sel: '.bg-\\$red',style: 'background:var(--red)' })
    eq('bg-$foo/50', { sel: '.bg-\\$foo\\/50',style: 'background:var(--foo);opacity:0.5' })
    eq('bg-$red/50', { sel: '.bg-\\$red\\/50',style: 'background:#ef444480' })

    // _one _prop _unit
    eq('round',       { sel: '.round',style: 'border-radius:9999px' })
    eq('round-20',    { sel: '.round-20',style: 'border-radius:20px' })
    eq('round-20rem', { sel: '.round-20rem',style: 'border-radius:20rem' })

    // groups value ($1 $2)
    eq('sq-100',           { sel: '.sq-100',style: 'width:100px;height:100px' })
    eq('sq-100+200',       { sel: '.sq-100\\+200',style: 'width:100px;height:200px' })
    eq('sq-100+200rem',    { sel: '.sq-100\\+200rem',style: 'width:100px;height:200rem' })
    eq('sq-100+200rem+10', { sel: '.sq-100\\+200rem\\+10',style: 'width:100px;height:200rem' })

    // _vals
    eq('w-full', { sel: '.w-full',style: 'width:100%' })
    eq('w-100',  { sel: '.w-100',style: 'width:100px' })
    eq('w-1rem', { sel: '.w-1rem',style: 'width:1rem' })

    // _selector
    eq('space-20', { sel: '.space-20>*+*',style: 'margin-left:20px' })

    // _join
    eq('h:space-20', { sel: '.h\\:space-20:hover>*+*',style: 'margin-left:20px' })

    // nested
    eq('bg-pos-center', { sel: '.bg-pos-center',style: 'background-position:center' })
    eq('bg-pos-x-left', { sel: '.bg-pos-x-left',style: 'background-position-x:left' })

    // key as function
    b.class.t1 = (e) => {
        return "fff:22"
    }
    eq('t1', { sel: '.t1',style: 'fff:22' })
    eq('t1-20', { sel: '.t1-20',style: 'fff:22' })
    b.class.t2 = () => {
        return {
            _prop: "fff:$",
            _one: "piska"
        }
    }
    eq('t2-100', { sel: '.t2-100',style: 'fff:100' })
    eq('t2', { sel: '.t2',style: 'piska' })
    b.class.t3 = () => {
        return{
            _prop: "fff:$",
            _one: "fff:22",
            _values: ["22"]
        }
        
    }
    eq('t3',    { sel: '.t3',style: 'fff:22' })
    eq('t3-30', { sel: '.t3-30',style: 'fff:22' })
    

    // no _unit
    eq('scale-2', { sel: '.scale-2',style: 'scale:2' })
    

    // states
    eq('h:flex',     { sel: '.h\\:flex:hover',style: 'display:flex' })
    eq('hover:flex', { sel: '.hover\\:flex:hover',style: 'display:flex' })
    eq('dark:flex',  { sel: '.dark .dark\\:flex',style: 'display:flex' })

    // media
    eq("md:flex",    { sel: ".md\\:flex", style: "display:flex", media: "(min-width:768px)" })
    eq("m-md:flex",  { sel: ".m-md\\:flex", style: "display:flex", media: "(max-width:768px)" })
    eq("500:flex",   { sel: ".\\35 00\\:flex", style: "display:flex", media: "(min-width:500px)" })
    eq("m-500:flex", { sel: ".m-500\\:flex", style: "display:flex", media: "(max-width:500px)" })

    // attr text
    eq("20",      { sel: '[text~="20"]', style: "font-size:20px", }, "text")
    eq("2em",     { sel: '[text~="2em"]', style: "font-size:2em", }, "text")
    eq("red",     { sel: '[text~="red"]', style: "color:red", }, "text")
    eq("#ff0",    { sel: '[text~="#ff0"]', style: "color:#ff0", }, "text")
    eq("$foo",    { sel: '[text~="$foo"]', style: "color:var(--foo)", }, "text")
    eq("$foo/50", { sel: '[text~="$foo/50"]', style: "color:var(--foo);opacity:0.5", }, "text")
    eq("$red/50", { sel: '[text~="$red/50"]', style: "color:#ef444480", }, "text")
    eq("center",  { sel: '[text~="center"]', style: "text-align:center", }, "text")
    eq("h:20",    { sel: '[text~="h:20"]:hover', style: "font-size:20px", }, "text")
    eq("md:20",   { sel: '[text~="md:20"]', style: "font-size:20px", media: "(min-width:768px)" }, "text")
    eq("md:h:20", { sel: '[text~="md:h:20"]:hover', style: "font-size:20px", media: "(min-width:768px)" }, "text")
    eq("cols-2", { sel: '[text~="cols-2"]', style: "columns:2" }, "text")

    // attr flex
    eq("20",   { sel: '[flex~="20"]',   style: "gap:20px" }, "flex")
    eq("2em",  { sel: '[flex~="2em"]',  style: "gap:2em", }, "flex")
    eq("jc-c", { sel: '[flex~="jc-c"]', style: "justify-content:center" }, "flex")

    eq("flex-col",   { sel: '.flex-col',   style: "flex-direction:column" })
    eq("flex-1",     { sel: '.flex-1',     style: "flex:1 1 0%" })
    eq("flex-15",    { sel: '.flex-15',    style: "gap:15px" })
    eq("flex-15rem", { sel: '.flex-15rem', style: "gap:15rem" })

    eq("text-20",    { sel: '.text-20',    style: "font-size:20px" })
    eq("text-red",   { sel: '.text-red',   style: "color:red" })
    eq("text-15rem", { sel: '.text-15rem', style: "font-size:15rem" })
    eq("text-red/50+20", { sel: '.text-red\\/50\\+20', style: "color:#ff000080 20" })
    eq("text-center", { sel: '.text-center', style: "text-align:center" })
    eq("h:text-20",    { sel: '.h\\:text-20:hover', style: "font-size:20px" })
    eq("md:text-20",    { sel: '.md\\:text-20', style: "font-size:20px", media: "(min-width:768px)" })

    eq("op-50",  { sel: '.op-50', style: "opacity:0.5" })
    eq("op-0.5", { sel: '.op-0\\.5', style: "opacity:0.5" })

    eq("ratio-1/1",  { sel: '.ratio-1\\/1', style: "aspect-ratio:1 / 1" })
    eq("ratio-vid",  { sel: '.ratio-vid', style: "aspect-ratio:16 / 9" })

    // attr flex
    eq("20",   { sel: '[grid~="20"]',   style: "gap:20px" }, "grid")
    eq("2em",  { sel: '[grid~="2em"]',  style: "gap:2em", }, "grid")
    eq("jc-c", { sel: '[grid~="jc-c"]', style: "justify-content:center" }, "grid")
    eq("cols-3", { sel: '[grid~="cols-3"]', style: "grid-template-columns:repeat(3,1fr)" }, "grid")



    if (!err_stack.length) {
        console.log("😍 ПОМИЛОК НЕМАЄ");
    }
    else {
        console.log(`❌ ПОМИЛОК: ${err_stack.length} ❌`);
        console.log(err_stack);
    }
}

test2()
