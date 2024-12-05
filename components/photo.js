class Photo extends HTMLElement {
    static observedAttributes = ["src", "title"];

    constructor() {
        super();
    }

    id() {
        return "zoomCheck-"+this.getAttribute("src")
    }

    getTitle() {
        if (this.getAttribute("title") === undefined || this.getAttribute("title") === null) {
            return ""
        }
        return `title="${this.getAttribute("title")}"`
    }

    connectedCallback() {
        this.innerHTML = `
<img onclick="displayFullover(this)" src="${this.getAttribute("src")}" ${this.getTitle()} loading="lazy">
`
    }
}

customElements.define('photo-component', Photo);
export {Photo}
