class Navbar extends HTMLElement {
    id() {
        return "navbar"
    }

    connectedCallback() {
        this.innerHTML = `
<ul>
    <li><a href="?">Home</a></li>
    <li class="dropdown">
        <a href="javascript:void(0)" class="dropbtn">Selected Works</a>
        <div class="dropdown-content">
            <a href="?tag=panorama">Panoramas</a>
            <a href="?tag=selectedworks&tag=street">Street Photography</a>
            <a href="?tag=selectedworks&tag=cityscape">Cityscapes</a>
            <a href="?tag=selectedworks&tag=landscape">Landscape</a>
            <a href="?tag=selectedworks&tag=wildlife">Wildlife</a>
        </div>
    </li>
    <li class="dropdown">
        <a href="javascript:void(0)" class="dropbtn">On Location</a>
        <div class="dropdown-content">
            <a href="?tag=pnw2024&prefix=2024">Pacific Northwest</a>
            <a href="?tag=ecuador&prefix=2024">Ecuador</a>
            <a href="?tag=utah&prefix=2024">Utah</a>
        </div>
    </li>
    <li class="dropdown">
        <a href="javascript:void(0)" class="dropbtn">Archive</a>
        <div class="dropdown-content">
            <a href="?archive=202405">May 2024</a>
            <a href="?archive=202406">June 2024</a>
            <a href="?archive=202407">July 2024</a>
            <a href="?archive=202408">August 2024</a>
            <a href="?archive=202409">September 2024</a>
            <a href="?archive=202410">October 2024</a>
        </div>
    </li>
</ul>
`
    }
}

customElements.define('navbar-component', Navbar);