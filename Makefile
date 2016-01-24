install-dependencies:
	npm install -g gulp
	npm install
	bundle

dev-server:
	gulp dev

.PHONY: install-dependencies
