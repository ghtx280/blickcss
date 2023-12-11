export function parseRule(path, object) {
    const PARTS = path.split(/(?<!\\)-/g);
    let array_path = [];
    let value_string = null;

    for (const i in PARTS) {
        if (!object[PARTS[i]]) {
            if (i == 0) object = null;
            value_string = PARTS.slice(i).join('-');
            break;
        }
        array_path.push(PARTS[i]);
        object = object[PARTS[i]];
    }

    return {
        path: array_path,
        value: value_string,
        source: object,
    };
}
