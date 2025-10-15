# Fortune Caster - Image Assets

This folder contains placeholder files for the Fortune Caster app's required images.

## 📁 Required Files

### ✅ Already Created
- `icon.svg` - SVG icon (32x32) - **Ready to use**
- `manifest.json` - PWA manifest - **Ready to use**

### 🔄 Need to Generate (Placeholders Created)

1. **favicon.ico** (32x32)
   - Browser tab icon
   - Replace the text placeholder with actual .ico file

2. **apple-icon.png** (180x180)
   - iOS home screen icon
   - Replace the text placeholder with actual PNG file

3. **og-image.png** (1200x630)
   - Social media sharing image
   - Replace the text placeholder with actual PNG file

4. **icon-192.png** (192x192)
   - PWA icon for mobile
   - Replace the text placeholder with actual PNG file

5. **icon-512.png** (512x512)
   - PWA icon for desktop
   - Replace the text placeholder with actual PNG file

## 🛠️ How to Generate Images

### Option 1: Use the HTML Generator
1. Open `/public/generate-images.html` in your browser
2. Right-click on each image element
3. "Save image as..." with the correct filename
4. Replace the placeholder files

### Option 2: Design Tools
Use any design tool (Figma, Canva, Photoshop, etc.) to create:
- **Design**: Fortune sticks in a container (as shown in the app)
- **Colors**: Match the app's color scheme
- **Style**: Modern, clean, rounded corners

### Option 3: Online Generators
- **Favicon**: Use favicon.io or realfavicongenerator.net
- **PWA Icons**: Use pwa-asset-generator or similar tools

## 🎨 Design Guidelines

### Color Scheme
- Primary: `#FF6B6B` (Coral)
- Secondary: `#4ECDC4` (Teal)
- Accent: `#FFE66D` (Yellow)
- Background: `#F1A7DC` (Light Purple)
- Container: `#A8DADC` (Light Blue)

### Fortune Sticks Design
- 5 sticks of varying heights
- Alternating colors (Yellow/Purple)
- Orange caps on top
- Rounded corners
- Soft shadows

### Layout
- Centered in container
- Mountain/wave pattern (short-tall-tallest-tall-short)
- Clean, modern aesthetic
- Consistent with app's warm gradient background

## 🚀 Quick Start

1. **Immediate**: The SVG icon and manifest are ready to use
2. **For Production**: Generate all PNG/ICO files
3. **Test**: Check that all images load correctly in the app

## 📱 App Integration

The images are automatically referenced in:
- `app/layout.tsx` - Favicon and metadata
- `public/manifest.json` - PWA icons
- Next.js will automatically serve files from `/public`

---

**Note**: The app will work without these images, but they enhance the user experience and enable PWA features.
