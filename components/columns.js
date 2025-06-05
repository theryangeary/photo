class Columns extends HTMLElement {
    constructor() {
        super();
        this.colHeights = [0, 0];
        this.nextCol = 0;
        this.col1 = null;
        this.col2 = null;
        this.cols = [];
    }

    id() {
        return "columns-component"
    }

    connectedCallback() {
        this.innerHTML = `
<div class="row" id="photos">
    <div class="column" id="col1"> </div>
    <div class="column" id="col2"> </div>
</div>
`;
        
        // Cache column references
        this.col1 = this.querySelector("#col1");
        this.col2 = this.querySelector("#col2");
        this.cols = [this.col1, this.col2];
    }

    /**
     * Empty all columns
     */
    empty() {
        while (this.col1.firstChild) {
            this.col1.removeChild(this.col1.lastChild);
        }
        while (this.col2.firstChild) {
            this.col2.removeChild(this.col2.lastChild);
        }
        this.colHeights = [0, 0];
        this.nextCol = 0;
    }

    /**
     * Hide the second column and make first column full width
     */
    hideSecondColumn() {
        this.col1.classList.add("full-width");
        this.col2.style.display = "none";
    }

    /**
     * Show the second column and restore normal layout
     */
    showSecondColumn() {
        this.col1.classList.remove("full-width");
        this.col2.style.display = "initial";
    }

    /**
     * Add a photo to the appropriate column
     * @param {HTMLElement} photoElement - The photo element to add
     * @param {number} heightRatio - The height ratio of the photo
     */
    addPhoto(photoElement, heightRatio) {
        this.cols[this.nextCol].appendChild(photoElement);
        this.colHeights[this.nextCol] += heightRatio;
        
        // Switch to the shorter column if two columns are visible
        if (this.col2.style.display !== "none" && 
            this.cols.length === 2 && 
            this.colHeights[this.nextCol] > this.colHeights[(this.nextCol + 1) % 2]) {
            this.nextCol = (this.nextCol + 1) % 2;
        }
    }

    /**
     * Handle responsive layout changes
     * @param {MediaQueryList} smallScreen - Media query for small screens
     * @param {Function} redisplayCallback - Callback to redisplay photos
     */
    handleResize(smallScreen, redisplayCallback) {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const scrollInversionConstant = 4.0;
        
        if (smallScreen.matches) {
            // Small screen: single column
            this.hideSecondColumn();
            this.empty();
            redisplayCallback();
            window.scroll(0, currentScroll * scrollInversionConstant);
        } else {
            // Large screen: two columns
            this.showSecondColumn();
            this.empty();
            redisplayCallback();
            window.scroll(0, currentScroll / scrollInversionConstant);
        }
    }

    /**
     * Get the current column heights
     * @returns {number[]} Array of column heights
     */
    getColumnHeights() {
        return [...this.colHeights];
    }
}

customElements.define('columns-component', Columns);
export {Columns}
