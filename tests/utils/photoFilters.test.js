/**
 * @jest-environment jsdom
 */

import { PhotoFilterManager, sortByRating } from '../../utils/photoFilters.js';

describe('PhotoFilterManager', () => {
  const samplePhotos = [
    {
      name: "20240507_0001.jpg",
      tags: ["america", "archive", "city", "cityscape", "website"],
      heightRatio: 1.33663,
      rating: 3
    },
    {
      name: "20240508_0069.jpg", 
      tags: ["america", "archive", "selectedworks", "street", "website"],
      heightRatio: 1.2,
      rating: 4
    },
    {
      name: "20240601_0011.jpg",
      tags: ["america", "archive", "panorama", "landscape", "website"],
      heightRatio: 0.5,
      rating: 5
    },
    {
      name: "verrazzano.jpg",
      tags: ["portfolio", "bridge", "website"],
      heightRatio: 1.5,
      rating: 5
    }
  ];

  describe('Archive month filtering', () => {
    test('should only keep photos with matching archive month and archive tag', () => {
      const filterManager = new PhotoFilterManager({ archiveMonth: '202405' });
      const filtered = filterManager.applyFilters(samplePhotos);
      
      // Should only include photos starting with 202405 AND having archive tag
      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach(photo => {
        expect(photo.name.startsWith('202405')).toBe(true);
        expect(photo.tags.includes('archive')).toBe(true);
      });
    });

    test('should not filter when no archive month specified', () => {
      const filterManager = new PhotoFilterManager({});
      const filtered = filterManager.applyFilters(samplePhotos);
      
      expect(filtered).toEqual(samplePhotos);
    });
  });

  describe('Selected works filtering', () => {
    test('should filter by selected works', () => {
      const filterManager = new PhotoFilterManager({ selectedWorks: 'street' });
      const filtered = filterManager.applyFilters(samplePhotos);
      
      // Should only include photos with both 'selectedworks' and 'street' tags
      filtered.forEach(photo => {
        expect(photo.tags).toContain('selectedworks');
        expect(photo.tags).toContain('street');
      });
    });
  });

  describe('Panorama filtering', () => {
    test('should show only panoramas when shouldShowPanos is true', () => {
      const filterManager = new PhotoFilterManager({ shouldShowPanos: true });
      const filtered = filterManager.applyFilters(samplePhotos);
      
      filtered.forEach(photo => {
        expect(photo.tags).toContain('panorama');
      });
    });

    test('should exclude panoramas when shouldShowPanos is false', () => {
      const filterManager = new PhotoFilterManager({ shouldShowPanos: false });
      const filtered = filterManager.applyFilters(samplePhotos);
      
      filtered.forEach(photo => {
        expect(photo.tags).not.toContain('panorama');
      });
    });
  });

  describe('Portfolio filtering', () => {
    test('should show only portfolio photos when shouldShowPortfolio is true', () => {
      const filterManager = new PhotoFilterManager({ shouldShowPortfolio: true });
      const filtered = filterManager.applyFilters(samplePhotos);
      
      filtered.forEach(photo => {
        expect(photo.tags).toContain('portfolio');
      });
    });

    test('should not filter when shouldShowPortfolio is false', () => {
      const filterManager = new PhotoFilterManager({ shouldShowPortfolio: false });
      const filtered = filterManager.applyFilters(samplePhotos);
      
      expect(filtered).toEqual(samplePhotos);
    });
  });

  describe('Tag filtering', () => {
    test('should filter by single tag', () => {
      const filterManager = new PhotoFilterManager({ queryTagList: ['street'] });
      const filtered = filterManager.applyFilters(samplePhotos);
      
      filtered.forEach(photo => {
        expect(photo.tags).toContain('street');
      });
    });

    test('should filter by multiple tags (all required)', () => {
      const filterManager = new PhotoFilterManager({ queryTagList: ['america', 'city'] });
      const filtered = filterManager.applyFilters(samplePhotos);
      
      filtered.forEach(photo => {
        expect(photo.tags).toContain('america');
        expect(photo.tags).toContain('city');
      });
    });
  });

  describe('Prefix filtering', () => {
    test('should filter by filename prefix', () => {
      const filterManager = new PhotoFilterManager({ prefix: '202405' });
      const filtered = filterManager.applyFilters(samplePhotos);
      
      filtered.forEach(photo => {
        expect(photo.name.startsWith('202405')).toBe(true);
      });
    });
  });
});

describe('sortByRating', () => {
  test('should sort photos by rating in descending order', () => {
    const photos = [
      { rating: 3 },
      { rating: 5 },
      { rating: 1 },
      { rating: 4 }
    ];
    
    photos.sort(sortByRating);
    
    expect(photos.map(p => p.rating)).toEqual([5, 4, 3, 1]);
  });
});