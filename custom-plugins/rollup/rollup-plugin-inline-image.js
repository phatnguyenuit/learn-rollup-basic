/**
 * References:
 * https://github.com/rollup/plugins/blob/master/packages/image/src/index.js
 */
import { extname } from "path";
import { promises } from "fs";
import { createFilter } from "@rollup/pluginutils";
import Svgo from "svgo";
import miniSvgDataURI from "mini-svg-data-uri";
const svgo = new Svgo();
const defaultInclude = [
    /\.png$/,
    /\.jpg$/,
    /\.jpeg$/,
    /\.bmp$/,
    /\.svg$/,
    /\.webp$/,
];
const getMediaType = (extname) => {
    switch (extname) {
        case ".svg":
            return "image/svg+xml";
        case ".jpg":
            return "image/jpeg";
        default:
            return `image/${extname.substr(1)}`;
    }
};
const isSvg = (id) => id.match(/\.svg$/);
const getSvgDataURI = async (id) => {
    const encoding = "utf-8";
    const svgStr = await promises.readFile(id, encoding);
    const optimizedSvg = await svgo.optimize(svgStr);
    return miniSvgDataURI(optimizedSvg.data);
};
const getImageDataURI = async (id) => {
    const encoding = "base64";
    const data = await promises.readFile(id, encoding);
    const type = getMediaType(extname(id));
    return `data:${type};${encoding},${data}`;
};
const plugin = ({ exclude, include = defaultInclude, } = {}) => {
    const filter = createFilter(include, exclude);
    return {
        name: "inline-image",
        async load(id) {
            if (!filter(id))
                return null;
            const dataURI = isSvg(id)
                ? await getSvgDataURI(id)
                : await getImageDataURI(id);
            return `export default ${JSON.stringify(dataURI)};`;
        },
    };
};
export default plugin;
