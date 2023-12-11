import BLICK from './theme/index.js';
import RENDER from './lib/render.js';
import context from './context.js';

window.blick = BLICK;
window.blickcss = BLICK;

context.set(BLICK);

new MutationObserver(RENDER).observe(document.documentElement, {
    attributeFilter: ['class', ...Object.keys(BLICK.attr)],
    childList: true,
    attributes: true,
    subtree: true,
});
