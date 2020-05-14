import { resolve } from "path";
import { Plugin } from "rollup";
import { FilterPattern, createFilter } from "@rollup/pluginutils";

const isAbsoluteImport = (source: string) => /^\w/.test(source);

const plugin = ({
  baseUrl,
  exclude,
  include,
}: AbsoluteImportPluginOptions): Plugin => {
  const filter = createFilter(include, exclude);

  return {
    name: "absolute-import",
    resolveId(source: string, importer?: string) {
      if (!importer || !isAbsoluteImport(source) || !filter(source))
        return null;
      return resolve(process.cwd(), baseUrl, source);
    },
  };
};

export default plugin;

export interface AbsoluteImportPluginOptions {
  baseUrl: string;
  exclude?: FilterPattern;
  include?: FilterPattern;
}
