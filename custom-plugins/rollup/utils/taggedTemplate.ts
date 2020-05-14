export const tagged = (tokens: TemplateStringsArray, ...keys: string[]) => (
  data: Record<string, unknown>
) =>
  tokens.reduce(
    (result, token, index) =>
      result +
      (index < keys.length ? token + String(data[keys[index]] ?? "") : token),
    ""
  );
