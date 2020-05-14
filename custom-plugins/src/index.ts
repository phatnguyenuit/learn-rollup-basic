import buildHtml, { TemplateData } from "templates/widget.html";
import captionImg from "images/search.svg";
import img from "images/gear.png";
import "./styles.scss";

export default class CbWidget {
  private container: Element | null = null;
  public onSubmit: VoidFunction = () => {};
  constructor(private selector: string, private data: object) {}

  show() {
    if (!this.selector || !window || typeof window !== "object") return;

    const htmlData: TemplateData = { captionImg, img, ...this.data };
    const html = buildHtml(htmlData);
    const container = document.querySelector(this.selector);
    if (container) {
      container.innerHTML = html;
      this.container = container;
      const form = container.querySelector("#cbForm") as HTMLFormElement;
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
