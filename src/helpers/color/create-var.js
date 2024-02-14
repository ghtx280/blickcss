import { is } from "../../lib/check-type.js";
import calcOpacity from "./calc-opacity.js";
import hexAlpha from "./hex-alpha.js";
import varColor from "./var-color.js";

/**
 * 
 * @param {string} variable 
 * @param {string} opacity 
 * @returns 
 */
export default function(ctx, variable, opacity = "") {
    if (is.var(variable)) {
        variable = variable.slice(1);
    }

    if (!opacity) {
        return `var(--${variable})`;
    }
    
    let result = varColor(ctx, variable)

    if (result) {
        return result + hexAlpha(opacity)
    }

    return `var(--${variable});opacity:${calcOpacity(opacity)}`;    
}