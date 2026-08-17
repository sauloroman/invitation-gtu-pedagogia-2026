import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { optimize } from 'svgo';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../src/assets/images');

function getFilesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else if (item.endsWith('.svg')) {
      results.push(fullPath);
    }
  }
  return results;
}

async function optimizeSvgs() {
  const svgFiles = getFilesRecursively(IMAGES_DIR);
  console.log(`Encontrados ${svgFiles.length} archivos SVG para optimizar...`);

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const file of svgFiles) {
    const originalContent = fs.readFileSync(file, 'utf8');
    const originalSize = originalContent.length;
    totalOriginal += originalSize;

    try {
      const result = optimize(originalContent, {
        path: file,
        multipass: true,
        plugins: ['preset-default']
      });

      fs.writeFileSync(file, result.data, 'utf8');
      const newSize = result.data.length;
      totalOptimized += newSize;

      const filename = path.basename(file);
      const reduction = (((originalSize - newSize) / originalSize) * 100).toFixed(1);
      console.log(`  ✓ ${filename}: ${(originalSize / 1024).toFixed(0)} KB -> ${(newSize / 1024).toFixed(0)} KB (-${reduction}%)`);
    } catch (e) {
      console.error(`  ✕ Error optimizando ${path.basename(file)}:`, e);
      totalOptimized += originalSize;
    }
  }

  console.log(`\n🎉 Reducción total de SVGs: ${(totalOriginal / 1024).toFixed(0)} KB -> ${(totalOptimized / 1024).toFixed(0)} KB (-${(((totalOriginal - totalOptimized) / totalOriginal) * 100).toFixed(1)}%)`);
}

optimizeSvgs();
