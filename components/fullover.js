class Fullover extends HTMLElement {
    static observedAttributes = ["src"];

  constructor() {
    super();
  }

    id() {
        return "zoomCheck-"+this.getAttribute("src")+"-fullover"
    }

    connectedCallback() {
        this.innerHTML = `
<div id="fullover" onclick="remove(this)">
    <img src="${this.getAttribute("src")}"/>
</div>
`
    }
}

customElements.define('fullover-component', Fullover);
