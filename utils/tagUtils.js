/**
 * Tag utility functions for photo collection filtering
 */

/**
 * Check if an image has a specific tag
 * @param {Object} img - Image object with tags array
 * @param {string} tag - Tag to search for
 * @returns {boolean} True if image has the tag
 */
export function hasTag(img, tag) {
    return img.tags.includes(tag);
}

/**
 * Check if an image has any of the provided tags
 * @param {Object} img - Image object with tags array
 * @param {string[]} tagList - Array of tags to search for
 * @returns {boolean} True if image has at least one of the tags
 */
export function hasAnyTag(img, tagList) {
    return tagList.some(queryTag => img.tags.includes(queryTag));
}

/**
 * Check if an image has all of the provided tags
 * @param {Object} img - Image object with tags array
 * @param {string[]} tagList - Array of tags to search for
 * @returns {boolean} True if image has all the tags
 */
export function hasAllTags(img, tagList) {
    return tagList.every(queryTag => img.tags.includes(queryTag));
}