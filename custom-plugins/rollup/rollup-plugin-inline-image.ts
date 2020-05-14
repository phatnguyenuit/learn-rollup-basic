/**
 * References:
 * https://github.com/rollup/plugins/blob/master/packages/image/src/index.js
 */

import { extname } from "path";
import { promises } from "fs";
import { Plugin } from "rollup";
import { FilterPattern, createFilter } from "@rollup/pluginutils";
import Svgo from "svgo";
import miniSvgDataURI from "mini-svg-data-uri";

const svgo = new Svgo();

const defaultInclude: FilterPattern = [
  /\.png$/,
  /\.jpg$/,
  /\.jpeg$/,
  /\.bmp$/,
  /\.svg$/,
  /\.webp$/,
];

const getMediaType = (extname: string) => {
  switch (extname) {
    case ".svg":
      return "image/svg+xml";

    case ".jpg":
      return "image/jpeg";

    default:
      return `image/${extname.substr(1)}`;
  }
};

const isSvg = (id: string) => id.match(/\.svg$/);

const getSvgDataURI = async (id: string) => {
  const encoding: BufferEncoding = "utf-8";
  const svgStr = await promises.readFile(id, encoding);
  const optimizedSvg = await svgo.optimize(svgStr);
  return miniSvgDataURI(optimizedSvg.data);
};

const getImageDataURI = async (id: string) => {
  const encoding: BufferEncoding = "base64";
  const data = await promises.readFile(id, encoding);
  const type = getMediaType(extname(id));
  return `data:${type};${encoding},${data}`;
};

const plugin = ({
  exclude,
  include = defaultInclude,
}: InlineImagePluginOptions = {}): Plugin => {
  const filter = createFilter(include, exclude);

  return {
    name: "inline-image",
    async load(id) {
      if (!filter(id)) return null;

      const dataURI = isSvg(id)
        ? await getSvgDataURI(id)
        : await getImageDataURI(id);
      return `export default ${JSON.stringify(dataURI)};`;
    },
  };
};

export default plugin;

export interface InlineImagePluginOptions {
  exclude?: FilterPattern;
  include?: FilterPattern;
}
