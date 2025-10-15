# 🚀 Quick Deployment Commands

## Git Setup & GitHub

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit: Fortune Caster - Complete life readings with Web3 integration"

# Create repo on GitHub first: https://github.com/new
# Name: fortune-caster, Public, No README

# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/fortune-caster.git
git branch -M main
git push -u origin main
```

## Vercel Deployment

1. **Go to:** https://vercel.com
2. **Sign up with GitHub**
3. **Import `fortune-caster` repository**
4. **Deploy** (auto-configured for Next.js)
5. **Add domain:** `fortunecaster.xyz`

## DNS Configuration

Add these records at your domain registrar:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Farcaster Manifest

**Go to:** https://farcaster.xyz/~/developers/mini-apps/manifest

**Fill in:**
```
Domain: fortunecaster.xyz
Name: Fortune Caster
Description: Draw digital fortune sticks and get complete life guidance. Mint as NFT on Base.
Icon: https://fortunecaster.xyz/icon.svg
Required Chains: eip155:8453
```

## Images Needed

- ✅ `icon.svg` (Ready)
- 🔄 `og-image.png` (1200x630)
- 🔄 `screenshot1.png` (App in action)
- 🔄 `screenshot2.png` (Fortune result)
- 🔄 `screenshot3.png` (NFT minting)

**Generate:** Use `/public/generate-images.html`

---

**Total Time:** ~30 minutes
**Result:** Live app at `https://fortunecaster.xyz` 🎉
