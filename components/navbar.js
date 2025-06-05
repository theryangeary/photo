import {tree, monthName} from "./tree.js";

class Navbar extends HTMLElement {
    id() {
        return "navbar";
    }

    connectedCallback() {
        this.render();
    }

    render() {
        let base = `
<ul class="navbar" id="navbar">
    <li><a href="/photo">Home</a></li>
    <li class="dropdown">
        <a href="javascript:void(0)" class="dropbtn">Selected Works</a>
        <div class="dropdown-content">`;

        for (let i = 0; i < tree["selectedworks"].length; i++) {
            base += `
            <a href="/photo/selectedworks/${tree["selectedworks"][i]["path"]}">${tree["selectedworks"][i]["name"]}</a>
            `;
        }

        base += `
        </div>
    </li>
    <li class="dropdown">
        <a href="javascript:void(0)" class="dropbtn">On Location</a>
        <div class="dropdown-content">
        `;

        for (let yearIdx = 0; yearIdx < tree.trips.length; yearIdx++) {
            const yearSet = tree.trips[yearIdx];
            for (let tripIdx = 0; tripIdx < yearSet.destinations.length; tripIdx++) {
                base += `
                <a href="/photo/trips/${yearSet.year}/${yearSet.destinations[tripIdx].path}">${yearSet.destinations[tripIdx].name}</a>
                `;
            }
        }

        base += `
        </div>
    </li>
    <li class="dropdown">
        <a href="javascript:void(0)" class="dropbtn">Archive</a>
        <div class="dropdown-content">
        `;

        for (let yearIdx = 0; yearIdx < tree.archive.length; yearIdx++) {
            base += `
            <a href="javascript:void(0)" class="subdropdown">${tree.archive[yearIdx].year}</a>
            <div class="subdropdown-content">
            `;

            for (let monthIdx = 0; monthIdx < tree.archive[yearIdx].months.length; monthIdx++) {
                base += `
                    <a href="/photo/archive/${tree.archive[yearIdx].year}${tree.archive[yearIdx].months[monthIdx]}">${monthName(tree.archive[yearIdx].months[monthIdx])}</a>
                `;
            }

            base += "</div>";
        }

        base += `
        </div>
    </li>
</ul>
`;

        this.innerHTML = base;
        Array.from(document.getElementsByClassName("dropbtn")).forEach(
            (dropbtn) => dropbtn.addEventListener("click", () => this.toggleDropdown(dropbtn))
        );
        Array.from(document.getElementsByClassName("subdropdown")).forEach(
            (dropbtn) => dropbtn.addEventListener("click", () => this.toggleSubdropdown(dropbtn))
        );
    }

    toggleDropdown(t) {
        if (window.matchMedia("(min-width: 600px)").matches) {
            // don't set active on desktop, prefering hover
            return;
        }
        const dropdown = t.parentElement;
        const dropdowns = document.getElementsByClassName("dropdown");
        if (dropdown.className === "dropdown") {
            // ensure only one dropdown is active
            for (let i = 0; i < dropdowns.length; i++) {
                if (dropdowns[i] === dropdown) {
                    continue;
                }
                dropdowns[i].className = "dropdown";
            }
            dropdown.classList.add("active");
        } else {
            dropdown.className = "dropdown";
        }
    }
    toggleSubdropdown(t) {
        if (window.matchMedia("(min-width: 600px)").matches) {
            // don't set active on desktop, prefering hover
            return;
        }
        const dropdown = t;
        const dropdowns = document.getElementsByClassName("subdropdown");
        if (dropdown.className === "subdropdown") {
            // ensure only one dropdown is active
            for (let i = 0; i < dropdowns.length; i++) {
                if (dropdowns[i] === dropdown) {
                    continue;
                }
                dropdowns[i].className = "subdropdown";
            }
            dropdown.classList.add("active");
        } else {
            dropdown.className = "subdropdown";
        }
    }
}

customElements.define("navbar-component", Navbar);
export {Navbar};
