/**
 * References:
 * rollup-plugin-sass: https://github.com/differui/rollup-plugin-sass/blob/master/src/index.js
 */

import { Plugin, TransformResult, ExistingRawSourceMap } from "rollup";
import { FilterPattern, createFilter } from "@rollup/pluginutils";
import { Options } from "node-sass";
import { renderSass, insertStyle } from "./utils/css";
import { toExecutionSource } from "./utils/sourceCode";

const plugin = ({
  exclude,
  include = [/\.scss$/, /\.sass$/],
  sassOptions,
}: ImportSassPluginOptions): Plugin => {
  const filter = createFilter(include, exclude);

  return {
    name: "import-sass",
    async transform(code, id): Promise<TransformResult> {
      if (!filter(id)) return null;

      const options: Options = { ...sassOptions, data: code };
      const { css, map } = await renderSass(options);
      const cssText = css.toString().trim();
      const sourceCode = `export default ${toExecutionSource(
        insertStyle,
        cssText
      )};`;
      const sourcemap = {
        mappings: map?.toString() ?? "",
      } as ExistingRawSourceMap;

      return {
        code: sourceCode,
        map: sourcemap,
      };
    },
  };
};

export default plugin;

export interface ImportSassPluginOptions {
  exclude?: FilterPattern;
  include?: FilterPattern;
  sassOptions?: Options;
}
