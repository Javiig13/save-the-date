#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const csso = require('csso');
const root = path.resolve(__dirname, '..');
const inputPath = path.join(root, 'styles.css');
const outputPath = path.join(root, 'styles.min.css');
const input = fs.readFileSync(inputPath, 'utf8');
const { css } = csso.minify(input, { restructure: true });
fs.writeFileSync(outputPath, css);
console.log('CSS minificado -> styles.min.css');
