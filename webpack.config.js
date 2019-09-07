const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;

module.exports = {
  entry: __dirname + "/src/openmrs-esm-root-config.defaults.js",
  devtool: "sourcemap",
  output: {
    filename: "openmrs-esm-root-config.defaults.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "system"
  },
  module: {
    rules: [
      {
        parser: {
          system: false
        }
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    disableHostCheck: true
  },
  externals: ["single-spa", "rxjs"],
  plugins: [new CleanWebpackPlugin()]
};
