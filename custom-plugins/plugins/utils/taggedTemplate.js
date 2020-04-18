export const tagged = (tokens, ...keys) => (data) => tokens.reduce((result, token, index) => {
    var _a;
    return result +
        (index < keys.length ? token + String((_a = data[keys[index]]) !== null && _a !== void 0 ? _a : "") : token);
}, "");
