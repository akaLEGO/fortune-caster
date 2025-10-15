# 🔍 Manifest Verification - Use Vercel Domain

## ❌ **The Problem:**
- `fortunecaster.xyz` is not working (connection timeout)
- You need to use your **working Vercel domain**

## ✅ **Solution: Use Your Vercel Domain**

### **Your Working Domain:**
```
https://fortune-caster-six.vercel.app
```

### **Your Manifest URL:**
```
https://fortune-caster-six.vercel.app/.well-known/farcaster.json
```

---

## 🔍 **Step-by-Step Verification:**

### **Step 1: Check if Manifest is Live**

Open this URL in your browser:
```
https://fortune-caster-six.vercel.app/.well-known/farcaster.json
```

**Expected Result:**
```json
{
  "miniapp": {
    "version": "1",
    "name": "Fortune Caster",
    "iconUrl": "https://fortune-caster-six.vercel.app/icon-192.png",
    "homeUrl": "https://fortune-caster-six.vercel.app",
    "splashImageUrl": "https://fortune-caster-six.vercel.app/icon-192.png",
    "splashBackgroundColor": "#fef7f3",
    "subtitle": "Cast your fortune on-chain",
    "description": "Draw digital fortune sticks inspired by traditional Chinese divination. Get comprehensive guidance for career, relationships, health, business, and life. Mint as NFT on Base.",
    "screenshotUrls": [
      "https://fortune-caster-six.vercel.app/screenshot1.png",
      "https://fortune-caster-six.vercel.app/screenshot2.png"
    ],
    "primaryCategory": "entertainment",
    "tags": [
      "fortune",
      "divination",
      "nft",
      "base",
      "onchain"
    ],
    "heroImageUrl": "https://fortune-caster-six.vercel.app/og-image.png",
    "tagline": "求籤 · Digital fortune sticks",
    "ogTitle": "Fortune Caster - Cast Your Fortune",
    "ogDescription": "Draw digital fortune sticks and get complete life guidance. Mint your fortune as an NFT on Base.",
    "ogImageUrl": "https://fortune-caster-six.vercel.app/og-image.png",
    "requiredChains": [
      "eip155:8453"
    ],
    "requiredCapabilities": [
      "wallet.getEthereumProvider"
    ]
  }
}
```

### **Step 2: If Manifest is NOT Live**

**Check Vercel Deployment:**
1. Go to: https://vercel.com/dashboard
2. Click your **"fortune-caster"** project
3. Check deployment status
4. If failed, redeploy:
   - Click **"Redeploy"** button
   - Or push code again:
     ```bash
     git push
     ```

**Check File Exists:**
1. Go to your project files
2. Verify this file exists: `public/.well-known/farcaster.json`
3. If missing, create it with the content above

### **Step 3: Generate Account Association**

**Use the CORRECT domain:**
1. Go to: https://warpcast.com/~/developers/mini-apps/manifest
2. **Enter domain:** `fortune-caster-six.vercel.app` (NOT fortunecaster.xyz)
3. Click **"Generate Account Association"**

**Important:** 
- ❌ Don't use: `fortunecaster.xyz`
- ✅ Use: `fortune-caster-six.vercel.app`

---

## 🔧 **Troubleshooting:**

### **Issue 1: Manifest Returns 404**

**Check Vercel Deployment:**
```bash
# Make sure your code is pushed
git status
git add .
git commit -m "Ensure manifest is deployed"
git push
```

**Wait 2-3 minutes, then check:**
```
https://fortune-caster-six.vercel.app/.well-known/farcaster.json
```

### **Issue 2: Manifest Shows Old Content**

**Force Redeploy:**
1. Go to Vercel dashboard
2. Click your project
3. Click **"Redeploy"**
4. Wait for completion
5. Check manifest again

### **Issue 3: Domain Mismatch in Account Association**

**Make Sure You Use:**
- Domain: `fortune-caster-six.vercel.app`
- NOT: `fortunecaster.xyz`
- NOT: `https://fortune-caster-six.vercel.app`
- NOT: `fortune-caster-six.vercel.app/`

**Just:** `fortune-caster-six.vercel.app`

---

## ✅ **Quick Test:**

### **Test 1: App Works**
```
https://fortune-caster-six.vercel.app
```
Should show your Fortune Caster app

### **Test 2: Manifest Works**
```
https://fortune-caster-six.vercel.app/.well-known/farcaster.json
```
Should show JSON manifest

### **Test 3: Images Work**
```
https://fortune-caster-six.vercel.app/icon-192.png
https://fortune-caster-six.vercel.app/og-image.png
```
Should show images

---

## 🎯 **Next Steps After Verification:**

Once manifest is working:

1. **Generate Account Association:**
   - Use domain: `fortune-caster-six.vercel.app`
   - Copy the output
   - Add to manifest
   - Push to production

2. **Create Screenshots:**
   - Take iPhone screenshots
   - Upload to `/public/`
   - Push to production

3. **Test in Farcaster:**
   - Share link in Warpcast
   - Click to open within app

---

## 🔗 **Your URLs:**

| What | Working URL |
|------|-------------|
| **Your App** | https://fortune-caster-six.vercel.app |
| **Your Manifest** | https://fortune-caster-six.vercel.app/.well-known/farcaster.json |
| **Account Tool** | https://warpcast.com/~/developers/mini-apps/manifest |
| **Vercel Dashboard** | https://vercel.com/dashboard |

---

**🎯 Try this URL now:** https://fortune-caster-six.vercel.app/.well-known/farcaster.json

Let me know what you see!
