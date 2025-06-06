class Title extends HTMLElement {
    static observedAttributes = ["data-title"];

    constructor() {
        super();
    }

    setTitle(title) {
        this.setAttribute("data-title", title);
    }

    /**
     * Set title based on archive month
     * @param {string} archiveMonth - Archive month string (YYYYMM)
     * @param {string} archiveLabel - Human readable archive label
     */
    setArchiveTitle(archiveMonth, archiveLabel) {
        if (archiveMonth === null) {
            return;
        }

        if (archiveLabel === "") {
            this.setTitle("Archives");
        } else {
            this.setTitle(`Archives | ${archiveLabel}`);
        }
    }

    /**
     * Set title based on selected works
     * @param {string} selectedWorks - Selected works parameter
     * @param {string} selectedWorksLabel - Human readable selected works label
     */
    setSelectedWorksTitle(selectedWorks, selectedWorksLabel) {
        if (selectedWorks === null) {
            return;
        }

        if (selectedWorksLabel === "") {
            this.setTitle("Selected Works");
        } else {
            this.setTitle(selectedWorksLabel);
        }
    }

    /**
     * Set title based on trip
     * @param {string} trip - Trip parameter
     * @param {string} tripLabel - Human readable trip label
     */
    setTripTitle(trip, tripLabel) {
        if (trip === null) {
            return;
        }

        if (tripLabel === "") {
            this.setTitle("On Location");
        } else {
            this.setTitle(`On Location | ${tripLabel}`);
        }
    }

    /**
     * Set title based on router configuration
     * @param {Object} titleConfig - Title configuration from router
     */
    setTitleFromConfig(titleConfig) {
        this.setArchiveTitle(titleConfig.archiveMonth, titleConfig.archiveLabel);
        this.setSelectedWorksTitle(titleConfig.selectedWorks, titleConfig.selectedWorksLabel);
        this.setTripTitle(titleConfig.trip, titleConfig.tripLabel);
    }

    connectedCallback() {
        this.render();
    }
    attributeChangedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = `
<h1>${this.getAttribute("data-title")}
    <a id="navbar-icon" class="navbar-icon" href="javascript:void(0);" >
        <i class="fa fa-bars"></i>
    </a>
</h1>

`;
        document.getElementById("navbar-icon").addEventListener("click", this.toggleNavbarResponsive);
    }

    /* Toggle between adding and removing the "responsive" class to navbar when the user clicks on the icon */
    toggleNavbarResponsive() {
        const x = document.getElementById("navbar");
        if (x.className === "navbar") {
            x.className += " responsive";
        } else {
            x.className = "navbar";
        }
    }
}

customElements.define("title-component", Title);
export {Title};
