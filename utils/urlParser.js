/**
 * URL parsing and routing utilities for the photo gallery
 */

import { monthName } from '../components/tree.js';

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

        // Path based selection
        const fullPath = this.url.split('/');
        const photoIdx = fullPath.indexOf("photo");
        
        // Get path after "photo"
        this.relevantPath = fullPath.slice(photoIdx + 1)
            .filter(segment => segment !== "")
            .filter(segment => segment[0] !== "?");

        // Handle path-based routing
        if (!this.relevantPath.includes("archive")) {
            this.relevantPath.forEach(tag => this.queryTagList.push(tag));
        } else {
            this.archiveMonth = this.relevantPath[this.relevantPath.indexOf("archive") + 1];
        }

        // Determine display modes
        this.shouldShowPanos = this.queryTagList.includes("panorama");
        this.shouldShowPortfolio = (this.url.indexOf('?') === -1 || this.url.indexOf('?') === this.url.length - 1) 
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
        return (this.prefix == null && this.archiveMonth == null && this.trip == null) &&
            (!this.relevantPath.includes("prefix") && 
             !this.relevantPath.includes("archive") && 
             !this.relevantPath.includes("trips"));
    }
}