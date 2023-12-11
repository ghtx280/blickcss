import context from "../context.js";

export function updateStore(token, attr) {
    const ctx = context.get();

    const AS = ctx._STORE_.ATTRS_STORE;
    const SS = ctx._STORE_.STYLE_STORE;
    const MS = ctx._STORE_.MEDIA_STORE;
    const CS = ctx._STORE_.CSS_STORE;


    if (!(attr in CS)) CS[attr] = '';
    if (!(attr in SS)) SS[attr] = Object.create(null);
    if (!(attr in AS)) AS[attr] = Object.create(null);
    if (token in SS[attr]) return false;
    if (token in AS[attr]) return false;

    AS[attr][token] = true;

    const [MEDIA, RULE] = ctx.createRule(token, attr) || [[], ''];

    if (!RULE) {
        SS[attr][token] = null;
        return false;
    }

    if (MEDIA.length) {
        for (const m of MEDIA) {
            if (!(m.raw in MS)) MS[m.raw] = Object.create(null);
            if (!(m.val in CS.MEDIA)) CS.MEDIA[m.val] = '';
            if (token in MS[m.raw]) return false;

            MS[m.raw][token] = RULE;
            CS.MEDIA[m.val] += RULE;
        }
    }
    else {
        SS[attr][token] = RULE;
        CS[attr] += RULE;
    }

    return true
}