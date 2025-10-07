# Feature Graphic Design Guide (1024x500)

## REQUIREMENTS
- **Dimensions**: 1024 x 500 pixels (EXACT)
- **Format**: PNG or JPG
- **File size**: Under 1MB
- **Purpose**: Banner shown at top of Play Store listing

---

## DESIGN CONCEPT - "Chaos Crypto Casino: Blockchain Empire"

### Visual Theme: Vegas Cyberpunk Casino
- **Background**: Deep purple/blue gradient (cosmic casino theme)
- **Accents**: Neon pink, cyan, electric blue
- **Effects**: Graffiti drips, neon glow, star effects
- **Style**: High energy, futuristic, premium

---

## LAYOUT STRUCTURE

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  [APP ICON]    CHAOS CRYPTO CASINO                    💎🚀   │
│   (128x128)                                                   │
│                The Complete Blockchain Empire               │
│                                                               │
│   [Feature Icons/Screenshots Preview Below Text]             │
│   🏦 DAO Treasury  |  🤖 AI Trading  |  🎨 NFT Launch         │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## DESIGN ELEMENTS

### Text Content
**Main Headline** (Large, Bold, Center-Left):
```
CHAOS CRYPTO CASINO
```
- Font: Bold, Futuristic (e.g., Orbitron, Exo, Rajdhani)
- Size: 72-80px
- Color: White with neon glow effect
- Effect: Slight graffiti drip from letters

**Tagline** (Medium, Below Headline):
```
The Complete Blockchain Empire
```
- Font: Medium weight, clean
- Size: 32-36px
- Color: Cyan (#00f0ff) or neon pink (#ff006e)
- Effect: Subtle glow

**Feature Pills** (Bottom Third):
```
💰 DAO Profit Sharing  |  🤖 AI Trading  |  🚀 Launch NFTs  |  🏦 Yield Farming
```
- Font: 18-22px
- Background: Semi-transparent dark pills with neon borders
- Icons: Emoji or icon fonts

### Visual Elements

1. **App Icon** (Top Left)
   - Your 1024x1024 cyberpunk icon
   - Scaled to 128x128 or 150x150
   - Position: 40px from left, centered vertically

2. **Background Gradient**
   ```css
   background: linear-gradient(135deg, 
     #1a0b2e 0%,    /* Deep purple */
     #2d1b4e 50%,   /* Mid purple */
     #0f0f23 100%   /* Dark blue-black */
   );
   ```

3. **Neon Glow Effects**
   - Text shadows with pink/cyan glow
   - Light rays emanating from center
   - Particle effects (stars, sparkles)

4. **Graffiti Drips**
   - Neon paint dripping from key letters
   - Pink or cyan drips for cyberpunk vibe
   - Subtle, not overwhelming

5. **Visual Accents** (Right Side)
   - Crypto symbols (₿, Ξ, ◎) with glow
   - 3D geometric shapes (cubes, pyramids)
   - Chart/graph lines going up
   - Casino chips with neon edges

---

## DESIGN TOOLS

### Option 1: Canva (Easiest - Recommended!)
1. Go to Canva.com
2. Create custom size: 1024 x 500 px
3. Search templates: "gaming banner" or "tech banner"
4. Customize with your text and colors
5. Add elements from Canva library
6. Download as PNG

**Pro Canva Elements to Search:**
- "neon text effect"
- "cyberpunk background"
- "casino elements"
- "crypto icons"
- "graffiti effect"

### Option 2: Figma (Professional)
1. Create 1024 x 500 frame
2. Import your app icon
3. Use gradient backgrounds
4. Add text with effects
5. Export as PNG @2x for quality

### Option 3: Photoshop/GIMP
1. New file: 1024 x 500 px, 72 DPI
2. Create gradient background layer
3. Add text with layer styles (glow, shadow)
4. Import app icon and elements
5. Add effects and save as PNG

### Option 4: Quick HTML/CSS (For Developers)
```html
<!DOCTYPE html>
<html>
<head>
<style>
body {
  margin: 0;
  width: 1024px;
  height: 500px;
  background: linear-gradient(135deg, #1a0b2e, #2d1b4e, #0f0f23);
  display: flex;
  align-items: center;
  padding: 0 60px;
  font-family: 'Arial Black', sans-serif;
  position: relative;
  overflow: hidden;
}

.icon {
  width: 120px;
  height: 120px;
  border-radius: 20px;
  margin-right: 40px;
}

.content h1 {
  font-size: 68px;
  margin: 0;
  color: white;
  text-shadow: 0 0 20px #ff006e, 0 0 40px #ff006e;
}

.content p {
  font-size: 28px;
  margin: 10px 0 0 0;
  color: #00f0ff;
  font-weight: normal;
  font-family: Arial, sans-serif;
}

.features {
  position: absolute;
  bottom: 30px;
  left: 60px;
  right: 60px;
  display: flex;
  gap: 20px;
}

.feature {
  background: rgba(255,255,255,0.1);
  border: 1px solid #00f0ff;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
}

.stars {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(2px 2px at 20% 30%, white, transparent),
                    radial-gradient(2px 2px at 60% 70%, white, transparent),
                    radial-gradient(1px 1px at 50% 50%, white, transparent);
  opacity: 0.4;
}
</style>
</head>
<body>
  <div class="stars"></div>
  <img class="icon" src="YOUR_APP_ICON.png" alt="App Icon">
  <div class="content">
    <h1>CHAOS CRYPTO CASINO</h1>
    <p>The Complete Blockchain Empire</p>
  </div>
  <div class="features">
    <div class="feature">💰 DAO Treasury</div>
    <div class="feature">🤖 AI Trading</div>
    <div class="feature">🚀 NFT Launch</div>
    <div class="feature">🏦 Yield Farming</div>
  </div>
</body>
</html>
```

Open in browser, resize window to 1024x500, screenshot!

---

## COLOR PALETTE

```
Primary:
- Deep Purple: #1a0b2e
- Mid Purple: #2d1b4e
- Dark Blue: #0f0f23

Accents:
- Neon Pink: #ff006e
- Electric Cyan: #00f0ff
- Neon Purple: #a855f7
- Vegas Gold: #ffd700

Text:
- White: #ffffff
- Light Gray: #e0e0e0
```

---

## TYPOGRAPHY RECOMMENDATIONS

**Headlines:**
- Orbitron (Google Fonts) - Futuristic
- Exo 2 (Google Fonts) - Tech/Gaming
- Rajdhani (Google Fonts) - Bold & Modern
- Audiowide (Google Fonts) - Retro-Futuristic

**Body/Tagline:**
- Inter - Clean & Modern
- Roboto - Professional
- Space Grotesk - Tech-Forward

---

## EXAMPLES TO INSPIRE

Search Google Images for:
- "crypto app play store banner"
- "blockchain game feature graphic"
- "neon cyberpunk banner"
- "casino app banner design"

Good examples from Play Store:
- Coinbase
- Crypto.com
- Binance
- Any top gaming apps

---

## QUICK WIN: Use Your Existing Icon!

If short on time:
1. Use solid gradient background (purple to black)
2. Place your app icon (large, 200px)
3. Add app name in bold white text
4. Add tagline in cyan
5. Done! Simple but effective.

---

## FILE NAMING
Save as: `chaos-crypto-casino-feature-graphic.png`

Upload to Play Console under "Store Listing" → "Graphic assets"
