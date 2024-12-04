class Title extends HTMLElement {
    id() {
        return "title-component"
    }

    connectedCallback() {
        this.innerHTML = `
<h1>Ryan Geary
<a class="navbar-icon" href="javascript:void(0);" onclick="toggleNavbarResponsive()">
    <i class="fa fa-bars"></i>
</a>
</h1>

`
    }
}

customElements.define('title-component', Title);
