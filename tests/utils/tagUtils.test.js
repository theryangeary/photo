/**
 * @jest-environment jsdom
 */

import { hasTag, hasAnyTag, hasAllTags } from '../../utils/tagUtils.js';

describe('Tag Utilities', () => {
  const samplePhoto = {
    name: "20240507_0001.jpg",
    tags: ["america", "archive", "city", "cityscape", "website"],
    heightRatio: 1.33663,
    rating: 3
  };

  describe('hasTag', () => {
    test('should return true when photo has the tag', () => {
      expect(hasTag(samplePhoto, 'city')).toBe(true);
      expect(hasTag(samplePhoto, 'archive')).toBe(true);
    });

    test('should return false when photo does not have the tag', () => {
      expect(hasTag(samplePhoto, 'landscape')).toBe(false);
      expect(hasTag(samplePhoto, 'nonexistent')).toBe(false);
    });
  });

  describe('hasAnyTag', () => {
    test('should return true when photo has at least one tag', () => {
      expect(hasAnyTag(samplePhoto, ['city', 'landscape'])).toBe(true);
      expect(hasAnyTag(samplePhoto, ['landscape', 'archive'])).toBe(true);
    });

    test('should return false when photo has none of the tags', () => {
      expect(hasAnyTag(samplePhoto, ['landscape', 'portrait'])).toBe(false);
    });

    test('should handle empty tag list', () => {
      expect(hasAnyTag(samplePhoto, [])).toBe(false);
    });
  });

  describe('hasAllTags', () => {
    test('should return true when photo has all tags', () => {
      expect(hasAllTags(samplePhoto, ['city', 'archive'])).toBe(true);
      expect(hasAllTags(samplePhoto, ['america'])).toBe(true);
    });

    test('should return false when photo is missing some tags', () => {
      expect(hasAllTags(samplePhoto, ['city', 'landscape'])).toBe(false);
      expect(hasAllTags(samplePhoto, ['nonexistent', 'archive'])).toBe(false);
    });

    test('should handle empty tag list', () => {
      expect(hasAllTags(samplePhoto, [])).toBe(true);
    });
  });
});