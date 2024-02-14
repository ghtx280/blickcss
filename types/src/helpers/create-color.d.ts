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
export default function _default(ctx: BlickCss, color: string, opacity: string): string | null;
import { BlickCss } from "../blick.js";
