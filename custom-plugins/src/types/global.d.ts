declare module "*.scss" {
  var css: string;
  export default css;
}

declare module "*.html" {
  var transform: (data: object) => string;
  export default transform;
}

declare module "*.png" {
  var src: string;
  export default src;
}

declare module "*.svg" {
  var src: string;
  export default src;
}
