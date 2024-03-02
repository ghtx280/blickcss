import version   from "../version.js"
import render    from "./lib/render.js"
import sendError from "./helpers/send-error.js"

import { Parser        } from "./lib/parser/index.js"
import { CreateStore   } from "./lib/create-store.js"
import { CreateAttrs   } from "./theme/attrs/index.js"
import { CreateClasses } from "./theme/class.js"
import { CreateColors  } from "./theme/colors.js"
import { CreateFonts   } from "./theme/font.js"
import { CreateReset   } from "./theme/reset.js"
import { CreateScreens } from "./theme/screen.js"
import { CreateStates  } from "./theme/states.js"
import { HTMLProcessor } from "./lib/from-html.js"
import { is } from "./lib/check-type.js"

export class BlickCss {
    #parser 
    #html   

    constructor(params = {}) {
        this.env = params.env 
        this.#parser = new Parser(this) 
        this.#html   = new HTMLProcessor(this)   
    }

    class  = CreateClasses() // classes
    attr   = CreateAttrs()   // attributes (text, flex, grid)
    screen = CreateScreens() // screens variables (sm, md, lg, xl)
    states = CreateStates()  // states variable (h, f, c, ... --> :hover, :focus, :checked, ... )
    colors = CreateColors()  // colors css variables ($red --> #ef4444)
    font   = CreateFonts()   // fonts css variables ($font-mono --> monospace)
    reset  = CreateReset()   // css reset and normalize string


    autoTheme = false // use system theme (work only in CDN version)
    beautify  = false // makes css code pretty (work in npm version)
    autoFlex  = true  // [class*="flex-"], [class*="gap-"], ... {display:flex}
    useAttr   = true  // enables/disables the use of attributes
    time      = false // shows the time of style generation in the console (work only in CDN version)
    root      = true  // enables/disables the creation of :root { ... } with variables

    wrapper = '.wrapper' // wrapper selector or false to disable
    maxPrefix = 'm-'     // prefix that converts min to max-width in @media (m-md:bg-red, m-500:flex-center)
    divisionSymbol = "+" // NEW! a symbol to separate values (m-20+30 --> margin:20px 30px)

    version = version // lib version
    element = null    // element <style> in which the generated styles are located (need use setup method)

    // parsing a single piece of a class or attribute
    parse(token = '', attr = 'class') {
        return this.#parser.parse(token, attr)
    }

    // converts html code to css (this is the method used in the npm version)
    html(code = "") {
        return this.#html.css(" " + code)
    }

    // configures everything written above
    config(updates = this, source = this, isFirstCall = true) {
        if (updates === source) return source
    
        if (!is.obj(updates)) {
            return sendError("The blick.config function must contain an object")
        }

        for (let key in updates) {
            if (is.null(updates[key]) || is.undef(updates[key])) {
                delete source[key]
            }
            else if (is.obj(updates[key]) && !is.arr(updates[key])) {
                if (!source[key] || is.str(source[key])) {
                    source[key] = {};
                }
                this.config(updates[key], source[key], false);
            }
            else {
                source[key] = updates[key];
            }
        }

        if (isFirstCall) {
            // code on use config
        }

        return source;
    }

    // creates a <style> and binds it to this context, that is, all the generated styles will be there
    setup(params) {
        const { element, id } = params || {}

        if (typeof window == 'undefined') {
            console.log("BlickError: you can only use setup in the browser")
        }

        const STYLE_TAG = element || document.createElement('style');
        STYLE_TAG.id = id || 'BLICK_OUTPUT_' + Math.floor(Math.random() * 1000);
        document.head.append(STYLE_TAG);

        this.element = STYLE_TAG
        
        return this
    }

    // used to update styles (only in the cdn version)
    render() {
        return render(this)
    }

    onUpdate() {
        // code after updating styles
    }

    // all processed classes and attributes are stored here to avoid re-processing
    _STORE_ = CreateStore()
}
