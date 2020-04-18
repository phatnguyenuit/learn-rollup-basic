import { RollupOptions, GlobalsOption } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import cleanup from "rollup-plugin-cleanup";

const globals: GlobalsOption = { "cb-math-fun": "cbMathFun" };
const outputName = "cbUtils";

const options: RollupOptions[] = [
  {
    input: "src/index.ts",
    external: ["cb-math-fun"],
    output: [
      {
        file: "dist/main.common.js",
        format: "cjs",
      },
      {
        file: "dist/main.es.js",
        format: "es",
      },
      {
        file: "dist/main.es.2.js",
        format: "es",
        paths: {
          "cb-math-fun": "../node_modules/cb-math-fun/dist/index.m.js",
        },
      },
      {
        file: "dist/main.iife.js",
        format: "iife",
        name: outputName,
        globals,
      },
      {
        file: "dist/main.umd.js",
        format: "umd",
        name: outputName,
        globals,
      },
      {
        file: "dist/main.amd.js",
        format: "amd",
        globals,
      },
      {
        file: "dist/main.amd.2.js",
        format: "amd",
        globals,
        paths: {
          "cb-math-fun": "node_modules/cb-math-fun/dist/index.umd.js",
        },
      },
      {
        file: "dist/main.system.js",
        format: "system",
      },
      {
        file: "dist/main.system.2.js",
        format: "system",
        paths: {
          "cb-math-fun": "../node_modules/cb-math-fun/dist/index.system.js",
        },
      },
    ],
    plugins: [
      resolve(),
      commonjs({
        include: /node_modules/,
      }),
      typescript(),
      cleanup({
        comments: "none",
        compactComments: false,
        extensions: ["ts"],
        sourcemap: false,
      }),
    ],
    watch: {
      include: ["src/**", "rollup.config.js"],
    },
  },
];

export default options;
