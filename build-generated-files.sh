#!/bin/sh

#cleanup
rm -rf generated

#setup
mkdir generated

#build
cd ../pouchdb-fauxton-logic
npm run build-chrome

#copy
cp -r fauxton/ ../pouchdb-fauxton-chrome-extension/generated/fauxton/
cp dist/postmessagerpc.js ../pouchdb-fauxton-chrome-extension/generated/
cp dist/injected.js ../pouchdb-fauxton-chrome-extension/generated/eval.js
