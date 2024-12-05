class Navbar extends HTMLElement {
    id() {
        return "navbar"
    }

    connectedCallback() {
        this.innerHTML = `
<ul class="navbar" id="navbar">
    <li><a href="?">Home</a></li>
    <li class="dropdown">
        <a href="javascript:void(0)" onclick="toggleDropdown(this)" class="dropbtn">Selected Works</a>
        <div class="dropdown-content">
            <a href="?tag=panorama">Panoramas</a>
            <a href="?selectedworks=street">Street Photography</a>
            <a href="?selectedworks=cityscape">Cityscapes</a>
            <a href="?selectedworks=landscape">Landscape</a>
            <a href="?selectedworks=wildlife">Wildlife</a>
        </div>
    </li>
    <li class="dropdown">
        <a href="javascript:void(0)" onclick="toggleDropdown(this)" class="dropbtn">On Location</a>
        <div class="dropdown-content">
            <a href="?trip=pnw2024">Pacific Northwest</a>
            <a href="?trip=ecuador">Ecuador</a>
            <a href="?trip=utah">Utah</a>
        </div>
    </li>
    <li class="dropdown">
        <a href="javascript:void(0)" onclick="toggleDropdown(this)" class="dropbtn">Archive</a>
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

function toggleDropdown(t) {
    if (window.matchMedia("(min-width: 600px)").matches) {
        // don't set active on desktop, prefering hover
        return
    }
    dropdown = t.parentElement
    dropdowns = document.getElementsByClassName("dropdown")
    if (dropdown.className === "dropdown") {
        // ensure only one dropdown is active
        for (i = 0; i < dropdowns.length; i++) {
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

/* Toggle between adding and removing the "responsive" class to navbar when the user clicks on the icon */
function toggleNavbarResponsive() {
  var x = document.getElementById("navbar");
  if (x.className === "navbar") {
    x.className += " responsive";
  } else {
    x.className = "navbar";
  }
}


customElements.define('navbar-component', Navbar);
export {Navbar}
