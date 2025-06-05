# photo gallery website - [theryangeary.github.io/photo](https://theryangeary.github.io/photo)

## Development

Most code is in the root or in `components/`. Most other dirs are the generated directories for serving the static site.

To add a new page and navbar entry, include it in `tree` inside `components/tree.js`.

### Initial Setup

After cloning the repository, install the git hooks:

```bash
./scripts/install-hooks.sh
```

### Local Server

run `cd .. && python3 -m httpserver` and then navigate to localhost:8000/photos

### Building

Before building, ensure you have exported relevant images from Darktable using preset `website`.

Note that this will not remove any images included that have been removed from tag `website`.

Make sure `components/tree.js` is up to date.

Then run `make`. It will generate `collection.js` and the static site tree structure.

Commit and push.
