#!/bin/bash
# This script compiles the protobuf files, generates the TypeScript definitions
# and bundles the compiled JavaScript into a single file via webpack.
# The output is placed in the dist/ directory.
npx pbjs --package=protobufjs-cli -t static-module -w es6 -o compiled.js **/*.proto;
npx webpack --mode=production;
npx pbts --no-comments -o dist/yamcsProto.d.ts compiled.js;
