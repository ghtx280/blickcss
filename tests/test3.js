import { BlickCss } from "../src/blick.js"
import { cssbeautify } from "../src/node/funcs/cssbeautify.js"

let blick = new BlickCss()

function commentLayers() {
    
}

blick.config({
    reset: false,
    wrapper: false,
    autoFlex: false,
    root: false,
    screen: {
        foo: [500, 900],
        ggg: [500, 800],
    },
    class: {
        test: "ddd: fdfd; \n  fdfd: 522"
    },
    extentions: [
        commentLayers,
    ]
})




console.log(
    cssbeautify(
        blick.html(
            // `class="lg:bg-blue lg:flex"`
            `class="bg-red"`
        )
    )
);

// console.log(blick._STORE_.CSS_STORE.MEDIA);
// console.log(blick._STORE_.CSS_STORE.);

// console.log({
//     media: {
//         min: {
//             500: "fdfdfd",
//             800: "fdfdfd"
//         },
//         max: {

//         },
//         range: {
//             500: { 800: "fdfdfd" },
//             800: { 500: "fdfdfd" }
//         }
//     }
// });

// console.log(
//     Object.keys({ 992: "", 512: "", 768: "" }).join()
// );
