import fs from "fs";
import { build } from "./build.js";
import rl from 'node:readline';
import { test2 } from "./tests/prepublish-test.js";
import { exec, spawn } from "child_process";

function input(text) {
    const readline = rl.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise(res => {
        readline.question(text, e => {
            res(e)
            readline.close()
        })

    })
}


;(async()=>{
    let promise = await fetch("https://registry.npmjs.org/blickcss/latest")
    let data = await promise.json()
    let version = data.version
    // let version = "2.1.6" 

    let new_version = version.replace(/\d+$/, e => ++e)

    let pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"))
    pkg.version = new_version

    fs.writeFileSync("./package.json", JSON.stringify(pkg, null, 4))

    fs.writeFileSync("./version.js", `export default "${new_version}"`)

    spawn("npx", ["tsc"], {
        stdio: "inherit"
    })

    build()

    test2()

    let confirm = await input(`\n\npublish? (y/n)\n> `)

    if (confirm == "y") {
        spawn("npm", ["publish"], {
            stdio: "inherit"
        })
    }

})
()








// import fs from 'fs';

// const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"))

// let version = fs.readFileSync("./src/theme.js", "utf8")
// const version_regex = /version:\s*["'`](.+)["'`]\s*,/

// console.log(version.replace(version_regex, ()=> {
//   return `version: '${pkg.version}',`
// }));


