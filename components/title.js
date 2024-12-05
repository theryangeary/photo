class Title extends HTMLElement {
    static observedAttributes = ["data-title"];

    constructor() {
        super()
    }

    setTitle(title) {
        this.setAttribute("data-title", title)
    }

    connectedCallback() {
        this.render()
    }
    attributeChangedCallback() {
        this.render()
    }
    render() {
        this.innerHTML = `
<h1>${this.getAttribute("data-title")}
<a class="navbar-icon" href="javascript:void(0);" onclick="toggleNavbarResponsive()">
    <i class="fa fa-bars"></i>
</a>
</h1>

`
    }
}

customElements.define('title-component', Title);
export {Title}
