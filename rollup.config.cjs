"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var plugin_node_resolve_1 = __importDefault(require("@rollup/plugin-node-resolve"));
var plugin_commonjs_1 = __importDefault(require("@rollup/plugin-commonjs"));
var plugin_typescript_1 = __importDefault(require("@rollup/plugin-typescript"));
var rollup_plugin_cleanup_1 = __importDefault(require("rollup-plugin-cleanup"));
var globals = { "cb-math-fun": "cbMathFun" };
var outputName = "cbUtils";
var options = [
    {
        input: "src/index.ts",
        external: ["cb-math-fun"],
        output: [
            {
                file: "dist/main.common.js",
                format: "cjs"
            },
            {
                file: "dist/main.es.js",
                format: "es"
            },
            {
                file: "dist/main.es.2.js",
                format: "es",
                paths: {
                    "cb-math-fun": "../node_modules/cb-math-fun/dist/index.m.js"
                }
            },
            {
                file: "dist/main.iife.js",
                format: "iife",
                name: outputName,
                globals: globals
            },
            {
                file: "dist/main.umd.js",
                format: "umd",
                name: outputName,
                globals: globals
            },
            {
                file: "dist/main.amd.js",
                format: "amd",
                globals: globals
            },
            {
                file: "dist/main.amd.2.js",
                format: "amd",
                globals: globals,
                paths: {
                    "cb-math-fun": "node_modules/cb-math-fun/dist/index.umd.js"
                }
            },
            {
                file: "dist/main.system.js",
                format: "system"
            },
            {
                file: "dist/main.system.2.js",
                format: "system",
                paths: {
                    "cb-math-fun": "../node_modules/cb-math-fun/dist/index.system.js"
                }
            },
        ],
        plugins: [
            plugin_node_resolve_1["default"](),
            plugin_commonjs_1["default"]({
                include: /node_modules/
            }),
            plugin_typescript_1["default"](),
            rollup_plugin_cleanup_1["default"]({
                comments: "none",
                compactComments: false,
                extensions: ["ts"],
                sourcemap: false
            }),
        ]
    },
];
exports["default"] = options;
