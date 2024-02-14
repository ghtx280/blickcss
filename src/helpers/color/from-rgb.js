/**
 * (r, g, b) => "#rrggbb"
 * @param {string | number} r - red
 * @param {string | number} g - green
 * @param {string | number} b - blue
 * @returns {string}
 */
export default function(r = "0", g = "0", b = "0") {
    return '#' + [r, g, b]
    .map(x => {
        const hex = (+x).toString(16)
        return hex.length === 1 ? '0' + hex : hex
    })
    .join('')
}