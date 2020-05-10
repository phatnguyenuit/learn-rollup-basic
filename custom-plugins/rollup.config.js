import filesize from "rollup-plugin-filesize";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import lifecycleLog from "./plugins/rollup-plugin-lifecycle-log";
import inlineImage from "./plugins/rollup-plugin-inline-image";
import templateString from "./plugins/rollup-plugin-template-string";
import sass from "./plugins/rollup-plugin-import-sass";
import pkg from "./package.json";
const templateInclude = [/\.html$/, /\.template$/];
const watchOptions = {
    chokidar: { ignored: (filename) => filename.endsWith(".d.ts") },
    clearScreen: false,
    exclude: ["*.d.ts"],
    include: ["src/**", "rollup.config.js"],
};
const lifecycleLogPlugin = lifecycleLog();
const filesizePlugin = filesize();
const tsPlugin = typescript();
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
/** UMD */
const umdOptions = {
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
        tsPlugin,
        templateMinPlugin,
        sassMinPlugin,
        inlineImagePlugin,
        filesizePlugin,
    ],
    watch: watchOptions,
};
/** NON-MINIMIZED */
const nonMinOptions = {
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
        tsPlugin,
        templatePlugin,
        sassPlugin,
        inlineImagePlugin,
        filesizePlugin,
    ],
    watch: watchOptions,
};
/** MINIMIZED */
const minOptions = {
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
        tsPlugin,
        templateMinPlugin,
        sassMinPlugin,
        inlineImagePlugin,
        filesizePlugin,
    ],
    watch: watchOptions,
};
const options = [umdOptions, nonMinOptions, minOptions];
export default options;
