// Test setup file for Jest
// This file runs before each test file

// Mock console methods if needed for cleaner test output
global.console = {
  ...console,
  // Uncomment if you want to suppress console.log during tests
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};

// Setup DOM environment
Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost',
    search: '',
    pathname: ''
  },
  writable: true
});

// Mock any global functions that might be used
global.fetch = () => Promise.resolve();

// Clean up after each test  
afterEach(() => {
  document.body.innerHTML = '';
  document.head.innerHTML = '';
});