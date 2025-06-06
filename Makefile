default: collection directory_structure

.PHONY: collection
collection:
	./scripts/generate_collection.sh

.PHONY: lint
lint:
	npm run lint

.PHONY: fmt
fmt:
	npm run lint:fix

.PHONY: tree
tree:
	tree --filelimit 100

.PHONY: directory_structure
directory_structure:
	NODE_PATH=. node -e '(async () => { const {allPaths} = await import("./components/tree.js"); process.stdout.write(JSON.stringify(allPaths()) + "\n");})()' | jq '.[]' | xargs -I_ echo 'mkdir -p _ ; cp index.html _ ;' | sh

.PHONY: serve
serve:
	cd .. && python3 -m http.server

.PHONY: git_clean_img
git_clean_img:
	# check workdir is clean
	git diff --exit-code
	# remove prior files in img/
	git filter-branch --index-filter 'git rm --cached --ignore-unmatch img/*' HEAD
	# clean up old refs
	git reflog expire --expire=now --all && git gc --prune=now --aggressive


