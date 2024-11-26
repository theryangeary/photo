class Columns extends HTMLElement {
    id() {
        return "columns-component"
    }

    connectedCallback() {
        this.innerHTML = `
<div class="row" id="photos">
    <div class="column" id="col1"> </div>
    <div class="column" id="col2"> </div>
</div>

`
    }
}

customElements.define('columns-component', Columns);
