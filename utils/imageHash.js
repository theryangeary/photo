/**
 * Image hash utilities for generating unique IDs for images
 */

/**
 * Simple hash function to generate consistent short hashes from strings
 * @param {string} str - Input string to hash
 * @returns {string} 8-character hash
 */
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    // Convert to positive hex string and pad to 8 characters
    return Math.abs(hash).toString(36).padStart(8, "0").substring(0, 8);
}

/**
 * Generate a hash for an image filename
 * @param {string} filename - Image filename (e.g., "20240507_0001.jpg")
 * @returns {string} 8-character hash
 */
export function generateImageHash(filename) {
    return simpleHash(filename);
}

/**
 * Create a mapping between image hashes and filenames for quick lookup
 * @param {Array} collection - Collection of image objects with 'name' property
 * @returns {Object} Hash-to-filename mapping object
 */
export function createHashMapping(collection) {
    const hashToFilename = {};
    const filenameToHash = {};

    collection.forEach(image => {
        const hash = generateImageHash(image.name);
        hashToFilename[hash] = image.name;
        filenameToHash[image.name] = hash;
    });

    return {
        hashToFilename,
        filenameToHash
    };
}

/**
 * Find image by hash in collection
 * @param {string} hash - Image hash
 * @param {Array} collection - Collection of image objects
 * @returns {Object|null} Image object or null if not found
 */
export function findImageByHash(hash, collection) {
    const mapping = createHashMapping(collection);
    const filename = mapping.hashToFilename[hash];

    if (!filename) {
        return null;
    }

    return collection.find(img => img.name === filename);
}

/**
 * Get hash for image filename from collection
 * @param {string} filename - Image filename
 * @param {Array} collection - Collection of image objects
 * @returns {string|null} Hash or null if not found
 */
export function getHashForFilename(filename, collection) {
    const mapping = createHashMapping(collection);
    return mapping.filenameToHash[filename] || null;
}