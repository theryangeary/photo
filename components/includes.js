class Includes extends HTMLElement {
    id() {
        return "body-component"
    }

    connectedCallback() {
        this.innerHTML = `
<script src="components/columns.js" type="text/javascript" defer></script>
<script src="components/fullover.js" type="text/javascript" defer></script>
<script src="components/navbar.js" type="text/javascript" defer></script>
<script src="components/photo.js" type="text/javascript" defer></script>
<script src="components/title.js" type="text/javascript" defer></script>

`
    }
}

customElements.define('includes-component', Includes);
