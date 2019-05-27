const path = require("path");

module.exports = {
  entry: __dirname + "/src/root-config-dist.js",
  devtool: "sourcemap",
  output: {
    filename: "root-config-dist.js",
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
  externals: ["single-spa"],
  plugins: []
};
