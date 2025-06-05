/**
 * @jest-environment jsdom
 */

import { collection } from '../../collection.js';

describe('Collection Data', () => {
  test('should be an array', () => {
    expect(Array.isArray(collection)).toBe(true);
  });

  test('should contain photo objects with required properties', () => {
    expect(collection.length).toBeGreaterThan(0);
    
    const firstPhoto = collection[0];
    expect(firstPhoto).toHaveProperty('name');
    expect(firstPhoto).toHaveProperty('tags');
    expect(firstPhoto).toHaveProperty('heightRatio');
    expect(firstPhoto).toHaveProperty('rating');
    
    expect(typeof firstPhoto.name).toBe('string');
    expect(Array.isArray(firstPhoto.tags)).toBe(true);
    expect(typeof firstPhoto.heightRatio).toBe('number');
    expect(typeof firstPhoto.rating).toBe('number');
  });

  test('should have valid filename format', () => {
    collection.forEach(photo => {
      expect(photo.name).toMatch(/\.(jpg|jpeg|png|gif)$/i);
    });
  });

  test('should have valid heightRatio values', () => {
    collection.forEach(photo => {
      expect(photo.heightRatio).toBeGreaterThan(0);
      expect(photo.heightRatio).toBeLessThan(10); // Reasonable bounds
    });
  });

  test('should have valid rating values', () => {
    collection.forEach(photo => {
      expect(photo.rating).toBeGreaterThanOrEqual(0);
      expect(photo.rating).toBeLessThanOrEqual(5);
    });
  });

  test('should contain website tag for all photos', () => {
    collection.forEach(photo => {
      expect(photo.tags).toContain('website');
    });
  });

  test('should have valid filename format for most photos', () => {
    const dateFormatPhotos = collection.filter(photo => 
      photo.name.match(/^\d{8}_\d+.*\.jpg$/)
    );
    // Most photos should follow the date format
    expect(dateFormatPhotos.length).toBeGreaterThan(collection.length * 0.8);
  });
});

describe('Collection Filtering Utilities', () => {
  // Helper functions that would be useful for the main script
  const filterByTag = (photos, tag) => {
    return photos.filter(photo => photo.tags.includes(tag));
  };

  const filterByArchiveMonth = (photos, archiveMonth) => {
    return photos.filter(photo => {
      const filename = photo.name;
      const yearMonth = filename.substring(0, 6); // YYYYMM
      return yearMonth === archiveMonth;
    });
  };

  const filterByRating = (photos, minRating) => {
    return photos.filter(photo => photo.rating >= minRating);
  };

  test('should filter photos by tag correctly', () => {
    const cityPhotos = filterByTag(collection, 'city');
    cityPhotos.forEach(photo => {
      expect(photo.tags).toContain('city');
    });
  });

  test('should filter photos by archive month correctly', () => {
    // Test with 202405 (May 2024)
    const mayPhotos = filterByArchiveMonth(collection, '202405');
    mayPhotos.forEach(photo => {
      expect(photo.name.substring(0, 6)).toBe('202405');
    });
  });

  test('should filter photos by rating correctly', () => {
    const highRatedPhotos = filterByRating(collection, 4);
    highRatedPhotos.forEach(photo => {
      expect(photo.rating).toBeGreaterThanOrEqual(4);
    });
  });

  test('should handle non-existent tags gracefully', () => {
    const nonExistentPhotos = filterByTag(collection, 'nonexistenttag');
    expect(Array.isArray(nonExistentPhotos)).toBe(true);
    expect(nonExistentPhotos.length).toBe(0);
  });

  test('should handle future archive months gracefully', () => {
    const futurePhotos = filterByArchiveMonth(collection, '999999');
    expect(Array.isArray(futurePhotos)).toBe(true);
    expect(futurePhotos.length).toBe(0);
  });
});