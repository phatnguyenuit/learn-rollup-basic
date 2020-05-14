import { RollupOptions, WatcherOptions } from "rollup";
import { FilterPattern } from "@rollup/pluginutils";
import filesize from "rollup-plugin-filesize";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import analyzer from "rollup-plugin-analyzer";
import lifecycleLog from "./rollup-plugin-lifecycle-log";
import absoluteImport from "./rollup-plugin-absolute-import";
import inlineImage from "./rollup-plugin-inline-image";
import templateString from "./rollup-plugin-template-string";
import sass from "./rollup-plugin-import-sass";
import pkg from "../package.json";
import tsconfig from "../tsconfig.json";

const templateInclude: FilterPattern = [/\.html$/, /\.template$/];
const watchOptions: WatcherOptions = {
  chokidar: { ignored: (filename: string) => filename.endsWith(".d.ts") },
  clearScreen: false,
  exclude: ["*.d.ts"],
  include: ["src/**", "rollup.config.js"],
};
const lifecycleLogPlugin = lifecycleLog();
const absoluteImportPlugin = absoluteImport({
  baseUrl: tsconfig.compilerOptions.baseUrl,
});
const filesizePlugin = filesize();
const tsPlugin = typescript({ tsconfig: "./tsconfig.json" });
const templatePlugin = templateString({
  emitDeclaration: true,
  include: templateInclude,
});
const templateMinPlugin = templateString({
  htmlMinifierOptions: {
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
  },
  include: templateInclude,
  minified: true,
});
const sassPlugin = sass({ sassOptions: { outputStyle: "expanded" } });
const sassMinPlugin = sass({ sassOptions: { outputStyle: "compressed" } });
const inlineImagePlugin = inlineImage();
const terserPlugin = terser({ sourcemap: true });
const analyzerPlugin = analyzer({ summaryOnly: true });

/** UMD */
const umdOptions: RollupOptions = {
  input: pkg.source,
  output: {
    file: pkg["umd:main"],
    format: "umd",
    name: pkg.expose,
    sourcemap: true,
    plugins: [terserPlugin],
  },
  plugins: [
    lifecycleLogPlugin,
    absoluteImportPlugin,
    tsPlugin,
    templateMinPlugin,
    sassMinPlugin,
    inlineImagePlugin,
    filesizePlugin,
    analyzerPlugin,
  ],
  watch: watchOptions,
};

/** NON-MINIMIZED */
const nonMinOptions: RollupOptions = {
  input: pkg.source,
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [
    absoluteImportPlugin,
    tsPlugin,
    templatePlugin,
    sassPlugin,
    inlineImagePlugin,
    filesizePlugin,
  ],
  watch: watchOptions,
};

/** MINIMIZED */
const minOptions: RollupOptions = {
  input: pkg.source,
  output: [
    {
      file: pkg["main:min"],
      format: "cjs",
      sourcemap: true,
      plugins: [terserPlugin],
    },
    {
      file: pkg["module:min"],
      format: "es",
      sourcemap: true,
      plugins: [terserPlugin],
    },
  ],
  plugins: [
    absoluteImportPlugin,
    tsPlugin,
    templateMinPlugin,
    sassMinPlugin,
    inlineImagePlugin,
    filesizePlugin,
  ],
  watch: watchOptions,
};

const options: RollupOptions[] = [umdOptions, nonMinOptions, minOptions];

export default options;
