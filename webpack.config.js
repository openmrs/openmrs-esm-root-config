const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src/openmrs-esm-root-config.defaults.js"),
  devtool: "sourcemap",
  output: {
    filename: "openmrs-esm-root-config.defaults.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "system"
  },
  mode: "production",
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
  externals: ["single-spa", "i18next", "react-i18next"],
  plugins: []
};
