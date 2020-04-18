declare module "*.scss" {
  var css: string;
  export default css;
}

declare module "*.template" {
  var transform: (data: object) => string;
  export default transform;
}
