import chalk from "chalk"

let times = 1

export function showMsg(file, params, time) {
    const date = new Date()
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()

    h = h < 10 ? "0" + h : h
    m = m < 10 ? "0" + m : m
    s = s < 10 ? "0" + s : s

    console.log(
        "\n\n",
        chalk.yellow(`[${h}:${m}:${s}]`),
        chalk.blue(`Updates: ${times++}, ${time}`),
    )

    console.log(`-------------------`)

    if (file) {
        let upd_file = file.replaceAll('\\', '/');
        console.log(chalk.green.bold(`'${upd_file}' was changed.`));
    }
    if (params.output) {
        let out_file = params.output.replaceAll(/\.+\//g, '');
        console.log(chalk.green.bold(`'${out_file}' updated successfully.`))
    }

    console.log(`-------------------`)
    
    if (params.watch) {
        console.log(chalk.gray.bold(`Waiting for changes...`))
    }

}