default: collection directory_structure

.PHONY: collection
collection:
	./generate_collection.sh

.PHONY: tree
tree:
	tree --filelimit 100

.PHONY: directory_structure
directory_structure:
	cat tree.json | jq  -r 'paths(scalars) as $$p | $$p + [getpath($$p)] | select(length > -2) | [range(1; length; 2) as $$i | .[$$i]] | join("/")'  | xargs -I_ echo 'mkdir -p _ ; cp index.html _ ;' | sh
