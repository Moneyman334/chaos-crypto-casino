import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createAppIcon() {
  try {
    // Read the webp file as a buffer
    const sourceImage = join(__dirname, '..', 'attached_assets', 'temp_image_43C3E7A9-F7FB-481E-96DB-BA76A379C292_1759812742480.webp');
    const imageBuffer = readFileSync(sourceImage);
    
    console.log('📸 Processing cyberpunk king image...');
    
    // Main app icon 1024x1024
    const icon1024 = await sharp(imageBuffer)
      .resize(1024, 1024, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toBuffer();
    
    writeFileSync(join(__dirname, '..', 'public', 'icon.png'), icon1024);
    console.log('✅ App icon created: public/icon.png (1024x1024)');
    
    // Google Play icon 512x512  
    const icon512 = await sharp(imageBuffer)
      .resize(512, 512, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toBuffer();
    
    writeFileSync(join(__dirname, '..', 'public', 'icon-512.png'), icon512);
    console.log('✅ Google Play icon created: public/icon-512.png (512x512)');
    
    // Android resource icons
    const sizes = [
      { size: 192, name: 'icon-192.png' },
      { size: 144, name: 'icon-144.png' },
      { size: 96, name: 'icon-96.png' },
      { size: 72, name: 'icon-72.png' },
      { size: 48, name: 'icon-48.png' }
    ];
    
    for (const { size, name } of sizes) {
      const iconBuffer = await sharp(imageBuffer)
        .resize(size, size, {
          fit: 'cover',
          position: 'center'
        })
        .png()
        .toBuffer();
      
      writeFileSync(join(__dirname, '..', 'public', name), iconBuffer);
      console.log(`✅ Android icon created: public/${name} (${size}x${size})`);
    }
    
    console.log('\n🔥 CYBERPUNK KING IS NOW YOUR APP ICON! 👑');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createAppIcon();
