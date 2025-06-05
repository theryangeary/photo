class Photo extends HTMLElement {
    static observedAttributes = ["src", "title"];

    constructor() {
        super();
    }

    id() {
        return "zoomCheck-"+this.getAttribute("src");
    }

    getTitle() {
        if (this.getAttribute("title") === undefined || this.getAttribute("title") === null) {
            return "";
        }
        return `title="${this.getAttribute("title")}"`;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
<img src="${this.getAttribute("src")}" ${this.getTitle()} loading="lazy">
`;
        this.addEventListener("click", () =>{
            document.dispatchEvent(
                new CustomEvent("photoclick", {
                    detail: {
                        photo: this,
                    },
                })
            );
        });
    }
}

customElements.define("photo-component", Photo);
export {Photo};
