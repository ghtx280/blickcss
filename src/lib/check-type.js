function isElement(element) {
    try {
        return (
            element instanceof Element ||
            element instanceof HTMLElement ||
            (
                element.nodeName &&
                element.nodeType &&
                element.ownerDocument 
            )
        )  
    } catch (error) {
        return false
    }
}

const TYPES = {
    func: (e) => typeof e === 'function',
    str:  (e) => typeof e === 'string',
    obj:  (e) => typeof e === 'object',
    num:  (e) => typeof e === 'number',
    arr:  (e) => Array.isArray(e),
    var:  (e) => /^\$.+/.test(e),
    hex:  (e) => /^#[\dabcdef]{3,8}$/.test(String(e).trim()),
    exist: (e) => e !== undefined,
    null:  (e) => e === null,
    undef: (e) => e === undefined,
    element: (e) => isElement(e),
};

export const is = {
    ...TYPES,

    // not: new Proxy(TYPES, {
    //     get(obj, key) {
    //         if (key in obj) {
    //             return (val) => !obj[key](val);
    //         } else {
    //             throw new Error(`BlickCss: type '${key}' don't exist`);
    //         }
    //     },
    // }),
};
