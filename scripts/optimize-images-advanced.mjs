import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/images/optimized');

// Responsive sizes for different breakpoints
const SIZES = [
  { name: 'xs', width: 480 },   // Mobile
  { name: 'sm', width: 768 },   // Tablet
  { name: 'md', width: 1024 },  // Desktop
  { name: 'lg', width: 1536 },  // Large desktop
  { name: 'xl', width: 1920 }   // Ultra-wide
];

// Hero image specific sizes (more aggressive compression)
const HERO_SIZES = [
  { name: 'xs', width: 640 },
  { name: 'sm', width: 1024 },
  { name: 'md', width: 1536 },
  { name: 'lg', width: 1920 }
];

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeImage(filePath) {
  const fileName = path.basename(filePath, path.extname(filePath));
  const ext = path.extname(filePath).toLowerCase();

  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

  console.log(`\n📸 Optimizing: ${fileName}${ext}`);

  const isHero = fileName.includes('hero');
  const sizes = isHero ? HERO_SIZES : SIZES;
  
  // Get original file size
  const originalStats = fs.statSync(filePath);
  console.log(`   Original size: ${(originalStats.size / 1024 / 1024).toFixed(2)} MB`);

  let totalCompressed = 0;

  // Generate WebP versions
  for (const size of sizes) {
    const outputFileName = `${fileName}-${size.name}.webp`;
    const outputPath = path.join(OUTPUT_DIR, outputFileName);

    try {
      // More aggressive quality for hero images
      const quality = isHero ? (size.name === 'xs' ? 35 : 45) : (size.name === 'xs' ? 40 : 55);
      
      await sharp(filePath)
        .resize(size.width, null, { withoutEnlargement: true })
        .webp({ quality, effort: 6, alphaQuality: 100 })
        .toFile(outputPath);
      
      const stats = fs.statSync(outputPath);
      const sizeKb = stats.size / 1024;
      totalCompressed += stats.size;
      console.log(`   ✓ WebP ${size.name}: ${outputFileName} (${sizeKb.toFixed(2)} KB)`);
    } catch (error) {
      console.error(`   ✗ Error creating WebP ${size.name}:`, error.message);
    }
  }

  // Generate JPEG fallbacks for older browsers
  for (const size of sizes) {
    const outputFileName = `${fileName}-${size.name}.jpg`;
    const outputPath = path.join(OUTPUT_DIR, outputFileName);

    try {
      const quality = isHero ? (size.name === 'xs' ? 40 : 50) : (size.name === 'xs' ? 45 : 60);
      
      await sharp(filePath)
        .resize(size.width, null, { withoutEnlargement: true })
        .jpeg({ quality, progressive: true, mozjpeg: true })
        .toFile(outputPath);
      
      const stats = fs.statSync(outputPath);
      const sizeKb = stats.size / 1024;
      totalCompressed += stats.size;
      console.log(`   ✓ JPEG ${size.name}: ${outputFileName} (${sizeKb.toFixed(2)} KB)`);
    } catch (error) {
      console.error(`   ✗ Error creating JPEG ${size.name}:`, error.message);
    }
  }

  // Create original size WebP (for <picture> fallback)
  const originalWebp = path.join(OUTPUT_DIR, `${fileName}.webp`);
  try {
    const quality = isHero ? 50 : 65;
    await sharp(filePath)
      .webp({ quality, effort: 6 })
      .toFile(originalWebp);
    const stats = fs.statSync(originalWebp);
    totalCompressed += stats.size;
    console.log(`   ✓ WebP original: ${fileName}.webp (${(stats.size / 1024).toFixed(2)} KB)`);
  } catch (error) {
    console.error(`   ✗ Error creating original WebP:`, error.message);
  }

  // Create original size JPEG (for <picture> fallback)
  const originalJpeg = path.join(OUTPUT_DIR, `${fileName}.jpg`);
  try {
    const quality = isHero ? 55 : 70;
    await sharp(filePath)
      .jpeg({ quality, progressive: true, mozjpeg: true })
      .toFile(originalJpeg);
    const stats = fs.statSync(originalJpeg);
    totalCompressed += stats.size;
    console.log(`   ✓ JPEG original: ${fileName}.jpg (${(stats.size / 1024).toFixed(2)} KB)`);
  } catch (error) {
    console.error(`   ✗ Error creating original JPEG:`, error.message);
  }

  const compressionRatio = ((1 - totalCompressed / originalStats.size) * 100).toFixed(1);
  console.log(`   📊 Total compressed: ${(totalCompressed / 1024 / 1024).toFixed(2)} MB (${compressionRatio}% reduction)`);
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

console.log('🚀 Starting advanced image optimization...');
processDirectory(IMAGES_DIR)
  .then(() => {
    console.log('\n✅ Image optimization complete!');
    console.log('📁 All optimized images are in:', OUTPUT_DIR);
  })
  .catch(err => console.error('❌ Optimization failed:', err));
