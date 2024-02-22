import * as esbuild from 'esbuild';

export function build() {
    const lib_name = 'blick';

    esbuild.buildSync({
        entryPoints: ['./src/browser.js'],
        bundle: true,
        format: 'iife',
        outfile: `./dist/${lib_name}.js`,
        sourcemap: true,
        target: "es6"
    });

    esbuild.buildSync({
        entryPoints: ['./src/browser.js'],
        bundle: true,
        minify: true,
        outfile: `./dist/${lib_name}.min.js`,
        sourcemap: true,
        target: "es6"
    });

    esbuild.buildSync({
        entryPoints: ['./src/node/index.js'],
        bundle: true,
        platform: 'node',
        packages: 'external',
        format: 'esm',
        outfile: `./dist/${lib_name}.node.js`,
        // target: "es6"
    });

    console.log('\nBuilding complete!\n');
}

build()