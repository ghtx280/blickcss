import formatSelector from '../format-selector.js';

import { is } from '../check-type.js';
import { StatesParser } from './parse-states.js';
import { StylesParser } from './parse-styles.js';
import { createRule   } from '../create-rule.js';
import { escape } from '../../helpers/escape.js';


export class Parser {
    constructor(ctx) {
        this.ctx = ctx;
        this.parseStates = new StatesParser(ctx)
        this.parseStyles = new StylesParser(ctx)
    }

    parse(token = '', attr = 'class') {
        // let [styles, ...states] = token.split(/(?<!\\):/g).reverse();
        let [styles, ...states] = escape(token, ":").split().reverse()
        let selector = formatSelector(token, attr);
        let rawSelector = selector;

        states = states.map((e) => this.parseStates.parse(e, attr, token));
        // styles = styles.split(/(?<!\\);/g);
        styles = escape(styles, ";").split()
        styles = styles.map((e) => this.parseStyles.parse(e, attr, token, states));
        styles = styles.filter((e) => e);

        if (!states.length) {
            states = null;
        };

        if (styles.length) {
            const EXTRA_SELECTOR = (styles[0].src || 0)._selector || null;

            // if (EXTRA_SELECTOR && is.str(EXTRA_SELECTOR)) {
            //     selector = EXTRA_SELECTOR.replace(/\$/g, selector);
            // }

            return {
                states,
                styles,
                attr,
                selector,
                token,
                extra: EXTRA_SELECTOR,

                create() {
                    return createRule(this);
                },
            };
        }

        return null;
    }
}
