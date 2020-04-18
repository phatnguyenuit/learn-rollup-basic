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
            if (!filter(id))
                return null;
            const options = { ...sassOptions, data: code };
            const { css } = await renderSass(options);
            const cssText = css.toString().trim();
            const sourceCode = `export default ${toExecutionSource(insertStyle, cssText)};`;
            return {
                code: sourceCode,
            };
        },
    };
};
export default plugin;
