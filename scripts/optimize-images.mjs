import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/images/optimized');

const SIZES = [
  { name: 'sm', width: 800 },
  { name: 'md', width: 1200 },
  { name: 'lg', width: 1920 }
];

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeImage(filePath) {
  const fileName = path.basename(filePath, path.extname(filePath));
  const ext = path.extname(filePath).toLowerCase();

  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

  console.log(`Optimizing: ${fileName}${ext}`);

  for (const size of SIZES) {
    const outputFileName = `${fileName}-${size.name}.webp`;
    const outputPath = path.join(OUTPUT_DIR, outputFileName);

    try {
      await sharp(filePath)
        .resize(size.width, null, { withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      const stats = fs.statSync(outputPath);
      console.log(`  - Created ${size.name}: ${outputFileName} (${(stats.size / 1024).toFixed(2)} KB)`);
    } catch (error) {
      console.error(`  - Error creating ${size.name}:`, error.message);
    }
  }

  // Also create a compressed original size webp
  const originalWebp = path.join(OUTPUT_DIR, `${fileName}.webp`);
  try {
    await sharp(filePath)
      .webp({ quality: 80 })
      .toFile(originalWebp);
    console.log(`  - Created original webp: ${fileName}.webp`);
  } catch (error) {
    console.error(`  - Error creating original webp:`, error.message);
  }
}

async function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      if (file !== 'optimized') {
        await processDirectory(fullPath);
      }
    } else {
      await optimizeImage(fullPath);
    }
  }
}

processDirectory(IMAGES_DIR)
  .then(() => console.log('Image optimization complete!'))
  .catch(err => console.error('Optimization failed:', err));
