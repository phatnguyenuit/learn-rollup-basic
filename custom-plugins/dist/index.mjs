const tagged = (tokens, ...keys) => (data) => tokens.reduce((result, token, index) => {
    var _a;
    return result +
        (index < keys.length ? token + String((_a = data[keys[index]]) !== null && _a !== void 0 ? _a : "") : token);
}, "");

var buildHtml = tagged`<form class="cb-form" id="cbForm">
  <div class="cb-form-caption">
    <img class="cb-form-caption-img" src="${'captionImg'}" alt="caption-img" />
    ${'caption'}
  </div>
  <img class="cb-form-img" src="${'img'}" alt="image" />
  <div class="cb-form-group">
    <label for="name">${'nameLabel'}:</label>
    <input type="text" name="name" value="${'name'}" />
  </div>
  <div class="cb-form-group">
    <label for="password">${'passwordLabel'}:</label>
    <input type="password" name="password" value="${'password'}" />
  </div>
  <div class="cb-form-group">
    <button type="submit">${'submitLabel'}</button>
  </div>
</form>
`;

var captionImg = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128' width='64' height='64'%3e%3cpath d='M52.35 14.4c-9.725 0-19.45 3.7-26.85 11.1-14.8 14.8-14.8 38.9 0 53.7 7.4 7.4 17.1 11.1 26.9 11.1 9.8 0 19.5-3.7 26.9-11.1C94 64.4 94 40.3 79.2 25.5c-7.4-7.4-17.125-11.1-26.85-11.1zm-.05 5.9c8.2 0 16.4 3.1 22.6 9.4C87.4 42.2 87.4 62.5 75 75c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3a31.97 31.97 0 0122.6-9.4zm0 6C45.4 26.3 38.9 29 34 34c-4.7 4.7-7.3 10.8-7.6 17.4-.1 1.7 1.2 3 2.9 3.1h.1c1.6 0 2.9-1.3 3-2.9.2-5.1 2.3-9.8 5.8-13.4 3.8-3.8 8.8-5.9 14.1-5.9 1.7 0 3-1.3 3-3s-1.3-3-3-3zM35 64a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3zm48.363 16.5c-.762 0-1.512.3-2.062.9-1.2 1.2-1.2 3.1 0 4.2l2.5 2.5c-.6 1.2-.9 2.5-.9 3.9 0 2.4.899 4.7 2.599 6.4L98.3 111c1.8 1.8 4.1 2.7 6.4 2.7 2.3 0 4.6-.9 6.4-2.6 3.5-3.5 3.5-9.2 0-12.7L98.3 85.6c-1.7-1.7-4-2.6-6.4-2.6-1.4 0-2.7.3-3.9.9l-2.5-2.5c-.6-.6-1.374-.9-2.137-.9zm8.537 8.4c.8 0 1.6.3 2.1.9l12.7 12.7c1.2 1.2 1.2 3.1 0 4.2-1.2 1.2-3.1 1.2-4.2 0L89.8 94.1c-.6-.6-.9-1.4-.9-2.2 0-.8.3-1.6.9-2.1.6-.6 1.3-.9 2.1-.9z'/%3e%3c/svg%3e";

var img = "data:image/png;base64,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";

((css) => {
    if (css && window && typeof window === "object") {
        const style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = css;
        document.head.appendChild(style);
    }
    return css;
})(".cb-form {\n  display: flex;\n  flex-direction: column;\n  max-width: 400px;\n  margin: 32px auto 0;\n  font-family: Roboto, \"Franklin Gothic Medium\", \"Arial Narrow\", Arial, sans-serif;\n}\n\n.cb-form .cb-form-caption {\n  font-size: 24px;\n  font-weight: bold;\n  text-align: center;\n  line-height: 32px;\n}\n\n.cb-form .cb-form-caption-img {\n  display: inline-block;\n  height: 32px;\n  margin: 0 8px 0 0;\n  vertical-align: middle;\n}\n\n.cb-form .cb-form-img {\n  display: block;\n  margin: 8px auto;\n}\n\n.cb-form .cb-form-group {\n  display: flex;\n  align-items: center;\n  margin: 12px 0;\n}\n\n.cb-form .cb-form-group label {\n  width: 132px;\n  font-weight: bold;\n}\n\n.cb-form .cb-form-group input {\n  flex: 1;\n  padding: 6px 12px;\n}\n\n.cb-form .cb-form-group [type=\"submit\"] {\n  flex: 1;\n  display: block;\n  max-width: calc(100% - 132px);\n  margin-left: auto;\n  padding: 6px 32px;\n}");

class CbWidget {
    constructor(selector, data) {
        this.selector = selector;
        this.data = data;
        this.container = null;
        this.onSubmit = () => { };
    }
    show() {
        if (!this.selector || !window || typeof window !== "object")
            return;
        const htmlData = { captionImg, img, ...this.data };
        const html = buildHtml(htmlData);
        const container = document.querySelector(this.selector);
        if (container) {
            container.innerHTML = html;
            this.container = container;
            const form = container.querySelector("#cbForm");
            form.onsubmit = (e) => {
                e.preventDefault();
                this.onSubmit();
            };
        }
    }
    dispose() {
        if (this.container) {
            this.container.innerHTML = "";
        }
    }
}

export default CbWidget;
//# sourceMappingURL=index.mjs.map
