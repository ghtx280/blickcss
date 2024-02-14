import { is } from "../../lib/check-type.js";
import { BlickCss } from "../../blick.js";

/**
 * "$foo" => undefined   
 * "$red" => "#ef4444"
 * @param {BlickCss} ctx 
 * @param {string} str 
 * @returns {string | undefined}
 */
export default function(ctx, str) {
    const colors = ctx.colors

    if (!colors) return;

    if (is.var(str)) {
        str = str.slice(1);
    }

    const [colorName, shade] = str.split('-');

    if (shade) {
        if (colors[colorName][shade]) {
            return colors[colorName][shade];
        } else {
            throw Error(
                `Blick: This shade "${shade}" is not exist for "${colorName}".\n` +
                    `Available shades: ${Object.keys(colors[colorName]).filter(
                        (e) => e !== 'def'
                    )}`
            );
        }
    }
    return (
        colors[colorName]?.def ||
        colors[colorName]?.DEFAULT ||
        colors[colorName]
    );
}