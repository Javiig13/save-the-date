#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const terser = require('terser');

const root = path.resolve(__dirname, '..');
const inputPath = path.join(root, 'script.js');
const outputPath = path.join(root, 'script.min.js');

(async () => {
  try {
    const input = fs.readFileSync(inputPath, 'utf8');
    const inputSize = Buffer.byteLength(input, 'utf8');
    
    const result = await terser.minify(input, {
      compress: {
        drop_console: false,
        passes: 2,
        pure_funcs: [],
        dead_code: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        if_return: true,
        join_vars: true,
        reduce_vars: true
      },
      mangle: {
        toplevel: true,
        safari10: true
      },
      format: {
        comments: false
      }
    });
    
    if (result.error) {
      throw result.error;
    }
    
    fs.writeFileSync(outputPath, result.code, 'utf8');
    
    const outputSize = Buffer.byteLength(result.code, 'utf8');
    const reduction = ((1 - outputSize / inputSize) * 100).toFixed(2);
    
    console.log('✓ JS minificado -> script.min.js');
    console.log(`  Original: ${(inputSize / 1024).toFixed(2)} KB`);
    console.log(`  Minificado: ${(outputSize / 1024).toFixed(2)} KB`);
    console.log(`  Reducción: ${reduction}%`);
  } catch (error) {
    console.error('✗ Error al minificar JS:', error.message);
    process.exit(1);
  }
})();
