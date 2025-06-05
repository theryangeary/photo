
/**
 * Main script for the photo gallery application
 * Now refactored to use modular components and utilities
 */

// Import components to register them
import "./components/body.js";
import "./components/columns.js";
import "./components/fullover.js";
import "./components/navbar.js";
import "./components/photo.js";
import "./components/title.js";

// Import the main gallery orchestrator
import { PhotoGallery } from "./components/photoGallery.js";

/**
 * Initialize the photo gallery when DOM is ready
 */
function init() {
    // Wait for custom elements to be defined
    Promise.all([
        customElements.whenDefined("columns-component"),
        customElements.whenDefined("title-component"),
        customElements.whenDefined("fullover-component")
    ]).then(() => {
        // Initialize the gallery
        new PhotoGallery();
    });
}

// Start the application
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
