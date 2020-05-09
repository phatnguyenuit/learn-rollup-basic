import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import lifecycleLog from "./plugins/rollup-plugin-lifecycle-log";
import templateString from "./plugins/rollup-plugin-template-string";
import sass from "./plugins/rollup-plugin-import-sass";
const input = "src/index.ts";
const outputName = "CbWidget";
const watchOptions = {
    chokidar: { ignored: (filename) => filename.endsWith(".d.ts") },
    clearScreen: false,
    exclude: ["*.d.ts"],
    include: ["src/**", "rollup.config.js"],
};
const lifecycleLogPlugin = lifecycleLog();
const tsPlugin = typescript();
const templatePlugin = templateString({
    emitDeclaration: true,
    include: /\.template$/,
});
const templateMinPlugin = templateString({
    htmlMinifierOptions: {
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
    },
    include: /\.template$/,
    minified: true,
});
const sassPlugin = sass({ sassOptions: { outputStyle: "expanded" } });
const sassMinPlugin = sass({ sassOptions: { outputStyle: "compressed" } });
const terserPlugin = terser({ sourcemap: true });
/** IIFE */
const iifeOptions = {
    input,
    output: {
        file: "dist/index.js",
        format: "iife",
        name: outputName,
        sourcemap: true,
    },
    plugins: [lifecycleLogPlugin, tsPlugin, templatePlugin, sassPlugin],
    watch: watchOptions,
};
/** IIFE - Minimized */
const iifeMinOptions = {
    input,
    output: {
        file: "dist/index.min.js",
        format: "iife",
        name: outputName,
        sourcemap: true,
        plugins: [terserPlugin],
    },
    plugins: [tsPlugin, templateMinPlugin, sassMinPlugin],
    watch: watchOptions,
};
/** ES */
const esOptions = {
    input,
    output: {
        file: "dist/index.es.js",
        format: "es",
        sourcemap: true,
    },
    plugins: [tsPlugin, templatePlugin, sassPlugin],
    watch: watchOptions,
};
/** ES - Minimized */
const esMinOptions = {
    input,
    output: {
        file: "dist/index.es.min.js",
        format: "es",
        sourcemap: true,
        plugins: [terserPlugin],
    },
    plugins: [tsPlugin, templateMinPlugin, sassMinPlugin],
    watch: watchOptions,
};
const options = [
    iifeOptions,
    iifeMinOptions,
    esOptions,
    esMinOptions,
];
export default options;
