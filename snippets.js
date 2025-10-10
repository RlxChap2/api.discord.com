import fs from 'fs';
import path from 'path';

const src = path.resolve('./snippets');
const dest = path.resolve('./docs/snippets');

fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });

fs.readdirSync(src).forEach(file => {
  fs.copyFileSync(path.join(src, file), path.join(dest, file));
});
