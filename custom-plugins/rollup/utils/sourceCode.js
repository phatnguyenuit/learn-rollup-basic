export const toDataSource = (o) => {
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
export const toExecutionSource = (func, ...args) => `(${toDataSource(func)})(${args.map(toDataSource).join(", ")})`;
