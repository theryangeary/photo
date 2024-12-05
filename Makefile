.PHONY: collection
collection:
	./generate_collection.sh
	rm script.js.bak

tree:
	tree --filelimit 100
