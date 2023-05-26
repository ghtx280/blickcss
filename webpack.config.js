const TerserPlugin = require('terser-webpack-plugin');
const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    "blick": "./src/index.js",
    "blick.min": "./src/index.js",
  },
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      include: /\.min\.js$/,
    })],
  },
};
