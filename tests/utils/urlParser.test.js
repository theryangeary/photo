/**
 * @jest-environment jsdom
 */

import { PhotoRouter } from '../../utils/urlParser.js';

describe('PhotoRouter', () => {
  beforeEach(() => {
    // Reset URL and search params for each test
    delete window.location;
    window.location = {
      href: 'http://localhost',
      search: ''
    };
  });

  describe('URL parsing', () => {
    test('should parse basic photo URL', () => {
      window.location.href = 'http://localhost';
      window.location.search = '';

      const router = new PhotoRouter();
      const config = router.getFilterConfig();

      expect(config.queryTagList).toEqual([]);
      expect(config.shouldShowPortfolio).toBe(true);
    });

    test('should parse query parameters', () => {
      window.location.href = 'http://localhost?tag=city&archive=202405';
      window.location.search = '?tag=city&archive=202405';

      const router = new PhotoRouter();
      const config = router.getFilterConfig();

      expect(config.queryTagList).toContain('city');
      expect(config.archiveMonth).toBe('202405');
    });

    test('should parse path-based selection', () => {
      const router = new PhotoRouter('http://localhost/street/cityscape');
      const config = router.getFilterConfig();

      expect(config.queryTagList).toContain('street');
      expect(config.queryTagList).toContain('cityscape');
    });

    test('should detect panorama mode', () => {
      const router = new PhotoRouter('http://localhost/panorama');
      const config = router.getDisplayConfig();

      expect(config.shouldShowPanos).toBe(true);
    });
  });

  describe('Title generation', () => {
    test('should generate archive title', () => {
      const router = new PhotoRouter();
      router.archiveMonth = '202405';
      const titleConfig = router.getTitleConfig();

      expect(titleConfig.archiveMonth).toBe('202405');
      expect(titleConfig.archiveLabel).toBe('May 2024');
    });

    test('should generate selected works title', () => {
      const router = new PhotoRouter();
      router.selectedWorks = 'street';
      const titleConfig = router.getTitleConfig();

      expect(titleConfig.selectedWorks).toBe('street');
      expect(titleConfig.selectedWorksLabel).toBe('Street Photography');
    });
  });

  describe('Archive label formatting', () => {
    test('should format year only for 4 digits', () => {
      const router = new PhotoRouter();
      router.archiveMonth = '2024';
      expect(router.getArchiveLabel()).toBe('2024');
    });

    test('should format year and month for 6 digits', () => {
      const router = new PhotoRouter();
      router.archiveMonth = '202405';
      expect(router.getArchiveLabel()).toBe('May 2024');
    });

    test('should handle invalid archive formats', () => {
      const router = new PhotoRouter();
      router.archiveMonth = 'invalid';
      expect(router.getArchiveLabel()).toBe('');
    });
  });

  describe('Sorting configuration', () => {
    test('should sort by rating for non-chronological collections', () => {
      const router = new PhotoRouter('http://localhost/selectedworks');
      router.prefix = null;
      router.archiveMonth = null;
      router.trip = null;
      router.relevantPath = ['selectedworks'];
      expect(router.shouldSortByRating()).toBe(true);
    });

    test('should not sort by rating for chronological collections', () => {
      const router = new PhotoRouter('http://localhost?archive=202405');
      router.prefix = null;
      router.archiveMonth = '202405';
      router.trip = null;
      router.relevantPath = [];
      expect(router.shouldSortByRating()).toBe(false);
    });
  });
});
