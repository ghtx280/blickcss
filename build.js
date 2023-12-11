import * as esbuild from 'esbuild';

const lib_name = 'blick';

esbuild.buildSync({
    entryPoints: ['./src/main.js'],
    bundle: true,
    format: 'iife',
    outfile: `./dist/${lib_name}.js`,
    sourcemap: true,
});

esbuild.buildSync({
    entryPoints: ['./src/main.js'],
    bundle: true,
    minify: true,
    outfile: `./dist/${lib_name}.min.js`,
    sourcemap: true,
});

esbuild.buildSync({
    entryPoints: ['./src/node/index.js'],
    bundle: true,
    platform: 'node',
    packages: 'external',
    format: 'esm',
    outfile: `./dist/${lib_name}.node.js`,
});

console.log('\nBuilding complete!\n');