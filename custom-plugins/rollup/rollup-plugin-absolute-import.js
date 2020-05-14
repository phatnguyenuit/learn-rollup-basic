import { resolve } from "path";
import { createFilter } from "@rollup/pluginutils";
const isAbsoluteImport = (source) => /^\w/.test(source);
const plugin = ({ baseUrl, exclude, include, }) => {
    const filter = createFilter(include, exclude);
    return {
        name: "absolute-import",
        resolveId(source, importer) {
            if (!importer || !isAbsoluteImport(source) || !filter(source))
                return null;
            return resolve(process.cwd(), baseUrl, source);
        },
    };
};
export default plugin;
