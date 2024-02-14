import { BlickCss } from "./types/src/blick"

declare module "blickcss" {
    export { BlickCss }
    export type config = (b: BlickCss) => BlickCss
}