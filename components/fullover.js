class Fullover extends HTMLElement {
    static observedAttributes = ["src"];

  constructor() {
    super();
  }

    id() {
        return "zoomCheck-"+this.getAttribute("src")+"-fullover"
    }

    connectedCallback() {
        document.addEventListener('keydown', (event) => {
            if (event.keyCode === 27) {
                // Escape key pressed
                this.hide()
            }
        });
        this.render()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render()
    }

    hide() {
        document.getElementById("fullover").classList.remove("show")
    }

    show() {
        document.getElementById("fullover").classList.add("show")
    }

    render() {
        const src = this.getAttribute('src')
        this.innerHTML = `
<div id="fullover" onclick="document.getElementById('fullover-component').hide()">
    <div onclick="document.getElementById('fullover-component').hide()" class="x-out"><a>&#x2715;</a></div>
    <img src="${src}"/>
</div>
`
    }
}

customElements.define('fullover-component', Fullover);
