/**
 * 
 * @param {number} number 
 * @returns {number}
 */
export default function(number) {
    if (+number) {
        return number > 1 ? number / 100 : number;
    }
    return number
}