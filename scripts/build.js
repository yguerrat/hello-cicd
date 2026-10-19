// Etapa Build: valida la sintaxis y copia el código fuente a dist/
const { cpSync, rmSync, readdirSync } = require('node:fs');
const { execFileSync } = require('node:child_process');
const path = require('node:path');

const srcDir = path.join(__dirname, '..', 'src');
const distDir = path.join(__dirname, '..', 'dist');

for (const file of readdirSync(srcDir).filter((f) => f.endsWith('.js'))) {
  execFileSync(process.execPath, ['--check', path.join(srcDir, file)], { stdio: 'inherit' });
}

rmSync(distDir, { recursive: true, force: true });
cpSync(srcDir, distDir, { recursive: true });
console.log('Build OK -> dist/');
