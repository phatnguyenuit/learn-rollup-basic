export const toDataSource = (o: unknown) => {
  switch (typeof o) {
    case "function":
      return o.toString();

    case "object":
    case "undefined":
    case "string":
      return JSON.stringify(o);

    default:
      return String(o);
  }
};

export const toExecutionSource = <TArgs extends any[]>(
  func: (...args: TArgs) => any,
  ...args: TArgs
) => `(${toDataSource(func)})(${args.map(toDataSource).join(", ")})`;
