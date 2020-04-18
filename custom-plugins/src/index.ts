import buildHtml from "./widget.template";
import "./widget.scss";

export default class CbWidget {
  private element: ChildNode | null = null;
  public onSubmit: VoidFunction = () => {};
  constructor(private selector: string, private data: object) {}

  show() {
    if (!this.selector || !window || typeof window !== "object") return;

    const html = buildHtml(this.data);
    const container = document.querySelector(this.selector);
    if (container) {
      container.innerHTML = html;
      this.element = container.firstChild;
      const form = container.querySelector("#cbForm") as HTMLFormElement;
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
