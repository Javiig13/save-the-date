#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const terser = require('terser');
const root = path.resolve(__dirname, '..');
const inputPath = path.join(root, 'script.js');
const outputPath = path.join(root, 'script.min.js');
(async () => {
  const input = fs.readFileSync(inputPath, 'utf8');
  const result = await terser.minify(input, { compress: true, mangle: true });
  fs.writeFileSync(outputPath, result.code);
  console.log('JS minificado -> script.min.js');
})();
