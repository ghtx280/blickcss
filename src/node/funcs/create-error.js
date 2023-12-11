import chalk from "chalk";

export function createError(stack) {
    for (const [color, msg] of stack) {
        console.log(chalk[color].bold(msg))
    }
}