import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videosDir = path.join(__dirname, '../src/assets/videos');

const videosToOptimize = ['envelope.mp4', 'hero.mp4'];

console.log('🚀 Iniciando compresión de videos originales del usuario...\n');

for (const videoName of videosToOptimize) {
  const inputPath = path.join(videosDir, videoName);
  const tempPath = path.join(videosDir, `temp-${videoName}`);

  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️ No se encontró: ${videoName}`);
    continue;
  }

  const originalSize = fs.statSync(inputPath).size;
  console.log(`Comprimiendo ${videoName} original (Tamaño previo: ${(originalSize / (1024 * 1024)).toFixed(2)} MB)...`);

  try {
    // Compress original video using H.264 CRF 28 and remove unused audio channel for web background videos
    const cmd = `"${ffmpegPath}" -i "${inputPath}" -vcodec libx264 -crf 28 -preset faster -an -y "${tempPath}"`;
    execSync(cmd, { stdio: 'inherit' });

    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(inputPath);
      fs.renameSync(tempPath, inputPath);
      const newSize = fs.statSync(inputPath).size;
      const reduction = (((originalSize - newSize) / originalSize) * 100).toFixed(1);
      console.log(`  ✓ ${videoName} optimizado: ${(originalSize / (1024 * 1024)).toFixed(2)} MB -> ${(newSize / (1024 * 1024)).toFixed(2)} MB (-${reduction}%)\n`);
    }
  } catch (e) {
    console.error(`  ✕ Error al comprimir ${videoName}:`, e);
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
  }
}

console.log('✅ Proceso de compresión de videos originales finalizado.');
