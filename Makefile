default: collection directory_structure

.PHONY: collection
collection:
	./generate_collection.sh

.PHONY: tree
tree:
	tree --filelimit 100

.PHONY: directory_structure
directory_structure:
	NODE_PATH=. node -e '(async () => { const {allPaths} = await import("./components/tree.js"); process.stdout.write(JSON.stringify(allPaths()) + "\n");})()' | jq '.[]' | xargs -I_ echo 'mkdir -p _ ; cp index.html _ ;' | sh

