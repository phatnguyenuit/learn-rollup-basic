const tagged = (tokens, ...keys) => (data) => tokens.reduce((result, token, index) => {
    var _a;
    return result +
        (index < keys.length ? token + String((_a = data[keys[index]]) !== null && _a !== void 0 ? _a : "") : token);
}, "");

var buildHtml = tagged`<form class="cb-form" id="cbForm">
  <div class="cb-form-caption">${'caption'}</div>
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

((css) => {
    if (css && window && typeof window === "object") {
        const style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = css;
        document.head.appendChild(style);
    }
    return css;
})(".cb-form {\n  display: flex;\n  flex-direction: column;\n  max-width: 400px;\n  margin: 32px auto 0;\n  font-family: Roboto, \"Franklin Gothic Medium\", \"Arial Narrow\", Arial, sans-serif;\n}\n\n.cb-form .cb-form-caption {\n  font-size: 24px;\n  font-weight: bold;\n  text-align: center;\n}\n\n.cb-form .cb-form-group {\n  display: flex;\n  align-items: center;\n  margin: 12px 0;\n}\n\n.cb-form .cb-form-group label {\n  width: 132px;\n  font-weight: bold;\n}\n\n.cb-form .cb-form-group input {\n  flex: 1;\n  padding: 6px 12px;\n}\n\n.cb-form .cb-form-group [type=\"submit\"] {\n  flex: 1;\n  display: block;\n  max-width: calc(100% - 132px);\n  margin-left: auto;\n  padding: 6px 32px;\n}");

class CbWidget {
    constructor(selector, data) {
        this.selector = selector;
        this.data = data;
        this.element = null;
        this.onSubmit = () => { };
    }
    show() {
        if (!this.selector || !window || typeof window !== "object")
            return;
        const html = buildHtml(this.data);
        const container = document.querySelector(this.selector);
        if (container) {
            container.innerHTML = html;
            this.element = container.firstChild;
            const form = container.querySelector("#cbForm");
            form.onsubmit = (e) => {
                e.preventDefault();
                this.onSubmit();
            };
        }
    }
    dispose() {
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }
}

export default CbWidget;
//# sourceMappingURL=index.es.js.map
