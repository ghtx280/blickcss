import { is } from './check-type.js';

export function createMediaWidth(sizes) {
    if (!is.obj(sizes)) sizes = [sizes];

    const WIDTHS = [];

    for (const index in sizes) {
        let size = sizes[index];

        if (!size) continue;

        size = size.toString().replace(/\(|\)/g, '');

        if (+size[0]) {
            let type = +index === 0 ? 'min' : 'max';
            let unit = +size ? 'px' : '';

            WIDTHS.push(`(${type}-width:${size}${unit})`);
        } else {
            WIDTHS.push(`(${size})`);
        }
    }

    return WIDTHS.join(' and ');
}
