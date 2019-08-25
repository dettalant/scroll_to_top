import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const bannerComment = `/*!
 *   ${pkg.name}.js
 * See {@link https://github.com/dettalant/${pkg.name}}
 *
 * @author dettalant
 * @version v${pkg.version}
 * @license ${pkg.license} License
 */`;

const plugins = [
  typescript({
    useTsconfigDeclarationDir: true
  }),
];

let fileName = "./dist/" + pkg.name;
if (process.env.NODE_ENV === "production") {
  // for production build
  fileName += ".min";
  const terserOptions = {
    output: {
      comments: "some"
    }
  }

  plugins.push(terser(terserOptions));
}

export default {
  input: "./src/index.ts",
  output: {
    file: fileName + ".js",
    format: "iife",
    name: pkg.name,
    banner: bannerComment,
  },
  plugins
};
