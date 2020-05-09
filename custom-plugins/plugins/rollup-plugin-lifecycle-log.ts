import { Plugin } from "rollup";
import { blueBright, cyanBright, grey } from "chalk";

const maxLineLength = 800;
const hookLog = (hookName: string) => `Hook ${cyanBright(`'${hookName}':`)}`;
const paramLog = (paramName: string, paramValue: any) => {
  const stringified = JSON.stringify(paramValue, null, 2);
  const text =
    stringified?.length > maxLineLength
      ? stringified.substr(0, maxLineLength) + "..."
      : stringified;
  return `\t${blueBright(paramName)}: ${text}`;
};
const log = (...lines: string[]) => {
  console.log("\n", grey("--------------------"));
  lines.forEach((line) => console.log(line));
  console.log(grey("--------------------"), "\n");
};

const plugin = (): Plugin => ({
  name: "lifecycle-log",

  /**
   * Build Hooks
   */
  options: (options) => {
    log(hookLog("options"), paramLog("options", options));
    return null;
  },
  buildStart: (options) => {
    log(hookLog("buildStart"), paramLog("options", options));
  },
  resolveId: (source, importer) => {
    log(
      hookLog("resolveId"),
      paramLog("source", source),
      paramLog("importer", importer)
    );
    return null;
  },
  load: (id) => {
    log(hookLog("load"), paramLog("id", id));
    return null;
  },
  transform: (code, id) => {
    log(hookLog("transform"), paramLog("code", code), paramLog("id", id));
    return null;
  },
  resolveDynamicImport: (specifier, importer) => {
    log(
      hookLog("resolveDynamicImport"),
      paramLog("specifier", specifier),
      paramLog("importer", importer)
    );
    return null;
  },
  buildEnd: (error) => {
    log(hookLog("buildEnd"), paramLog("error", error));
  },

  /**
   * Output Hooks
   */
  outputOptions: (outputOptions) => {
    log(hookLog("outputOptions"), paramLog("outputOptions", outputOptions));
    return null;
  },
  renderStart: (outputOptions, inputOptions) => {
    log(
      hookLog("renderStart"),
      paramLog("outputOptions", outputOptions),
      paramLog("inputOptions", inputOptions)
    );
  },
  banner: () => {
    log(hookLog("banner"));
    return "";
  },
  footer: () => {
    log(hookLog("footer"));
    return "";
  },
  intro: () => {
    log(hookLog("intro"));
    return "";
  },
  outro: () => {
    log(hookLog("outro"));
    return "";
  },
  renderDynamicImport: (options) => {
    log(hookLog("renderDynamicImport"), paramLog("options", options));
    return null;
  },
  augmentChunkHash: (chunk) => {
    log(hookLog("augmentChunkHash"), paramLog("chunk", chunk));
  },
  resolveFileUrl: (options) => {
    log(hookLog("resolveFileUrl"), paramLog("options", options));
    return null;
  },
  resolveImportMeta: (prop, options) => {
    log(
      hookLog("resolveImportMeta"),
      paramLog("prop", prop),
      paramLog("options", options)
    );
    return null;
  },
  renderChunk: (code, chunk, options) => {
    log(
      hookLog("renderChunk"),
      paramLog("code", code),
      paramLog("chunk", chunk),
      paramLog("options", options)
    );
    return null;
  },
  renderError: (error) => {
    log(hookLog("renderError"), paramLog("error", error));
  },
  generateBundle: (options, bundle, isWrite) => {
    log(
      hookLog("generateBundle"),
      paramLog("options", options),
      paramLog("bundle", bundle),
      paramLog("isWrite", isWrite)
    );
  },
  writeBundle: (options, bundle) => {
    log(
      hookLog("writeBundle"),
      paramLog("options", options),
      paramLog("bundle", bundle)
    );
  },

  /**
   * Watch Hooks
   */
  watchChange: (id) => {
    log(hookLog("watchChange"), paramLog("id", id));
  },
});

export default plugin;
