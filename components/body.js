class Body extends HTMLElement {
    id() {
        return "body-component"
    }

    connectedCallback() {
        this.innerHTML = `
<body>
    <title-component id="title-component" data-title="Ryan Geary"></title-component>

    <navbar-component></navbar-component>

    <fullover-component id="fullover-component"></fullover-component>

    <columns-component></columns-component>
</body>

`
    }
}

customElements.define('body-component', Body);
