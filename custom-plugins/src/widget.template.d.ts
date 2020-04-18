export interface TemplateData {
  "caption"?: unknown;
  "nameLabel"?: unknown;
  "name"?: unknown;
  "passwordLabel"?: unknown;
  "password"?: unknown;
  "submitLabel"?: unknown;
}
declare const transform: (data: TemplateData) => string;
export default transform;