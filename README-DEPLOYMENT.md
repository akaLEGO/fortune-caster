# 🚀 Fortune Caster - Deployment Guide

Complete step-by-step guide to deploy your Fortune Caster app to production.

## 📋 Prerequisites

- ✅ Fortune Caster app completed
- ✅ GitHub account
- ✅ Domain: `fortunecaster.xyz` (or your preferred domain)
- ✅ Farcaster account (Warpcast)

---

## 🔧 STEP 1: Initialize Git Repository

```bash
# Navigate to your project
cd /Users/thesleeper/Documents/fortune-caster

# Initialize git
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: Fortune Caster - Complete life readings with Web3 integration"

# Check status
git status
```

---

## 🌐 STEP 2: Create GitHub Repository

1. **Go to GitHub:** https://github.com/new
2. **Repository name:** `fortune-caster`
3. **Description:** `🎋 Interactive fortune stick app with Web3 integration. Draw fortune sticks, get complete life readings, and mint as NFTs on Base.`
4. **Visibility:** Public ✅
5. **Don't initialize** with README (we already have one)
6. **Click "Create repository"**

---

## 🔗 STEP 3: Connect Local Repository to GitHub

```bash
# Add remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/fortune-caster.git

# Rename default branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

---

## 🚀 STEP 4: Deploy to Vercel

### 4.1 Create Vercel Account
1. **Go to:** https://vercel.com
2. **Sign up/Login** using your GitHub account
3. **Authorize Vercel** to access your repositories

### 4.2 Import Project
1. **Click "Add New" → "Project"**
2. **Find and select** `fortune-caster` repository
3. **Click "Import"**

### 4.3 Configure Deployment
Vercel should auto-detect Next.js, but verify these settings:

```
✅ Framework Preset: Next.js
✅ Root Directory: ./
✅ Build Command: npm run build
✅ Output Directory: .next
✅ Install Command: npm install
```

### 4.4 Deploy
1. **Click "Deploy"**
2. **Wait 2-3 minutes** for first deployment
3. **Your app will be live** at: `https://fortune-caster-xxx.vercel.app`

---

## 🌍 STEP 5: Add Custom Domain

### 5.1 Add Domain in Vercel
1. **Go to your project** in Vercel dashboard
2. **Settings → Domains**
3. **Add domain:** `fortunecaster.xyz`
4. **Add www subdomain:** `www.fortunecaster.xyz`

### 5.2 Configure DNS Records
Vercel will show you DNS records to add. Go to your domain registrar and add:

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### 5.3 Verify DNS
1. **Check status:** https://dnschecker.org
2. **Enter:** `fortunecaster.xyz`
3. **Wait 5-60 minutes** for propagation
4. **Test:** Visit `https://fortunecaster.xyz`

---

## 📱 STEP 6: Create Farcaster Manifest

### 6.1 Access Farcaster Developer Portal
1. **Go to:** https://farcaster.xyz/~/developers/mini-apps/manifest
2. **Sign in** with your Farcaster account (Warpcast)
3. **Click "Create New Manifest"**

### 6.2 Fill Manifest Form

**Basic Information:**
```
Domain: fortunecaster.xyz
Name: Fortune Caster
Home URL: https://fortunecaster.xyz
```

**Display:**
```
Icon URL: https://fortunecaster.xyz/icon.svg
Splash Image URL: https://fortunecaster.xyz/og-image.png
Splash Background Color: #fef7f3
```

**Description:**
```
Subtitle: Cast your fortune on-chain
Description: Draw digital fortune sticks inspired by traditional Chinese divination. Get comprehensive guidance for career, relationships, health, business, and life. Each fortune covers all aspects of your life. Mint your fortune as an NFT on Base.
Tagline: 求籤 · Digital fortune sticks
```

**Category & Tags:**
```
Primary Category: entertainment
Tags: fortune, divination, nft, base, onchain, web3
```

**Open Graph:**
```
OG Title: Fortune Caster - Cast Your Fortune
OG Description: Draw digital fortune sticks and get complete life guidance. Mint as NFT on Base.
OG Image: https://fortunecaster.xyz/og-image.png
```

**Technical Requirements:**
```
Required Chains: eip155:8453
Required Capabilities: wallet.getEthereumProvider
```

### 6.3 Submit for Review
1. **Review all information**
2. **Click "Submit for Review"**
3. **Wait for approval** (usually 24-48 hours)

---

## 📸 STEP 7: Create Additional Images

You'll need these images for the Farcaster manifest:

### Required Images:
- `icon.svg` ✅ (Already created)
- `og-image.png` (1200x630) - Social sharing
- `screenshot1.png` - App screenshot
- `screenshot2.png` - Fortune result
- `screenshot3.png` - NFT minting
- `hero.png` (1200x630) - Hero image

### Generate Images:
1. **Open:** `/public/generate-images.html`
2. **Take screenshots** of your deployed app
3. **Create hero image** using the fortune sticks design
4. **Upload to your domain**

---

## ✅ STEP 8: Final Testing

### Test Checklist:
- [ ] App loads at `https://fortunecaster.xyz`
- [ ] Fortune sticks work properly
- [ ] Wallet connection works
- [ ] All 12 fortunes display correctly
- [ ] Responsive on mobile
- [ ] PWA features work
- [ ] Social sharing works
- [ ] Farcaster manifest approved

### Performance Check:
- [ ] Page load speed < 3 seconds
- [ ] Mobile-friendly
- [ ] SEO metadata correct
- [ ] Images optimized

---

## 🎯 Production Checklist

### Security:
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] No sensitive data in client code

### SEO:
- [ ] Meta tags complete
- [ ] Open Graph images
- [ ] Structured data
- [ ] Sitemap (optional)

### Analytics (Optional):
- [ ] Google Analytics
- [ ] Vercel Analytics
- [ ] Custom event tracking

---

## 🔧 Troubleshooting

### Common Issues:

**Domain not working:**
- Check DNS propagation: https://dnschecker.org
- Wait up to 24 hours for full propagation

**Build fails:**
- Check `package.json` dependencies
- Verify Node.js version compatibility
- Check build logs in Vercel dashboard

**Farcaster manifest rejected:**
- Ensure all required fields filled
- Verify images are accessible
- Check technical requirements

**Wallet connection issues:**
- Test on different browsers
- Verify Base network configuration
- Check console for errors

---

## 📞 Support

- **Vercel:** https://vercel.com/help
- **GitHub:** https://docs.github.com
- **Farcaster:** https://docs.farcaster.xyz
- **Next.js:** https://nextjs.org/docs

---

**🎉 Congratulations!** Your Fortune Caster app is now live and ready to help people discover their destiny! 🎋✨
