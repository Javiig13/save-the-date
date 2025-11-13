#!/usr/bin/env node
const fs = require('fs');
const csso = require('csso');
const input = fs.readFileSync('../styles.css','utf8');
const { css } = csso.minify(input, { restructure: true });
fs.writeFileSync('../styles.min.css', css);
console.log('CSS minificado -> styles.min.css');
