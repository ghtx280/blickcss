// const TerserPlugin = require('terser-webpack-plugin');
// const path = require("path");
import TerserPlugin from 'terser-webpack-plugin';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

export default {
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
