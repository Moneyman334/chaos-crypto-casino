import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createAppIcon() {
  try {
    const sourceImage = join(__dirname, '..', 'public', 'app-icon-source.webp');
    const outputIcon = join(__dirname, '..', 'public', 'icon.png');
    
    // Create 1024x1024 app icon (required for both stores)
    await sharp(sourceImage)
      .resize(1024, 1024, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(outputIcon);
    
    console.log('✅ App icon created: public/icon.png (1024x1024)');
    
    // Create 512x512 for Google Play
    const googleIcon = join(__dirname, '..', 'public', 'icon-512.png');
    await sharp(sourceImage)
      .resize(512, 512, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(googleIcon);
    
    console.log('✅ Google Play icon created: public/icon-512.png (512x512)');
    
    // Create Android resources icons
    const androidSizes = [
      { size: 192, name: 'icon-192.png' },
      { size: 144, name: 'icon-144.png' },
      { size: 96, name: 'icon-96.png' },
      { size: 72, name: 'icon-72.png' },
      { size: 48, name: 'icon-48.png' }
    ];
    
    for (const { size, name } of androidSizes) {
      const outputPath = join(__dirname, '..', 'public', name);
      await sharp(sourceImage)
        .resize(size, size, {
          fit: 'cover',
          position: 'center'
        })
        .png()
        .toFile(outputPath);
      console.log(`✅ Android icon created: public/${name} (${size}x${size})`);
    }
    
    console.log('\n🎉 All app icons created successfully!');
  } catch (error) {
    console.error('❌ Error creating app icon:', error);
    process.exit(1);
  }
}

createAppIcon();
