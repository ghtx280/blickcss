import { BlickCss } from "../src/blick.js";
import { ValueParser } from "../src/lib/parser/parse-value.js";

const b = new BlickCss()

const val = new ValueParser(b)

b.class.t3 = (e) => {
    // console.log(e);
    return {
        _prop: "fff:$",
        _values: ["20", "$foo"],
        _unit: "px"
    }
}


// b.class.flex = "display:flex"

// b.class.flex = (e) => {
//     return "display:flex"
// }

b.class.m = {
    _prop: "margin:$",
    _unit: "px"
}
b.class.m = (e) => {
    // console.log(e);
    let data = {
        _unit: "px",
        _vals: {
            ggg: "50px"
        }
    }

    // let values = e.parseValue(data)


    // // e.val = "$foo+30+full"
    // let data = { _unit: "px", _vals: { full: "100%" } }
    // let value = parseValue(data) // "var(--foo) 30px 100%"
    // data._prop = `margin: ${value}`
    // return data
    return {
        _prop: "margin:$",
        ...data,
        _values: [20, 30]
    }
}

b.class.test = e => "dis:flex"


// ===========
// b.class.m = {
//     _prop: "margin:$",
//     _one: "margin:auto",
//     _unit: "px"
// }
// b.class.m = {
//     _prop: e => "margin:$",
//     _one: e => "margin:auto",
//     _unit: "px"
// }

// class="m-20" -> .m-20 { margin: 20px 20px }

b.class.t1 = (e) => {
    console.log(e);
    return "fff:22"
}


// console.dir(
//     [
        // b.parse("t3-20") 
        console.log(b.parse("break-keep", "text")?.create());
        // console.log(b.parse("test").create());
        // console.dir(b.parse("h:space-20"), { depth: null });
//     ],
//     { depth: null }
// );



