import isBrowser from "./is-browser.js";

/**
 * send error in terminal
 * @param {string} text 
 */
export default function(text){
    if (isBrowser()) {
        console.error("BlickError: " + text);
    }
    else {
        console.log("\x1b[31m\x1b[1m");
        console.log("BlickError: " + text);
        console.log("\x1b[0m");
    }
}