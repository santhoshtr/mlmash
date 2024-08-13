.phony: build clean assets

build: clean assets
	mkdir -p public/letter
	python src/letter.py

assets:
	mkdir -p public/assets
	cp -r src/assets public/

clean:
	rm -rf public
