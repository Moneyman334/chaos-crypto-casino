#!/bin/bash

echo "🔨 Building Android App Bundle..."

# Build web app
echo "📦 Building web app..."
npm run build

# Sync with Capacitor
echo "⚡ Syncing with Capacitor..."
npx cap sync android

# Build AAB
echo "🤖 Building signed AAB..."
cd android
./gradlew bundleRelease

echo ""
echo "✅ Build complete!"
echo "📍 Your AAB file is at:"
echo "   android/app/build/outputs/bundle/release/app-release.aab"
echo ""
echo "📤 Download this file and upload to Google Play Console!"
