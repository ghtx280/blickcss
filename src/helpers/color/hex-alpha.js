import sendError from "../send-error.js";

/**
 * 50 => 80 (toString(16))
 * @param {number | string} num opacity
 * @returns {string}
 */
export default function(num) {
    num = +num

    if (num < 0 || num > 100) {
        sendError('Alpha value must be a from 0 to 100');
        return ""
    }

    let alpha = Math.round((num / 100) * 255).toString(16);

    if (alpha.length === 1) {
        alpha = '0' + alpha;
    }

    return alpha;
}