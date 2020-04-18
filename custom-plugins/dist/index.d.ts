import "./widget.scss";
export default class CbWidget {
    private selector;
    private data;
    private element;
    onSubmit: VoidFunction;
    constructor(selector: string, data: object);
    show(): void;
    dispose(): void;
}
