import { BlickCss    } from "../blick.js"

import calcOpacity from "./color/calc-opacity.js"
import colorNames  from "./color/color-names.js"
import createVar   from "./color/create-var.js"
import varColor    from "./color/var-color.js"
import fromRgb     from "./color/from-rgb.js"

import sendError from "./send-error.js"
import hexAlpha from "./color/hex-alpha.js"

/**
 * hex("red", 50) => #ff000080   
 * hex("#0f0", 50) => #00ff0080   
 * hex("$red", 50) => #ef444480   
 * hex("rgb(0,0,255)", 50) => #0000ff80    
 * hex("red") => #ff0000     
 * hex("#0f0") => #00ff00   
 * hex("$red") => #ef4444    
 * hex("rgb(0,0,255)") => #0000ff   
 * 
 * @param {BlickCss} ctx 
 * @param {string} color 
 * @param {string} opacity 
 * @returns {string | null}
 */
export default function(ctx, color, opacity) {
   
    
    // variable handling
    if (color[0] == "$") {
       return createVar(ctx, color, opacity)
    }
  
    // hex handling
    if (color[0] === "#") {
        if (color.length === 4) {
            let r = color[1]
            let g = color[2]
            let b = color[3]
            return "#"+r+r+g+g+b+b + hexAlpha(opacity)
        }
        
        return color + hexAlpha(opacity)
    }
    
    // rgb handling
    if (color.startsWith("rgb")) {
        let [r, g, b, a] = color.replace(/rgba?\(\s*|\s*\)/g, "").split(/\s*,\s*/)
        
        return a ? color : fromRgb(r, g, b) + hexAlpha(opacity)
    }

    // processing of color name 
    if (color in colorNames) {
        return colorNames[color] + hexAlpha(opacity)
    }
    else {
        sendError(`Invalid color "${color}"`)
    }

    return null  
}


