/**
 * @jest-environment jsdom
 */

// Import the module to register the Photo component
import '../../components/photo.js';

describe('Photo Component', () => {
  let photoElement;

  beforeEach(() => {
    document.body.innerHTML = '';
    // Use the element name that's already registered
    photoElement = document.createElement('photo-component');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should create photo element with src attribute', () => {
    photoElement.setAttribute('src', 'test-image.jpg');
    document.body.appendChild(photoElement);
    
    const img = photoElement.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('test-image.jpg');
    expect(img.getAttribute('loading')).toBe('lazy');
  });

  test('should generate correct ID from src attribute', () => {
    photoElement.setAttribute('src', 'test-image.jpg');
    expect(photoElement.id()).toBe('zoomCheck-test-image.jpg');
  });

  test('should handle title attribute correctly', () => {
    photoElement.setAttribute('src', 'test-image.jpg');
    photoElement.setAttribute('title', 'Test Photo');
    document.body.appendChild(photoElement);
    
    const img = photoElement.querySelector('img');
    expect(img.getAttribute('title')).toBe('Test Photo');
  });

  test('should return empty string when no title is set', () => {
    expect(photoElement.getTitle()).toBe('');
  });

  test('should dispatch photoclick event when clicked', () => {
    photoElement.setAttribute('src', 'test-image.jpg');
    photoElement.setAttribute('title', 'Test Photo');
    document.body.appendChild(photoElement);

    let eventFired = false;
    let eventDetail = null;

    document.addEventListener('photoclick', (event) => {
      eventFired = true;
      eventDetail = event.detail;
    });

    const img = photoElement.querySelector('img');
    img.click();

    expect(eventFired).toBe(true);
    expect(eventDetail.photo).toBe(photoElement);
    expect(eventDetail.photo.getAttribute('src')).toBe('test-image.jpg');
    expect(eventDetail.photo.getAttribute('title')).toBe('Test Photo');
  });

  test('should handle missing title in photoclick event', () => {
    photoElement.setAttribute('src', 'test-image.jpg');
    document.body.appendChild(photoElement);

    let eventDetail = null;
    document.addEventListener('photoclick', (event) => {
      eventDetail = event.detail;
    });

    const img = photoElement.querySelector('img');
    img.click();

    expect(eventDetail.photo).toBe(photoElement);
    expect(eventDetail.photo.getAttribute('title')).toBeNull();
  });
});