/**
 * @jest-environment jsdom
 */

import { tree, monthName, allPaths } from '../../components/tree.js';

describe('Tree Module', () => {
  describe('monthName function', () => {
    test('should return correct month names for valid inputs', () => {
      expect(monthName("01")).toBe("January");
      expect(monthName("02")).toBe("February");
      expect(monthName("03")).toBe("March");
      expect(monthName("04")).toBe("April");
      expect(monthName("05")).toBe("May");
      expect(monthName("06")).toBe("June");
      expect(monthName("07")).toBe("July");
      expect(monthName("08")).toBe("August");
      expect(monthName("09")).toBe("September");
      expect(monthName("10")).toBe("October");
      expect(monthName("11")).toBe("November");
      expect(monthName("12")).toBe("December");
    });

    test('should return empty string for invalid month', () => {
      expect(monthName("00")).toBe("");
      expect(monthName("13")).toBe("");
      expect(monthName("invalid")).toBe("");
      expect(monthName("")).toBe("");
    });
  });

  describe('tree structure', () => {
    test('should have archive section with proper structure', () => {
      expect(tree.archive).toBeDefined();
      expect(Array.isArray(tree.archive)).toBe(true);
      
      const firstYear = tree.archive[0];
      expect(firstYear.year).toBeDefined();
      expect(Array.isArray(firstYear.months)).toBe(true);
    });

    test('should have trips section with proper structure', () => {
      expect(tree.trips).toBeDefined();
      expect(Array.isArray(tree.trips)).toBe(true);
      
      const firstYear = tree.trips[0];
      expect(firstYear.year).toBeDefined();
      expect(Array.isArray(firstYear.destinations)).toBe(true);
      
      if (firstYear.destinations.length > 0) {
        expect(firstYear.destinations[0].path).toBeDefined();
        expect(firstYear.destinations[0].name).toBeDefined();
      }
    });

    test('should have selectedworks section', () => {
      expect(tree.selectedworks).toBeDefined();
      expect(Array.isArray(tree.selectedworks)).toBe(true);
      
      if (tree.selectedworks.length > 0) {
        expect(tree.selectedworks[0].path).toBeDefined();
        expect(tree.selectedworks[0].name).toBeDefined();
      }
    });
  });

  describe('allPaths function', () => {
    test('should return an array of paths', () => {
      const paths = allPaths();
      expect(Array.isArray(paths)).toBe(true);
      expect(paths.length).toBeGreaterThan(0);
    });

    test('should include archive paths', () => {
      const paths = allPaths();
      const archivePaths = paths.filter(path => path.includes('archive'));
      expect(archivePaths.length).toBeGreaterThan(0);
    });

    test('should include trips paths', () => {
      const paths = allPaths();
      const tripPaths = paths.filter(path => path.includes('trips'));
      expect(tripPaths.length).toBeGreaterThan(0);
    });

    test('should include selectedworks paths', () => {
      const paths = allPaths();
      const selectedworksPaths = paths.filter(path => path.includes('selectedworks'));
      expect(selectedworksPaths.length).toBeGreaterThan(0);
    });
  });
});