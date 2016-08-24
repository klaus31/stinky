#!/bin/bash

INDEX=0

while test -d "src/$INDEX"; do
  js-beautify -r -s 2 -f src/$INDEX/*.js
  js-beautify -r -s 2 --type js -f src/$INDEX/*.json
  js-beautify -r -s 2 --type css -f src/$INDEX/*.css
  js-beautify -r -s 2 --type html -f src/$INDEX/*.html
  INDEX=`expr $INDEX + 1`
done
