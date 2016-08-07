#!/bin/bash

js-beautify -r -s 2 -f src/*.js
js-beautify -r -s 2 --type js -f src/*.json
js-beautify -r -s 2 --type css -f src/*.css
js-beautify -r -s 2 --type html -f src/*.html
