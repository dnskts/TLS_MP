import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

const dir = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(dir, 'src');
const outDir = path.join(dir, 'assets');
const authDir = path.join(dir, '..', 'assets', 'auth');

fs.mkdirSync(outDir, { recursive: true });

const W = 1290;
const H = 2796;

/** 22 tourism auth backgrounds — photo + overlay treatment */
const VARIANTS = [
  { id: '01', name: 'Private jet', file: 'travel-gen-jet.png', overlay: 'teal', ink: '#f7fcf9', gold: false, y: 480 },
  { id: '02', name: 'Infinity pool', file: 'travel-gen-pool.png', overlay: 'dusk', ink: '#f7fcf9', gold: true, y: 460 },
  { id: '03', name: 'Marina night', file: 'travel-gen-marina.png', overlay: 'deep', ink: '#f7fcf9', gold: true, y: 460 },
  { id: '04', name: 'Desert dunes', file: 'travel-gen-desert.png', overlay: 'warm', ink: '#f7fcf9', gold: true, y: 460 },
  { id: '05', name: 'Sky lounge', file: 'travel-gen-lounge.png', overlay: 'teal', ink: '#f7fcf9', gold: false, y: 480 },
  { id: '06', name: 'Venice canal', file: 'travel-gen-venice.png', overlay: 'mist', ink: '#f7fcf9', gold: false, y: 460 },
  { id: '07', name: 'Maldives', file: 'travel-gen-maldives.png', overlay: 'mint', ink: '#1a5a6e', gold: false, y: 440 },
  { id: '08', name: 'Terrace brunch', file: 'travel-gen-terrace.png', overlay: 'sky', ink: '#f7fcf9', gold: true, y: 460 },
  { id: '09', name: 'Chauffeur hotel', file: 'travel-gen-car.png', overlay: 'deep', ink: '#f7fcf9', gold: false, y: 460 },
  { id: '10', name: 'Airport lounge', file: 'airport-lounge.jpg', overlay: 'teal', ink: '#f7fcf9', gold: true, y: 480 },
  { id: '11', name: 'Hotel suite', file: 'hotel-suite.jpg', overlay: 'mint', ink: '#1a5a6e', gold: false, y: 460 },
  { id: '12', name: 'Fine dining', file: 'fine-dining.jpg', overlay: 'deep', ink: '#f7fcf9', gold: true, y: 480 },
  { id: '13', name: 'Beach dusk', file: 'travel-gen-beach.png', overlay: 'dusk', ink: '#f7fcf9', gold: true, y: 500 },
  { id: '14', name: 'Volcanic coast', file: 'travel-gen-volcanic-coast.png', overlay: 'elite', ink: '#f7fcf9', gold: false, y: 440 },
  { id: '15', name: 'Yacht dusk', file: 'travel-gen-yacht-dusk.png', overlay: 'elite', ink: '#f7fcf9', gold: true, y: 460 },
  { id: '16', name: 'Cliff pool', file: 'travel-gen-cliff-pool.png', overlay: 'dusk', ink: '#f7fcf9', gold: true, y: 440 },
  { id: '17', name: 'Jet cabin', file: 'travel-gen-jet-cabin.png', overlay: 'deep', ink: '#f7fcf9', gold: false, y: 480 },
  { id: '18', name: 'Alpine chalet', file: 'travel-gen-chalet.png', overlay: 'elite', ink: '#f7fcf9', gold: true, y: 460 },
  { id: '19', name: 'Desert resort', file: 'travel-gen-desert-resort.png', overlay: 'dusk', ink: '#f7fcf9', gold: true, y: 460 },
  { id: '20', name: 'Heli coast', file: 'travel-gen-heli-coast.png', overlay: 'elite', ink: '#f7fcf9', gold: false, y: 440 },
  { id: '21', name: 'Overwater villa', file: 'travel-gen-overwater.png', overlay: 'deep', ink: '#f7fcf9', gold: false, y: 480 },
  { id: '22', name: 'First-class lounge', file: 'travel-gen-fclass-lounge.png', overlay: 'elite', ink: '#f7fcf9', gold: true, y: 460 }
];

const OVERLAYS = {
  mint: [
    ['0%', '#f7fcf9', 0.5],
    ['28%', '#f7fcf9', 0.12],
    ['100%', '#1a5a6e', 0.35]
  ],
  teal: [
    ['0%', '#0a2833', 0.5],
    ['35%', '#1a5a6e', 0.28],
    ['100%', '#0a2833', 0.55]
  ],
  dusk: [
    ['0%', '#1a5a6e', 0.55],
    ['40%', '#0f3d4a', 0.3],
    ['100%', '#0a2833', 0.62]
  ],
  deep: [
    ['0%', '#0a2833', 0.55],
    ['40%', '#1a5a6e', 0.32],
    ['100%', '#061820', 0.7]
  ],
  mist: [
    ['0%', '#ffffff', 0.45],
    ['30%', '#f7fcf9', 0.15],
    ['100%', '#0a2833', 0.4]
  ],
  sky: [
    ['0%', '#0a2833', 0.42],
    ['32%', '#1a5a6e', 0.18],
    ['100%', '#0a2833', 0.45]
  ],
  warm: [
    ['0%', '#1a5a6e', 0.4],
    ['35%', '#c9a86a', 0.12],
    ['100%', '#0a2833', 0.55]
  ],
  /* Strong top/bottom vignette for white UI like prod screenshot */
  elite: [
    ['0%', '#061018', 0.62],
    ['22%', '#0a2833', 0.28],
    ['48%', '#0a2833', 0.06],
    ['78%', '#0a2833', 0.22],
    ['100%', '#040a10', 0.58]
  ]
};

function overlaySvg(key) {
  const stops = OVERLAYS[key].map(
    ([o, c, a]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`
  ).join('');
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="ov" x1="0" y1="0" x2="0" y2="1">${stops}</linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#ov)"/>
</svg>`;
}

async function exportAuth(v) {
  const photoPath = path.join(authDir, v.file);
  if (!fs.existsSync(photoPath)) throw new Error('Missing ' + v.file);

  const base = await sharp(photoPath)
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .ensureAlpha()
    .png()
    .toBuffer();

  const overlayBuf = new Resvg(overlaySvg(v.overlay), {
    fitTo: { mode: 'width', value: W }
  }).render().asPng();

  const out = path.join(outDir, `auth-bg-${v.id}-1290x2796.png`);
  /* Master = photo + overlay only; wordmark is drawn by app UI («МОЙ TLS») */
  await sharp(base)
    .composite([
      { input: overlayBuf, blend: 'over' }
    ])
    .removeAlpha()
    .png({ compressionLevel: 8 })
    .toFile(out);

  // compact source note
  fs.writeFileSync(
    path.join(srcDir, `auth-bg-${v.id}.json`),
    JSON.stringify({ ...v, size: `${W}x${H}` }, null, 2) + '\n'
  );
  console.log('OK', path.basename(out), '·', v.name);
}

function exportSplash() {
  const splashPath = path.join(srcDir, 'splash-mint-light.svg');
  const svg = fs.readFileSync(splashPath);
  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: W },
    background: '#f7fcf9'
  }).render().asPng();
  const out = path.join(outDir, 'splash-mint-light-1290x2796.png');
  fs.writeFileSync(out, png);
  console.log('OK', path.basename(out));
}

fs.mkdirSync(srcDir, { recursive: true });
exportSplash();
fs.writeFileSync(
  path.join(srcDir, 'auth-variants.json'),
  JSON.stringify(VARIANTS, null, 2) + '\n'
);

for (const v of VARIANTS) {
  await exportAuth(v);
}
console.log('Done:', VARIANTS.length, 'auth + splash →', outDir);
