// import context from "../context.js";

export function updateStore(ctx, token, attr) {
    // const ctx = context.get();

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

    const STRUCT = ctx.parse(token, attr)?.create()

    if (!STRUCT) return false

    const MEDIA = STRUCT.media
    const RULE = STRUCT.css()

    // const [MEDIA, RULE] = ctx.parse(token, attr) || [[], ''];

    if (!RULE) {
        SS[attr][token] = null;
        return false;
    }

    if (MEDIA) {
        for (const m of MEDIA) {
            const [ min, max ] = m.val

            if (min && !max) {
                if (!(min in CS.MEDIA.MIN)) CS.MEDIA.MIN[min] = ""

                CS.MEDIA.MIN[min] += RULE 
            }
            else if (!min && max) {
                if (!(max in CS.MEDIA.MAX)) CS.MEDIA.MAX[max] = ""

                CS.MEDIA.MAX[max] += RULE 
            }
            else if (min && max) {
                if (!(min in CS.MEDIA.RANGE)) CS.MEDIA.RANGE[min] = {}
                if (!(max in CS.MEDIA.RANGE[min])) CS.MEDIA.RANGE[min][max] = ""

                CS.MEDIA.RANGE[min][max] += RULE 
            }

            if (!(m.raw in MS)) MS[m.raw] = Object.create(null);
            if (token in MS[m.raw]) return false;

            MS[m.raw][token] = RULE;
        }
    }
    else {
        SS[attr][token] = RULE;
        CS[attr] += RULE;
    }

    return true
}