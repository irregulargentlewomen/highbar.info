install-dependencies:
	npm install -g gulp
	npm install
	bundle

dev-server:
	gulp dev

deploy: clean dist
	node deploy.js

dist: build
	cp -r build dist
	./node_modules/uglify-js/bin/uglifyjs dist/javascripts/app.js -o dist/javascripts/app.js

build:
	gulp build

clean:
	rm -r build
	rm -r dist

.PHONY: install-dependencies clean deploy
