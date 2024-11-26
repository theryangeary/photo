class Title extends HTMLElement {
    id() {
        return "title-component"
    }

    connectedCallback() {
        this.innerHTML = `
<h1>Ryan Geary</h1>

`
    }
}

customElements.define('title-component', Title);
