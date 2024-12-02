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
            <a href="?selectedworks=street">Street Photography</a>
            <a href="?selectedworks=cityscape">Cityscapes</a>
            <a href="?selectedworks=landscape">Landscape</a>
            <a href="?selectedworks=wildlife">Wildlife</a>
        </div>
    </li>
    <li class="dropdown">
        <a href="javascript:void(0)" class="dropbtn">On Location</a>
        <div class="dropdown-content">
            <a href="?trip=pnw2024">Pacific Northwest</a>
            <a href="?trip=ecuador">Ecuador</a>
            <a href="?trip=utah">Utah</a>
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
            <a href="?archive=202411">November 2024</a>
        </div>
    </li>
</ul>
`
    }
}

customElements.define('navbar-component', Navbar);
