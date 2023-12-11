export default /*js*/`
import blick, { config } from "blickcss2"

export default config({
    
    input: './src/**/*.html', // Your input files by glob pattern
    output: './src/output.css', // File in which css will be generated

    // your configurations

    beautify: true, // For beautify css code
    watch: true, // For watching changing the input files and rebuilding

    
    // Uncomment the code below so that only your styles are created

    // reset: false,
    // root: false,
    // wrapper: false,
    // autoFlex: false,

})
`
