import babel from "rollup-plugin-babel";

export default {
  input: "src/root-config-dist.js",
  output: {
    file: "dist/root-config-dist.js",
    format: "system",
    sourcemap: true
  },
  external: ["single-spa"],
  plugins: [
    babel({
      exclude: "node_modules/**"
    })
  ]
};
