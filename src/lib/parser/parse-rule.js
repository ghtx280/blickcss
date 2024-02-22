export class RuleParser {
    constructor(ctx) {
        this.ctx = ctx
    }

    parse(path, object){
        const SPLIT_SYMBOL = "-"
        const RE_PATH = new RegExp(`(\\\\)?\\${SPLIT_SYMBOL}`, "g");

        const PARTS = path
            .replace(RE_PATH, (_, esc) => esc ? SPLIT_SYMBOL : "\n" )
            .split("\n")
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
}
