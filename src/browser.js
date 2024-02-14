import { BlickCss } from './blick.js';
import RENDER from './lib/render.js';
// import context from './context.js';

const BLICK = new BlickCss({ env: "browser" })

BLICK.setup({
    id: "BLICK_OUTPUT"
})

window.blick = BLICK;
window.BlickCss = BlickCss;

// context.set(BLICK);

const observer = new MutationObserver(() => RENDER(BLICK))

const observer_params = {
    attributeFilter: [
        'class',
        ...Object.keys(BLICK.attr)
    ],
    childList: true,
    attributes: true,
    subtree: true,
}

observer.observe(document.documentElement, observer_params);