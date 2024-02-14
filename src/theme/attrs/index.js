import { CreateAttrFlex } from "./flex.js";
import { CreateAttrGrid } from "./grid.js";
import { CreateAttrText } from "./text.js";

export function CreateAttrs() {
    return {
        flex: CreateAttrFlex(),
        grid: CreateAttrGrid(),
        text: CreateAttrText(),
    }
}