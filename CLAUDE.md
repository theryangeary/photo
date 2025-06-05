# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Building the Site
- `make` - Generates collection.js and static site directory structure
- `make collection` - Runs generate_collection.sh to create collection.js from image metadata
- `make directory_structure` - Creates all subdirectories based on tree.js structure

### Development Server
- `cd .. && python3 -m http.server` then navigate to localhost:8000/photo

### Before Building
1. Export relevant images from Darktable using preset `website`
2. Ensure `components/tree.js` is up to date with new pages/navbar entries
3. Run `make`
4. Commit and push

## Architecture

This is a static photo gallery website using vanilla JavaScript and custom web components.

### Core Structure
- **Root files**: Main HTML, CSS, and JavaScript entry points
- **components/**: Custom web components (Body, Navbar, Photo, etc.)
- **img/**: Source photos with EXIF metadata for tags/titles/ratings
- **Generated directories**: archive/, trips/, selectedworks/ with index.html copies

### Key Components
- **collection.js**: Auto-generated from image EXIF data via generate_collection.sh
- **tree.js**: Defines site navigation structure and all page paths
- **script.js**: Main application logic for filtering, display, and navigation

### Photo Management
- Images are tagged via EXIF Subject field in Darktable
- Rating system uses EXIF Rating field
- Title from EXIF Title field
- generate_collection.sh extracts all metadata into JavaScript objects

### Filtering System
Photos are filtered by:
- Archive dates (YYYYMM format in filename)
- Tags (selectedworks, trips, panorama, portfolio, etc.)
- URL path-based selection
- Query parameters (?tag=, ?archive=, etc.)

### Navigation
- Tree structure in components/tree.js drives both navbar and directory generation
- URL paths map to tag filters (e.g., /photo/street → street tag filter)
- Archive paths use date format (e.g., /photo/archive/202405)

### Display Logic
- Two-column masonry layout (single column on mobile/panoramas)
- Lazy loading via scroll detection
- Fullscreen overlay for individual photos
- Rating-based sorting for curated collections