# photo gallery website - [theryangeary.github.io/photo](https://theryangeary.github.io/photo)

## Development

Most code is in the root or in `components/`. Most other dirs are the generated directories for serving the static site.

To add a new page and navbar entry, include it in `tree` inside `components/tree.js`.

### Initial Setup

After cloning the repository:

1. Install dependencies and git hooks:
```bash
npm install
./scripts/install_hooks.sh
```

### Local Server

run `cd .. && python3 -m httpserver` and then navigate to localhost:8000/photos

### Building

Before building, ensure you have exported relevant images from Darktable using preset `website`.

Note that this will not remove any images included that have been removed from tag `website`.

Make sure `components/tree.js` is up to date.

Then run `make`. It will generate `collection.js` and the static site tree structure.

### Code Quality

Maintain code quality with these commands:

```bash
make fmt     # Auto-fix formatting and style issues
make lint    # Check for linting issues
```

Git hooks automatically enforce code quality:
- **Pre-commit**: Prevents commits with linting errors
- **Pre-push**: Prevents pushing to master with linting/build failures

Commit and push.

### Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode during development:

```bash
npm run test:watch
```

Generate test coverage report:

```bash
npm run test:coverage
```

Tests are located in the `tests/` directory and cover:
- Component functionality (Photo, Tree utilities)
- Collection data validation
- Photo filtering logic
