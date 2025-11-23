#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const csso = require('csso');

const root = path.resolve(__dirname, '..');
const inputPath = path.join(root, 'styles.css');
const outputPath = path.join(root, 'styles.min.css');

try {
  const input = fs.readFileSync(inputPath, 'utf8');
  const inputSize = Buffer.byteLength(input, 'utf8');
  
  const { css } = csso.minify(input, { 
    restructure: true,
    forceMediaMerge: true,
    comments: false
  });
  
  fs.writeFileSync(outputPath, css, 'utf8');
  
  const outputSize = Buffer.byteLength(css, 'utf8');
  const reduction = ((1 - outputSize / inputSize) * 100).toFixed(2);
  
  console.log('✓ CSS minificado -> styles.min.css');
  console.log(`  Original: ${(inputSize / 1024).toFixed(2)} KB`);
  console.log(`  Minificado: ${(outputSize / 1024).toFixed(2)} KB`);
  console.log(`  Reducción: ${reduction}%`);
} catch (error) {
  console.error('✗ Error al minificar CSS:', error.message);
  process.exit(1);
}
