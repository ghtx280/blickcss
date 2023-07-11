export default `module.exports = {
  input: "./src/**/*.{html,js}", // Your input files by glob pattern
  output: "./src/output.css",    // File in which css will be generated

  // your configurations

  beautify: true, // For beautify css code
  watch: true, // For watching changing the input files and rebuilding

  server: false,
  // If you need a live preview server, uncomment the code below
  // server: {
  //   open: true
  // }
}`;
