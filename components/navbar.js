class Navbar extends HTMLElement {
    id() {
        return "navbar"
    }

    connectedCallback() {
        this.render()
    }

    render() {
        this.innerHTML = `
<ul class="navbar" id="navbar">
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
        Array.from(document.getElementsByClassName("dropbtn")).forEach(
            (dropbtn) => dropbtn.addEventListener("click", () => this.toggleDropdown(dropbtn))
        )
    }

    toggleDropdown(t) {
        if (window.matchMedia("(min-width: 600px)").matches) {
            // don't set active on desktop, prefering hover
            return
        }
        let dropdown = t.parentElement
        let dropdowns = document.getElementsByClassName("dropdown")
        if (dropdown.className === "dropdown") {
            // ensure only one dropdown is active
            for (let i = 0; i < dropdowns.length; i++) {
                if (dropdowns[i] === dropdown) {
                    continue
                }
                dropdowns[i].className = "dropdown"
            }
            dropdown.classList.add("active")
        } else {
            dropdown.className = "dropdown"
        }
    }

}



customElements.define('navbar-component', Navbar);
export {Navbar}
