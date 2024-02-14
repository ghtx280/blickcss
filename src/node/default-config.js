export default /*js*/`
/** @type {import('blickcss').config} */
export default (b) => ({
    input: './src/**/*.html', // Your input files by glob pattern
    output: './src/output.css', // File in which css will be generated

    // your configurations

    beautify: true, // For beautify css code
    watch: true, // For watching changing the input files and rebuilding

    
    // Uncomment the code below to disable all unnecessary code
    // Have only your styles generated

    // reset: false,
    // root: false,
    // wrapper: false,
    // autoFlex: false,
})`