/**
 * References:
 * https://github.com/bdadam/rollup-plugin-html
 * https://github.com/kangax/html-minifier
 */
import { promises } from "fs";
import { createFilter } from "@rollup/pluginutils";
import { minify } from "html-minifier";
import { toDataSource } from "./utils/sourceCode";
import { tagged } from "./utils/taggedTemplate";
export const templateRegex = /\{(.+?)\}/g;
const convertTextToTemplate = (text) => text.replace(templateRegex, "${'$1'}");
const getDataKeys = (text) => new Set([...text.matchAll(templateRegex)].map(([, value]) => value));
const buildTransformDataInterface = (text) => `{
  ${[...getDataKeys(text)].map((key) => `"${key}"?: unknown;`).join("\n  ")}
}`;
const plugin = ({ emitDeclaration, exclude, htmlMinifierOptions, include, minified, }) => {
    const filter = createFilter(include, exclude);
    const idCodeMap = {};
    return {
        name: "template-string",
        intro: `const tagged = ${toDataSource(tagged)};`,
        transform(code, id) {
            if (!filter(id))
                return null;
            if (emitDeclaration) {
                idCodeMap[id] = code;
            }
            const text = minified ? minify(code, htmlMinifierOptions) : code;
            const template = convertTextToTemplate(text);
            return {
                code: `export default tagged\`${template}\`;`,
                map: null,
            };
        },
        async generateBundle() {
            await Promise.all(Object.entries(idCodeMap).map(async ([id, code]) => {
                const transformDataInterface = buildTransformDataInterface(code);
                const content = `export interface TemplateData ${transformDataInterface}
declare const transform: (data: TemplateData) => string;
export default transform;`;
                const filename = id + ".d.ts";
                await promises.writeFile(filename, content);
            }));
        },
    };
};
export default plugin;
