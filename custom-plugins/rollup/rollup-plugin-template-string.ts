/**
 * References:
 * https://github.com/bdadam/rollup-plugin-html
 * https://github.com/kangax/html-minifier
 */

import { promises } from "fs";
import { Plugin } from "rollup";
import { createFilter, FilterPattern } from "@rollup/pluginutils";
import { minify, Options } from "html-minifier";
import { toDataSource } from "./utils/sourceCode";
import { tagged } from "./utils/taggedTemplate";

export const templateRegex = /\{(.+?)\}/g;

const convertTextToTemplate = (text: string) =>
  text.replace(templateRegex, "${'$1'}");

const getDataKeys = (text: string) =>
  new Set([...text.matchAll(templateRegex)].map(([, value]) => value));

const buildTransformDataInterface = (text: string) => `{
  ${[...getDataKeys(text)].map((key) => `"${key}"?: unknown;`).join("\n  ")}
}`;

const plugin = ({
  emitDeclaration,
  exclude,
  htmlMinifierOptions,
  include,
  minified,
}: TemplateStringPluginOptions): Plugin => {
  const filter = createFilter(include, exclude);
  const idCodeMap: Record<string, string> = {};

  return {
    name: "template-string",
    intro: `const tagged = ${toDataSource(tagged)};`,
    transform(code, id) {
      if (!filter(id)) return null;

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
      await Promise.all(
        Object.entries(idCodeMap).map(async ([id, code]) => {
          const transformDataInterface = buildTransformDataInterface(code);
          const content = `export interface TemplateData ${transformDataInterface}
declare const transform: (data: TemplateData) => string;
export default transform;`;
          const filename = id + ".d.ts";
          await promises.writeFile(filename, content);
        })
      );
    },
  };
};

export default plugin;

export interface TemplateStringPluginOptions {
  emitDeclaration?: boolean;
  exclude?: FilterPattern;
  htmlMinifierOptions?: Options;
  include?: FilterPattern;
  minified?: boolean;
}
