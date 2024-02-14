import { BlickCss } from "./types/index"

declare module "blickcss" {
    export { BlickCss }
    export type config = (b: BlickCss) => BlickCss
}