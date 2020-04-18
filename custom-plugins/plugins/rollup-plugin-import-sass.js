/**
 * References:
 * https://github.com/differui/rollup-plugin-sass/blob/master/src/index.js
 */
import { createFilter } from "@rollup/pluginutils";
import { renderSass, insertStyle } from "./utils/css";
import { toExecutionSource } from "./utils/sourceCode";
const plugin = ({ exclude, include = [/\.scss$/, /\.sass$/], sassOptions, }) => {
    const filter = createFilter(include, exclude);
    return {
        name: "import-sass",
        async transform(code, id) {
            var _a;
            if (!filter(id))
                return null;
            const options = { ...sassOptions, data: code };
            const { css, map } = await renderSass(options);
            const cssText = css.toString().trim();
            const sourceCode = `export default ${toExecutionSource(insertStyle, cssText)};`;
            const sourcemap = {
                mappings: (_a = map === null || map === void 0 ? void 0 : map.toString()) !== null && _a !== void 0 ? _a : "",
            };
            return {
                code: sourceCode,
                map: sourcemap,
            };
        },
    };
};
export default plugin;
