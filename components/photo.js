class Photo extends HTMLElement {
    static observedAttributes = ["src"];

  constructor() {
    super();
  }

    id() {
        return "zoomCheck-"+this.getAttribute("src")
    }

    connectedCallback() {
        this.innerHTML = `
<img onclick="displayFullover(this)" src="${this.getAttribute("src")}" loading="lazy">
`
//<img onclick="displayFullover(${this.getAttribute("src")})" src="${this.getAttribute("src")}">
    }
}

customElements.define('photo-component', Photo);
