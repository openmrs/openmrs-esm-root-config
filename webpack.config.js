const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;

module.exports = {
  entry: path.resolve(__dirname, "src/openmrs-esm-root-config.defaults.js"),
  output: {
    filename: "openmrs-esm-root-config.defaults.js",
    libraryTarget: "system",
    path: path.resolve(__dirname, "dist"),
    jsonpFunction: "webpackJsonp_openmrs_esm_root_config",
  },
  module: {
    rules: [
      {
        parser: {
          system: false,
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
      },
    ],
  },
  devtool: "sourcemap",
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    disableHostCheck: true,
  },
  externals: [
    "single-spa",
    "i18next",
    "react-i18next",
    "react",
    "react-dom",
    /^@openmrs\/esm/,
  ],
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    extensions: [".ts", ".jsx", ".js"],
  },
};
