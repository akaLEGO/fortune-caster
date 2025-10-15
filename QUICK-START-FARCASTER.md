# 🚀 Quick Start - Farcaster Mini App Publishing

## ⚡ **What You Need to Do (3 Simple Steps):**

### **Step 1: Push to GitHub & Vercel (5 min)**

```bash
# Push your code
git push

# Vercel will auto-deploy in ~2 minutes
# Check: https://vercel.com/dashboard
```

**Wait for deployment to complete**, then verify:
- Visit: `https://fortune-caster-six.vercel.app/.well-known/farcaster.json`
- You should see your manifest JSON

---

### **Step 2: Generate Account Association (5 min)**

This verifies you own the app and makes you eligible for **Developer Rewards** 💰

1. **Go to:** https://warpcast.com/~/developers/mini-apps/manifest
2. **Sign in** with your Farcaster account
3. **Enter domain:** `fortune-caster-six.vercel.app` (MUST match exactly!)
4. **Click "Generate Account Association"**
5. **Copy the output** - it looks like:
   ```json
   {
     "accountAssociation": {
       "header": "eyJ...",
       "payload": "eyJ...",
       "signature": "MHg..."
     }
   }
   ```

6. **Add to your manifest:**
   - Open: `public/.well-known/farcaster.json`
   - Add the `accountAssociation` at the top
   - Commit and push:
     ```bash
     git add public/.well-known/farcaster.json
     git commit -m "Add Farcaster account verification"
     git push
     ```

---

### **Step 3: Create Screenshots (10 min)**

You need portrait screenshots at **1284 x 2778** pixels (iPhone size).

**Easy Way:**
1. Open your app on an iPhone: `https://fortune-caster-six.vercel.app`
2. Draw a fortune
3. Take screenshots of:
   - Home screen
   - Fortune result

**Or use Browser:**
1. Chrome DevTools → Device Toolbar
2. Select "iPhone 14 Pro" (428 x 926)
3. Screenshot and upscale to 1284 x 2778

**Upload:**
```bash
# Add screenshots to /public/
mv screenshot1.png public/
mv screenshot2.png public/

git add public/screenshot*.png
git commit -m "Add Farcaster screenshots"
git push
```

---

## ✅ **That's It! Your App is Published!**

### **What Happens Next:**

1. **Auto-Discovery** 🔍
   - Farcaster clients automatically find your app via the manifest
   - No manual submission needed!

2. **App Store Listing** 🏪
   - Your app appears in: https://warpcast.com/~/discover/apps
   - Under "Entertainment" category

3. **Developer Rewards** 💰
   - You earn rewards weekly based on:
     - App usage
     - Onchain transactions (NFT mints!)
   - Paid automatically to your Farcaster account

4. **User Experience** 🎯
   - Users share your link in Farcaster
   - App opens within Farcaster (not external browser)
   - Users draw fortunes and mint NFTs
   - Seamless in-app experience

---

## 🔗 **Important URLs:**

| What | URL |
|------|-----|
| **Your App** | https://fortune-caster-six.vercel.app |
| **Your Manifest** | https://fortune-caster-six.vercel.app/.well-known/farcaster.json |
| **Warpcast Tool** | https://warpcast.com/~/developers/mini-apps/manifest |
| **App Store** | https://warpcast.com/~/discover/apps |
| **Official Docs** | https://miniapps.farcaster.xyz/docs/guides/publishing |

---

## 📊 **Your Current Status:**

- ✅ Manifest file created
- ✅ Next.js configured to serve manifest
- ✅ NFT contract deployed on Base
- ✅ Web3 integration working
- ⏳ **TODO:** Generate account association
- ⏳ **TODO:** Create real screenshots
- ⏳ **TODO:** Push to production

---

## 🎯 **After Publishing:**

### **Test Your App:**
1. Share `https://fortune-caster-six.vercel.app` in a Farcaster cast
2. Click the link
3. Should open within Farcaster (not Safari/Chrome)

### **Promote Your App:**
- Share in Farcaster casts
- "Try my Fortune Caster Mini App! 🎋"
- "Draw your fortune and mint as NFT on Base"
- "Only $0.03 per NFT!"
- Link: https://fortune-caster-six.vercel.app

### **Track Success:**
- Monitor NFT mints
- Check developer rewards dashboard
- Gather user feedback

---

## 💡 **Pro Tips:**

1. **Use Hosted Manifests** (Optional but Recommended)
   - Update manifest without redeploying
   - Go to: https://farcaster.xyz/~/developers/mini-apps/manifest
   - Get hosted manifest ID
   - Add redirect in `next.config.js`

2. **Optimize for Discovery**
   - Use clear screenshots
   - Write compelling description
   - Choose accurate tags
   - Make hero image attractive

3. **Engage Users**
   - Respond to feedback
   - Share fortune results
   - Create engaging content
   - Build community

---

## 📝 **Checklist:**

- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Manifest accessible at `/.well-known/farcaster.json`
- [ ] Account association generated and added
- [ ] Screenshots created (1284 x 2778)
- [ ] Screenshots uploaded to `/public/`
- [ ] Tested in Warpcast
- [ ] App appears in Farcaster App Store
- [ ] 🎉 Start earning developer rewards!

---

**🎋 Your Fortune Caster Mini App is ready to go viral on Farcaster!** ✨

**Official Guide:** [FARCASTER-PUBLISHING-STEPS.md](FARCASTER-PUBLISHING-STEPS.md)
