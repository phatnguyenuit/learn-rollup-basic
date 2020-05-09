import "./widget.scss";
export default class CbWidget {
    private selector;
    private data;
    private container;
    onSubmit: VoidFunction;
    constructor(selector: string, data: object);
    show(): void;
    dispose(): void;
}
