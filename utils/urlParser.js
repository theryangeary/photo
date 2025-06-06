/**
 * URL parsing and routing utilities for the photo gallery
 */

import { monthName } from "../components/tree.js";
import { findImageByHash } from "./imageHash.js";

/**
 * Photo gallery router class
 */
export class PhotoRouter {
    constructor(url = window.location.href) {
        this.url = url;
        this.params = new URLSearchParams(window.location.search);
        this.parseUrl();
    }

    /**
     * Parse the URL and extract routing information
     */
    parseUrl() {
        // Query parameter based selection
        this.queryTagList = this.params.getAll("tag");
        this.archiveMonth = this.params.get("archive");
        this.selectedWorks = this.params.get("selectedworks");
        this.trip = this.params.get("trip");
        this.prefix = this.params.get("prefix");

        // Path based selection - remove hash first
        const urlWithoutHash = this.url.split("#")[0];
        const fullPath = urlWithoutHash.split("/");
        const photoIdx = fullPath.indexOf("photo");

        // Get path after "photo"
        this.relevantPath = fullPath.slice(photoIdx + 1)
            .filter(segment => segment !== "")
            .filter(segment => segment[0] !== "?");

        // Check for image hash in URL
        this.imageHash = null;
        this.imageFilename = null;
        const hash = window.location.hash;
        if (hash.startsWith("#") && hash.length > 1) {
            // Assume any non-empty hash is an image hash
            this.imageHash = hash.substring(1); // Remove "#"
        }

        // Handle path-based routing
        if (this.relevantPath.includes("archive")) {
            this.archiveMonth = this.relevantPath[this.relevantPath.indexOf("archive") + 1];
        } else if (this.relevantPath.includes("selectedworks")) {
            const selectedWorksIndex = this.relevantPath.indexOf("selectedworks");
            if (selectedWorksIndex + 1 < this.relevantPath.length) {
                this.selectedWorks = this.relevantPath[selectedWorksIndex + 1];
            }
        } else if (this.relevantPath.includes("trips")) {
            const tripsIndex = this.relevantPath.indexOf("trips");
            if (tripsIndex + 2 < this.relevantPath.length) {
                this.trip = this.relevantPath[tripsIndex + 2]; // trips/year/destination
            }
        } else {
            // For other paths, treat as tags
            this.relevantPath.forEach(tag => this.queryTagList.push(tag));
        }

        // Determine display modes
        this.shouldShowPanos = this.queryTagList.includes("panorama") || this.selectedWorks === "panorama";
        this.shouldShowPortfolio = (this.url.indexOf("?") === -1 || this.url.indexOf("?") === this.url.length - 1)
            && this.relevantPath.length === 0;
    }

    /**
     * Get filter configuration object
     * @returns {Object} Filter configuration
     */
    getFilterConfig() {
        return {
            queryTagList: this.queryTagList,
            archiveMonth: this.archiveMonth,
            selectedWorks: this.selectedWorks,
            trip: this.trip,
            prefix: this.prefix,
            shouldShowPanos: this.shouldShowPanos,
            shouldShowPortfolio: this.shouldShowPortfolio
        };
    }

    /**
     * Get display configuration
     * @returns {Object} Display configuration
     */
    getDisplayConfig() {
        return {
            shouldShowPanos: this.shouldShowPanos,
            shouldShowPortfolio: this.shouldShowPortfolio,
            relevantPath: this.relevantPath
        };
    }

    /**
     * Get title information
     * @returns {Object} Title configuration
     */
    getTitleConfig() {
        return {
            archiveMonth: this.archiveMonth,
            selectedWorks: this.selectedWorks,
            archiveLabel: this.getArchiveLabel(),
            selectedWorksLabel: this.getSelectedWorksLabel()
        };
    }

    /**
     * Convert archive month to human readable string
     * @returns {string} Formatted archive label
     */
    getArchiveLabel() {
        if (!this.archiveMonth) {
            return "";
        }

        if (!/^(\d){4,}$/.test(this.archiveMonth)) {
            return "";
        }

        if (/^(\d){4,5}$/.test(this.archiveMonth)) {
            return this.archiveMonth.substr(0, 4);
        }

        if (/^(\d){6,}$/.test(this.archiveMonth)) {
            const year = this.archiveMonth.substr(0, 4);
            const month = this.archiveMonth.substr(4, 2);
            const monthLabel = monthName(month);

            if (monthLabel === "") {
                return year;
            }

            return `${monthLabel} ${year}`;
        }

        return "";
    }

    /**
     * Convert selected works parameter to human readable title
     * @returns {string} Formatted selected works label
     */
    getSelectedWorksLabel() {
        if (!this.selectedWorks) {
            return "";
        }

        const titleMap = {
            "street": "Street Photography",
            "cityscape": "Cityscapes"
        };

        return titleMap[this.selectedWorks] || "";
    }

    /**
     * Determine if collection should be sorted by rating/recency
     * @returns {boolean} True if should sort by rating
     */
    shouldSortByRating() {
        return (this.prefix === null && this.archiveMonth === null && this.trip === null) &&
            (!this.relevantPath.includes("prefix") &&
             !this.relevantPath.includes("archive") &&
             !this.relevantPath.includes("trips"));
    }

    /**
     * Get the current collection URL (without image filename)
     * @returns {string} Collection URL
     */
    getCollectionUrl() {
        const pathSegments = window.location.pathname.split("/");
        const photoIndex = pathSegments.indexOf("photo");

        if (photoIndex === -1) {
            return window.location.pathname;
        }

        // Get path up to /photo and add collection path
        const basePath = pathSegments.slice(0, photoIndex + 1);
        const collectionPath = this.relevantPath.length > 0 ? this.relevantPath : [];

        return [...basePath, ...collectionPath].join("/");
    }

    /**
     * Generate URL for specific image within current collection using hash
     * @param {string} imageHash - The image hash
     * @returns {string} Image URL
     */
    getImageUrl(imageHash) {
        const collectionUrl = this.getCollectionUrl();
        return `${collectionUrl}#${imageHash}`;
    }

    /**
     * Get the current image hash from URL
     * @returns {string|null} Image hash or null if not in image view
     */
    getImageHash() {
        return this.imageHash;
    }

    /**
     * Get the current image filename from URL hash by looking up in collection
     * @param {Array} collection - Image collection to search
     * @returns {string|null} Image filename or null if not found
     */
    getImageFilename(collection) {
        if (!this.imageHash || !collection) {
            return null;
        }

        const image = findImageByHash(this.imageHash, collection);
        return image ? image.name : null;
    }
}