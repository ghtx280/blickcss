import { is } from "./check-type.js";


export function deepClone(obj) {
    if (is.element(obj)) {
        return obj;
    }

    if (typeof obj !== 'object') {
        return obj;
    }

    if (is.arr(obj)) {
        return obj.map((e) => deepClone(e));
    }

    const clonedObj = {};

    for (let key in obj) {
        clonedObj[key] = deepClone(obj[key]);
    }

    return clonedObj;
}
