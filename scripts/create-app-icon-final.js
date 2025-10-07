import convert from 'heic-convert';
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createAppIcon() {
  try {
    console.log('🎯 Converting HEIF cyberpunk image to PNG icons...\n');
    
    // Read the HEIF/WebP file
    const sourceImage = join(__dirname, '..', 'attached_assets', 'temp_image_43C3E7A9-F7FB-481E-96DB-BA76A379C292_1759812742480.webp');
    const inputBuffer = readFileSync(sourceImage);
    
    // Step 1: Convert HEIF to PNG using heic-convert
    console.log('🔄 Converting HEIF to PNG format...');
    const pngBuffer = await convert({
      buffer: inputBuffer,
      format: 'PNG',
      quality: 1  // Maximum quality
    });
    
    console.log('✅ Conversion successful!\n');
    
    // Step 2: Create app icons using sharp
    console.log('📐 Creating app icons...\n');
    
    // Main app icon 1024x1024 (Apple & Google requirement)
    await sharp(pngBuffer)
      .resize(1024, 1024, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(join(__dirname, '..', 'public', 'icon.png'));
    console.log('✅ App icon created: public/icon.png (1024x1024)');
    
    // Google Play icon 512x512  
    await sharp(pngBuffer)
      .resize(512, 512, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(join(__dirname, '..', 'public', 'icon-512.png'));
    console.log('✅ Google Play icon created: public/icon-512.png (512x512)');
    
    // Android resource icons (for native app)
    const sizes = [
      { size: 192, name: 'icon-192.png', desc: 'xxxhdpi' },
      { size: 144, name: 'icon-144.png', desc: 'xxhdpi' },
      { size: 96, name: 'icon-96.png', desc: 'xhdpi' },
      { size: 72, name: 'icon-72.png', desc: 'hdpi' },
      { size: 48, name: 'icon-48.png', desc: 'mdpi' }
    ];
    
    for (const { size, name, desc } of sizes) {
      await sharp(pngBuffer)
        .resize(size, size, {
          fit: 'cover',
          position: 'center'
        })
        .png()
        .toFile(join(__dirname, '..', 'public', name));
      console.log(`✅ Android icon created: public/${name} (${size}x${size} - ${desc})`);
    }
    
    console.log('\n🔥🔥🔥 CYBERPUNK KING IS NOW YOUR APP ICON! 👑');
    console.log('📱 Icons ready for App Store & Google Play submission!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
}

createAppIcon();
