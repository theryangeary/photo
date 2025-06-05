/**
 * Photo filtering system for the gallery
 */

import { hasTag, hasAllTags } from './tagUtils.js';

/**
 * Class to manage photo filtering
 */
export class PhotoFilterManager {
    constructor(filterConfig = {}) {
        this.config = filterConfig;
        this.filters = this.createFilters();
    }

    /**
     * Create filter functions based on configuration
     * @returns {Function[]} Array of filter functions
     */
    createFilters() {
        return [
            this.createArchiveMonthFilter(),
            this.createSelectedWorksFilter(),
            this.createTripFilter(),
            this.createTagFilter(),
            this.createPanoFilter(),
            this.createPortfolioFilter(),
            this.createPrefixFilter()
        ];
    }

    /**
     * Apply all filters to a collection
     * @param {Object[]} collection - Array of photo objects
     * @returns {Object[]} Filtered collection
     */
    applyFilters(collection) {
        return collection.filter(img => {
            // Return false if any filter wants to exclude this image
            // Note: filter functions return true to EXCLUDE the image (legacy behavior)
            return !this.filters.some(filter => filter(img));
        });
    }

    /**
     * Create archive month filter
     * @returns {Function} Filter function
     */
    createArchiveMonthFilter() {
        return (img) => {
            if (this.config.archiveMonth == null) {
                return false;
            }
            return (!img.name.startsWith(this.config.archiveMonth) || !hasTag(img, "archive"));
        };
    }

    /**
     * Create selected works filter
     * @returns {Function} Filter function
     */
    createSelectedWorksFilter() {
        return (img) => {
            if (this.config.selectedWorks == null) {
                return false;
            }
            return (!hasTag(img, "selectedworks") || !hasTag(img, this.config.selectedWorks));
        };
    }

    /**
     * Create trip filter
     * @returns {Function} Filter function
     */
    createTripFilter() {
        return (img) => {
            if (this.config.trip == null) {
                return false;
            }
            return (!hasTag(img, "trips") || !hasTag(img, this.config.trip));
        };
    }

    /**
     * Create tag filter
     * @returns {Function} Filter function
     */
    createTagFilter() {
        return (img) => {
            if (!this.config.queryTagList || this.config.queryTagList.length === 0) {
                return false;
            }
            if (this.config.queryTagList.length === 1) {
                return !hasTag(img, this.config.queryTagList[0]);
            }
            return !hasAllTags(img, this.config.queryTagList);
        };
    }

    /**
     * Create panorama filter
     * @returns {Function} Filter function
     */
    createPanoFilter() {
        return (img) => {
            const isPano = hasTag(img, "panorama");
            return this.config.shouldShowPanos !== isPano;
        };
    }

    /**
     * Create portfolio filter
     * @returns {Function} Filter function
     */
    createPortfolioFilter() {
        return (img) => {
            if (!this.config.shouldShowPortfolio) {
                return false;
            }
            return !hasTag(img, "portfolio");
        };
    }

    /**
     * Create prefix filter
     * @returns {Function} Filter function
     */
    createPrefixFilter() {
        return (img) => {
            if (this.config.prefix == null) {
                return false;
            }
            return !img.name.startsWith(this.config.prefix);
        };
    }
}

/**
 * Sorting function for photos by rating (highest first)
 * @param {Object} a - First photo object
 * @param {Object} b - Second photo object
 * @returns {number} Sort comparison result
 */
export function sortByRating(a, b) {
    return b.rating - a.rating;
}