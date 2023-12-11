export default function (obj) {
    if (!('keyframes' in obj)) return '';

    obj = obj.keyframes;

    if (typeof obj !== 'object') {
        throw Error('Blick: Keyframes must be written as an object');
    }

    return Object.entries(obj)
        .map(
            ([key, val]) =>
                `@keyframes ${key}{${Object.entries(val)
                    .map(([p, c]) => `${isNaN(p) ? p : `${p}%`}{${c}}`)
                    .join('')}}`
        )
        .join('');
}
