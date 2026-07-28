import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resvg } from '@resvg/resvg-js';

const dir = path.dirname(fileURLToPath(import.meta.url));

const icons = [
  { file: 'AppIcon-mint-light.svg', background: '#f7fcf9' },
  { file: 'AppIcon-ink-rim.svg', background: '#121820' },
  { file: 'AppIcon-ios27-clear.svg', background: '#1a3040' },
  { file: 'AppIcon-ink-white.svg', background: '#121820' }
];

for (const { file, background } of icons) {
  const svg = fs.readFileSync(path.join(dir, file));
  const out = path.join(dir, file.replace('.svg', '-1024.png'));
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1024 },
    background
  });
  const png = resvg.render().asPng();
  fs.writeFileSync(out, png);
  console.log('OK', path.basename(out));
}
