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

    class  = CreateClasses()
    attr   = CreateAttrs()
    screen = CreateScreens()
    states = CreateStates()
    colors = CreateColors()
    font   = CreateFonts()
    reset  = CreateReset()


    autoTheme = false
    beautify  = false
    autoFlex  = true
    useAttr   = true
    time      = false
    root      = true

    wrapper = '.wrapper'
    maxPrefix = 'm-'
    divisionSymbol = "+"

    beautifyOption = null
    version = version
    element = null


    parse(token = '', attr = 'class') {
        return this.#parser.parse(token, attr)
    }


    html(code = "") {
        return this.#html.css(code)
    }


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


    render() {
        return render(this)
    }


    _STORE_ = CreateStore()
}