#!/bin/bash

INDEX=0

while test -d "src/$INDEX"; do
  cd "src/$INDEX"
  find . -name "*js" -exec js-beautify -r -s 2 -f {} \;
  # js-beautify -r -s 2 --type js -f src/$INDEX/*.json
  find . -name "*css" -exec js-beautify -r -s 2 --type css -f {} \;
  find . -name "*html" -exec js-beautify -r -s 2 --type html -f {} \;
  cd ../..
  INDEX=`expr $INDEX + 1`
done
