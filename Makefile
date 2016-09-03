install-dependencies:
	npm install
	bundle

dev-server:
	npm start

deploy: clean dist
	node deploy.js

dist: build
	cp -r build dist
	./node_modules/uglify-js/bin/uglifyjs dist/javascripts/app.js -o dist/javascripts/app.js

build:
	npm run build

clean:
	rm -r build
	rm -r dist

.PHONY: install-dependencies clean deploy
