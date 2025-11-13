#!/usr/bin/env node
const fs = require('fs');
const terser = require('terser');
const input = fs.readFileSync('../script.js','utf8');
(async () => {
  const result = await terser.minify(input, { compress: true, mangle: true });
  fs.writeFileSync('../script.min.js', result.code);
  console.log('JS minificado -> script.min.js');
})();
