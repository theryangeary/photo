/**
 * Main PhotoGallery component that orchestrates the entire gallery functionality
 */

import { collection } from "/collection.js";
import { PhotoRouter } from "/utils/urlParser.js";
import { PhotoFilterManager, sortByRating } from "/utils/photoFilters.js";
import { findImageByHash } from "/utils/imageHash.js";

export class PhotoGallery {
    constructor() {
        this.router = new PhotoRouter();
        this.filterManager = new PhotoFilterManager(this.router.getFilterConfig());
        this.displayConfig = this.router.getDisplayConfig();

        this.displayCollection = [];
        this.displayIndex = 0;
        this.lastScrollPosition = 0;

        // Get DOM elements
        this.columnsComponent = document.querySelector("columns-component");
        this.titleComponent = document.querySelector("title-component");
        this.fulloverComponent = document.querySelector("fullover-component");

        // Set collection reference for fullover component
        this.fulloverComponent.setCollection(collection);

        this.init();
    }

    /**
     * Initialize the gallery
     */
    init() {
        this.setupTitle();
        this.setupLayout();
        this.processCollection();
        this.setupEventListeners();
        this.initialLoad();
        this.handleDirectImageAccess();
    }

    /**
     * Set up the page title
     */
    setupTitle() {
        const titleConfig = this.router.getTitleConfig();
        this.titleComponent.setTitleFromConfig(titleConfig);
    }

    /**
     * Set up the column layout
     */
    setupLayout() {
        if (this.displayConfig.shouldShowPanos) {
            // Make col1 full width always for panoramas
            this.columnsComponent.hideSecondColumn();
        } else {
            // Make number of columns based on screen size
            const smallScreen = window.matchMedia("(max-width: 720px)");

            // Set initial layout without scroll adjustment
            if (smallScreen.matches) {
                this.columnsComponent.hideSecondColumn();
            } else {
                this.columnsComponent.showSecondColumn();
            }

            // Attach listener for responsive changes only when crossing threshold
            smallScreen.addEventListener("change", () => {
                this.columnsComponent.handleResize(smallScreen, () => this.redisplayPhotos(), this.lastScrollPosition);
            });
        }
    }

    /**
     * Process the collection through filters and sorting
     */
    processCollection() {
        // Apply filters
        this.displayCollection = this.filterManager.applyFilters(collection);


        if (this.displayCollection.length === 0) {
            return;
        }

        // Sort collection if appropriate
        if (this.router.shouldSortByRating()) {
            // Display newest first for non-chronological collections
            this.displayCollection.reverse();
            // Display highest rated first for non-chronological collections
            this.displayCollection.sort(sortByRating);
        }
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Scroll-based lazy loading + scroll position tracking
        window.onscroll = () => {
            // Track scroll position for responsive layout changes
            this.lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

            if (window.scrollY + window.innerHeight < this.getPageHeight() - (2 * window.innerHeight)) {
                // Don't load yet, plenty of other images are already loaded
                return;
            }
            this.advanceDisplayCollection();
        };

        // Photo navigation events
        document.addEventListener("photoNext", (e) => {
            this.handlePhotoNavigation(e, 1);
        });

        document.addEventListener("photoPrev", (e) => {
            this.handlePhotoNavigation(e, -1);
        });

        // Hash change events for browser navigation
        window.addEventListener("hashchange", () => {
            this.handleHashChange();
        });
    }

    /**
     * Handle photo navigation in fullscreen mode
     * @param {Event} e - Navigation event
     * @param {number} direction - 1 for next, -1 for previous
     */
    handlePhotoNavigation(e, direction) {
        for (let i = 0; i < this.displayCollection.length; i++) {
            if ("/img/" + this.displayCollection[i].name === e.detail.current) {
                const newIndex = i + direction;
                if (newIndex >= 0 && newIndex < this.displayCollection.length) {
                    this.fulloverComponent.setPhoto2(this.displayCollection[newIndex]);
                }
                break;
            }
        }
    }

    /**
     * Load initial set of photos
     */
    initialLoad() {
        let imgCount = 0;
        while (imgCount < 10 && this.displayIndex < this.displayCollection.length) {
            this.advanceDisplayCollection();
            imgCount++;
        }
    }

    /**
     * Add the next photo from the display collection
     */
    advanceDisplayCollection() {
        if (this.displayIndex === this.displayCollection.length) {
            return;
        }

        const newImg = this.displayCollection[this.displayIndex];
        this.displayIndex++;
        this.displayImage(newImg);
    }

    /**
     * Display a single image in the gallery
     * @param {Object} img - Image object from collection
     */
    displayImage(img) {
        const photo = document.createElement("photo-component");
        photo.setAttribute("src", "/img/" + img.name);

        if (img.title !== undefined) {
            photo.setAttribute("title", img.title);
        }

        this.columnsComponent.addPhoto(photo, img.heightRatio);
    }

    /**
     * Redisplay all currently loaded photos (used for responsive layout changes)
     */
    redisplayPhotos() {
        this.columnsComponent.empty();

        const currentDisplayIndex = this.displayIndex;
        this.displayIndex = 0;

        for (let i = 0; i < currentDisplayIndex; i++) {
            this.advanceDisplayCollection();
        }
    }

    /**
     * Calculate total page height
     * @returns {number} Total page height
     */
    getPageHeight() {
        const body = document.body;
        const html = document.documentElement;
        return Math.max(
            body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight
        );
    }

    /**
     * Get the current display collection
     * @returns {Object[]} Current filtered and sorted collection
     */
    getDisplayCollection() {
        return this.displayCollection;
    }

    /**
     * Get the current display index
     * @returns {number} Current display index
     */
    getDisplayIndex() {
        return this.displayIndex;
    }

    /**
     * Handle direct access to image URLs using hash
     */
    handleDirectImageAccess() {
        const imageHash = this.router.getImageHash();
        if (!imageHash) {
            return;
        }

        // Find the image in the full collection using hash
        const imageEntry = findImageByHash(imageHash, collection);
        if (imageEntry) {
            // Check if image is in current display collection
            const isInDisplayCollection = this.displayCollection.find(img => img.name === imageEntry.name);
            if (isInDisplayCollection) {
                this.fulloverComponent.setPhoto2(imageEntry);
            }
        }
    }

    /**
     * Handle hash changes for browser navigation
     */
    handleHashChange() {
        const hash = window.location.hash;

        if (hash.startsWith("#") && hash.length > 1) {
            // Show image if hash contains image hash
            const imageHash = hash.substring(1);
            const imageEntry = findImageByHash(imageHash, collection);
            if (imageEntry) {
                // Check if image is in current display collection
                const isInDisplayCollection = this.displayCollection.find(img => img.name === imageEntry.name);
                if (isInDisplayCollection) {
                    this.fulloverComponent.setPhoto2(imageEntry);
                }
            }
        } else {
            // Hide fullover if no image hash
            this.fulloverComponent.hide();
        }
    }
}
