requirejs.config({
  packages: [
    {
      name: "cb-math-fun",
      location: "node_modules/cb-math-fun/dist",
      main: "index.umd.js",
    },
  ],
});

requirejs(["dist/main.amd.js"]);
