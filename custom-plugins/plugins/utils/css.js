import { render } from "node-sass";
export const renderSass = (options) => new Promise((resolve, reject) => render(options, (err, res) => {
    if (err)
        return reject(err);
    return resolve(res);
}));
export const insertStyle = (css) => {
    if (css && window && typeof window === "object") {
        const style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = css;
        document.head.appendChild(style);
    }
    return css;
};
