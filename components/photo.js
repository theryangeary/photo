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
<img src="${this.getAttribute("src")}">
`

        //this.innerHTML = `
//<div class="container">
  //<input type="checkbox" id="${this.id()}">
  //<label for="${this.id()}">
    //<img src="${this.getAttribute("src")}">
  //</label>
//</div>
//`
    }
}

customElements.define('photo-component', Photo);

