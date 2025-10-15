# 🎋 Fortune Caster - Official Farcaster Mini App Publishing Guide

Based on the official [Farcaster Publishing Documentation](https://miniapps.farcaster.xyz/docs/guides/publishing)

---

## ✅ **What's Already Done:**

### **1. Domain Setup** ✅
- **Domain:** `fortunecaster.xyz` (or your Vercel domain)
- **HTTPS:** ✅ Enabled via Vercel
- **Status:** Ready for publishing

### **2. Manifest File** ✅
- **Location:** `/public/.well-known/farcaster.json`
- **URL:** `https://fortunecaster.xyz/.well-known/farcaster.json`
- **Content:** Fully configured with all required fields

### **3. Required Configuration** ✅
- **Name:** Fortune Caster
- **Icon:** 1024x1024px PNG at `/icon-192.png`
- **Home URL:** `https://fortunecaster.xyz`
- **Required Chains:** Base (eip155:8453)
- **Required Capabilities:** wallet.getEthereumProvider

---

## 🚀 **Step-by-Step Publishing Process:**

### **Step 1: Deploy & Verify Manifest (5 minutes)**

#### **1.1 Push to Production:**
```bash
# Already done! Your manifest is deployed
git add .
git commit -m "Add Farcaster manifest"
git push
```

#### **1.2 Wait for Vercel Deployment:**
- **Go to:** https://vercel.com/dashboard
- **Wait:** ~2 minutes for deployment
- **Status:** Should show "Ready"

#### **1.3 Verify Manifest is Accessible:**
- **Visit:** `https://fortunecaster.xyz/.well-known/farcaster.json`
- **Expected:** You should see the JSON manifest file
- **If 404:** Wait a few more minutes, Vercel might still be deploying

---

### **Step 2: Generate Account Association (10 minutes)**

According to the [official docs](https://miniapps.farcaster.xyz/docs/guides/publishing), you need to verify ownership by adding a cryptographically signed message.

#### **2.1 Use Warpcast Tool:**
1. **Go to:** https://warpcast.com/~/developers/mini-apps/manifest
2. **Sign in** with your Farcaster account (Warpcast)
3. **Enter your domain:** `fortunecaster.xyz` (exact match required!)
4. **Click "Generate Account Association"**

#### **2.2 Copy the Output:**
You'll receive something like:
```json
{
  "accountAssociation": {
    "header": "eyJmaWQiOjkxNTIsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgwMmVmNzkwRGQ3OTkzQTM1ZkQ4NDdDMDUzRURkQUU5NDBEMDU1NTk2In0",
    "payload": "eyJkb21haW4iOiJyZXdhcmRzLndhcnBjYXN0LmNvbSJ9",
    "signature": "MHgxMGQwZGU4ZGYwZDUwZTdmMGIxN2YxMTU2NDI1MjRmZTY0MTUyZGU4ZGU1MWU0MThiYjU4ZjVmZmQxYjRjNDBiNGVlZTRhNDcwNmVmNjhlMzQ0ZGQ5MDBkYmQyMmNlMmVlZGY5ZGQ0N2JlNWRmNzMwYzUxNjE4OWVjZDJjY2Y0MDFj"
  }
}
```

#### **2.3 Update Your Manifest:**
Add the `accountAssociation` to your `farcaster.json`:
```json
{
  "accountAssociation": {
    "header": "...",
    "payload": "...",
    "signature": "..."
  },
  "miniapp": {
    "version": "1",
    "name": "Fortune Caster",
    ...
  }
}
```

#### **2.4 Redeploy:**
```bash
git add public/.well-known/farcaster.json
git commit -m "Add Farcaster account verification"
git push
```

---

### **Step 3: Create Required Screenshots (15 minutes)**

According to the docs, you need **portrait screenshots at 1284 x 2778** (max 3).

#### **3.1 Take Real Screenshots:**

**Option A: Use Your Phone**
1. Open `https://fortunecaster.xyz` on iPhone
2. Draw a fortune
3. Take screenshots of:
   - Home screen with fortune stick
   - Fortune result with all 5 categories
   - NFT minting screen

**Option B: Use Browser DevTools**
1. Open Chrome DevTools (F12)
2. Click "Toggle device toolbar" (Ctrl+Shift+M)
3. Set dimensions: **428 x 926** (iPhone 14 Pro)
4. Take screenshots and upscale to 1284 x 2778

**Option C: Use Screenshot Tool**
- Use a tool like [Screely](https://www.screely.com/) or [Screenshot.rocks](https://screenshot.rocks/)

#### **3.2 Name and Upload:**
- **screenshot1.png** - Home/initial view
- **screenshot2.png** - Fortune result
- **screenshot3.png** (optional) - NFT minting

Upload to `/public/` folder.

---

### **Step 4: Optional - Use Hosted Manifests (Recommended!)**

Farcaster offers [hosted manifests](https://miniapps.farcaster.xyz/docs/guides/publishing#farcaster-hosted-manifests-now-public) which let you update your manifest without redeploying!

#### **4.1 Create Hosted Manifest:**
1. **Go to:** https://farcaster.xyz/~/developers/mini-apps/manifest
2. **Enter all your app details**
3. **You'll receive a hosted manifest ID** (e.g., `1234567890`)

#### **4.2 Setup Redirect in Next.js:**
Update your `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/.well-known/farcaster.json',
        destination: 'https://api.farcaster.xyz/miniapps/hosted-manifest/YOUR_ID_HERE',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
```

**Benefits:**
- ✅ Update manifest without redeploying
- ✅ Automatic validation
- ✅ Easy domain migration
- ✅ No need to manage JSON files

---

### **Step 5: Verify Everything Works**

#### **5.1 Check Manifest:**
```bash
curl https://fortunecaster.xyz/.well-known/farcaster.json
```
Should return your full manifest with `accountAssociation`.

#### **5.2 Test in Warpcast:**
1. Open Warpcast on your phone
2. Create a cast with your URL: `https://fortunecaster.xyz`
3. Click the link
4. App should open within Warpcast (not external browser)

---

### **Step 6: Discovery & App Store**

Once your manifest is live and verified:

#### **6.1 Your App is Published!**
- Mini Apps are automatically discovered via the manifest
- No manual submission needed
- Farcaster clients will index your app

#### **6.2 Get Featured:**
- Apps appear in Warpcast's App Store: https://warpcast.com/~/discover/apps
- Verified apps (with `accountAssociation`) get priority
- Popular apps get featured

#### **6.3 Earn Rewards:**
According to the [docs](https://miniapps.farcaster.xyz/docs/guides/publishing#verifying-ownership):
> ⚡ Verified Mini Apps are automatically eligible for Warpcast Developer Rewards that are paid out weekly based on usage and onchain transactions.

**Your NFT minting = Onchain transactions = Rewards!** 💰

---

## 📊 **Your Complete Manifest Structure:**

```json
{
  "accountAssociation": {
    "header": "... (get from Warpcast tool)",
    "payload": "... (get from Warpcast tool)",
    "signature": "... (get from Warpcast tool)"
  },
  "miniapp": {
    "version": "1",
    "name": "Fortune Caster",
    "iconUrl": "https://fortunecaster.xyz/icon-192.png",
    "homeUrl": "https://fortunecaster.xyz",
    "splashImageUrl": "https://fortunecaster.xyz/icon-192.png",
    "splashBackgroundColor": "#fef7f3",
    "subtitle": "Cast your fortune on-chain",
    "description": "Draw digital fortune sticks inspired by traditional Chinese divination. Get comprehensive guidance for career, relationships, health, business, and life. Mint as NFT on Base.",
    "screenshotUrls": [
      "https://fortunecaster.xyz/screenshot1.png",
      "https://fortunecaster.xyz/screenshot2.png"
    ],
    "primaryCategory": "entertainment",
    "tags": [
      "fortune",
      "divination",
      "nft",
      "base",
      "onchain"
    ],
    "heroImageUrl": "https://fortunecaster.xyz/og-image.png",
    "tagline": "求籤 · Digital fortune sticks",
    "ogTitle": "Fortune Caster - Cast Your Fortune",
    "ogDescription": "Draw digital fortune sticks and get complete life guidance. Mint your fortune as an NFT on Base.",
    "ogImageUrl": "https://fortunecaster.xyz/og-image.png",
    "requiredChains": [
      "eip155:8453"
    ],
    "requiredCapabilities": [
      "wallet.getEthereumProvider"
    ]
  }
}
```

---

## 🎯 **Next Actions (In Order):**

1. ✅ **Deploy the manifest** (already done, just push)
2. ⏳ **Generate account association** at https://warpcast.com/~/developers/mini-apps/manifest
3. ⏳ **Create real screenshots** (1284 x 2778)
4. ⏳ **Update manifest** with account association
5. ⏳ **Test in Warpcast** by sharing your URL
6. ✅ **App is live!** No manual submission needed

---

## 🎉 **Success Indicators:**

- ✅ Manifest accessible at `/.well-known/farcaster.json`
- ✅ Account association verified
- ✅ App opens in Warpcast (not external browser)
- ✅ App appears in Warpcast App Store
- ✅ Users can mint NFTs
- ✅ You earn developer rewards

---

## 💡 **Pro Tips:**

1. **Use Hosted Manifests** - Update without redeploying
2. **Verify Domain** - Must exactly match in Warpcast tool
3. **Test First** - Share with friends before promoting
4. **Track Metrics** - Monitor NFT mints and usage
5. **Earn Rewards** - More onchain transactions = more rewards

---

**🎋 Your Fortune Caster is ready to be discovered by the entire Farcaster network!** ✨

**Official Docs:** https://miniapps.farcaster.xyz/docs/guides/publishing
