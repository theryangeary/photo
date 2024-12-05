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
    <a id="navbar-icon" class="navbar-icon" href="javascript:void(0);" >
        <i class="fa fa-bars"></i>
    </a>
</h1>

`
        document.getElementById("navbar-icon").addEventListener("click", this.toggleNavbarResponsive)
    }

    /* Toggle between adding and removing the "responsive" class to navbar when the user clicks on the icon */
    toggleNavbarResponsive() {
        var x = document.getElementById("navbar");
        if (x.className === "navbar") {
            x.className += " responsive";
        } else {
            x.className = "navbar";
        }
    }
}

customElements.define('title-component', Title);
export {Title}
