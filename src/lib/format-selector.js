export default function (token, attr = 'class') {
    let format = token;

    format = format.replace(/[^\w-_]/g, '\\$&').replace(/^\d/, '\\3$& ');

    if (attr === 'raw') {
        return format;
    }
    if (attr === 'class') {
        return `.${format}`;
    }

    return `[${attr}~="${token}"]`;
}
