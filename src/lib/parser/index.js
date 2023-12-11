import formatSelector from '../format-selector.js';

import { parseStates } from './parse-states.js';
import { parseStyles } from './parse-styles.js';
import { is } from '../check-type.js';

export function parser(token = '', attr = 'class') {
    let [styles, ...states] = token.split(/(?<!\\):/g).reverse();
    let selector = formatSelector(token, attr);
    let rawSelector = selector;

    states = states.map((e) => parseStates(e, attr, token));

    styles = styles.split(/(?<!\\);/g);
    styles = styles.map((e) => parseStyles(e, attr, token, states));
    styles = styles.filter((e) => e);   

    if (!states.length) {
        states = null;
    }

    if (styles.length) {
        const EXTRA_SELECTOR = styles[0].src?._selector;

        // if (EXTRA_SELECTOR && is.str(EXTRA_SELECTOR)) {
        //     selector = EXTRA_SELECTOR.replace(/\$/g, selector);
        // }

        return { states, styles, attr, selector, rawSelector, token, extra: EXTRA_SELECTOR };
    }

    return null;
}
