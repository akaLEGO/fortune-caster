# 🎋 Publish Fortune Caster to Farcaster - Step by Step

## ✅ **Everything is Ready! Follow These 3 Steps:**

---

## 📝 **STEP 1: Push to Production (5 minutes)**

### **1.1 Push Your Code:**
Open your terminal and run:
```bash
git push
```

### **1.2 Wait for Vercel Deployment:**
- Go to: https://vercel.com/dashboard
- Click on your **"fortune-caster"** project
- Wait for deployment to complete (~2 minutes)
- Look for ✅ **"Ready"** status

### **1.3 Verify Manifest is Live:**
Open this URL in your browser:
```
https://fortune-caster-six.vercel.app/.well-known/farcaster.json
```

**You should see:**
```json
{
  "miniapp": {
    "version": "1",
    "name": "Fortune Caster",
    "iconUrl": "https://fortune-caster-six.vercel.app/icon-192.png",
    "homeUrl": "https://fortune-caster-six.vercel.app",
    ...
  }
}
```

✅ **If you see this, proceed to Step 2!**

---

## 🔐 **STEP 2: Generate Account Association (5 minutes)**

This verifies you own the app and makes you eligible for **Developer Rewards** 💰

### **2.1 Go to Warpcast Tool:**
Click this link: https://warpcast.com/~/developers/mini-apps/manifest

### **2.2 Sign In:**
- Sign in with your **Farcaster account**
- Use Warpcast app or web

### **2.3 Enter Your Domain:**
In the form, enter EXACTLY:
```
fortune-caster-six.vercel.app
```
**Important:** 
- ❌ Don't include `https://`
- ❌ Don't include trailing `/`
- ✅ Just the domain: `fortune-caster-six.vercel.app`

### **2.4 Generate Association:**
- Click **"Generate Account Association"**
- Wait a few seconds

### **2.5 Copy the Output:**
You'll see something like:
```json
{
  "accountAssociation": {
    "header": "eyJmaWQiOjkxNTIsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgw...",
    "payload": "eyJkb21haW4iOiJmb3J0dW5lLWNhc3Rlci1zaXgudmVyY2VsLmFwcCJ9",
    "signature": "MHgxMGQwZGU4ZGYwZDUwZTdmMGIxN2YxMTU2NDI1MjRmZTY0MTUy..."
  }
}
```

**Copy everything** (the entire JSON object)

### **2.6 Update Your Manifest:**

1. **Open this file in your editor:**
   ```
   public/.well-known/farcaster.json
   ```

2. **Add the accountAssociation at the TOP:**
   ```json
   {
     "accountAssociation": {
       "header": "YOUR_COPIED_HEADER",
       "payload": "YOUR_COPIED_PAYLOAD",
       "signature": "YOUR_COPIED_SIGNATURE"
     },
     "miniapp": {
       "version": "1",
       "name": "Fortune Caster",
       ...
     }
   }
   ```

3. **Save the file**

### **2.7 Push Updated Manifest:**
```bash
git add public/.well-known/farcaster.json
git commit -m "Add Farcaster account verification"
git push
```

### **2.8 Wait for Deployment:**
- Go to Vercel dashboard
- Wait ~2 minutes for deployment
- Verify at: https://fortune-caster-six.vercel.app/.well-known/farcaster.json
- Should now include `accountAssociation`

✅ **Account verified! Proceed to Step 3!**

---

## 📸 **STEP 3: Create Screenshots (10 minutes)**

You need **portrait screenshots** at **1284 x 2778 pixels** (iPhone size).

### **Option A: Use Your iPhone (Easiest)**

1. **Open your app on iPhone:**
   ```
   https://fortune-caster-six.vercel.app
   ```

2. **Take Screenshots:**
   - **Screenshot 1:** Home screen (showing fortune stick container)
   - **Screenshot 2:** After drawing a fortune (showing all 5 life aspects)

3. **AirDrop to your Mac** or email to yourself

4. **Resize if needed:**
   - Use Preview (Mac) or online tool
   - Target size: **1284 x 2778** pixels
   - Portrait orientation

### **Option B: Use Chrome DevTools**

1. **Open Chrome:**
   ```
   https://fortune-caster-six.vercel.app
   ```

2. **Open DevTools:**
   - Press `F12` or `Cmd+Option+I`
   - Click **Toggle Device Toolbar** (or press `Cmd+Shift+M`)

3. **Select Device:**
   - Choose **"iPhone 14 Pro Max"**
   - Or set custom: **428 x 926** pixels

4. **Take Screenshots:**
   - Draw a fortune
   - Right-click → "Capture screenshot"
   - Take 2 screenshots (home + result)

5. **Resize Images:**
   - Use online tool: https://www.resizepixel.com/
   - Upload your screenshots
   - Resize to: **1284 x 2778** pixels
   - Download

### **Option C: Use Screenshot Generator**

1. **Open the generator:**
   ```
   https://fortune-caster-six.vercel.app/generate-screenshots.html
   ```

2. **Right-click on the previews**
3. **Save as screenshot1.png and screenshot2.png**

### **3.1 Upload Screenshots:**

1. **Rename your files:**
   - `screenshot1.png` (home screen)
   - `screenshot2.png` (fortune result)

2. **Move to public folder:**
   ```bash
   mv ~/Downloads/screenshot1.png public/
   mv ~/Downloads/screenshot2.png public/
   ```

3. **Commit and push:**
   ```bash
   git add public/screenshot*.png
   git commit -m "Add Farcaster Mini App screenshots"
   git push
   ```

4. **Wait for deployment** (~2 minutes)

5. **Verify screenshots are live:**
   - https://fortune-caster-six.vercel.app/screenshot1.png
   - https://fortune-caster-six.vercel.app/screenshot2.png

✅ **Screenshots uploaded! You're published!**

---

## 🎉 **YOU'RE PUBLISHED! What Happens Next:**

### **Auto-Discovery:**
- Farcaster clients automatically discover your app via the manifest
- **No manual submission needed!**
- Your app will appear in: https://warpcast.com/~/discover/apps

### **Timeline:**
- **Immediately:** Your manifest is live and discoverable
- **Within 24 hours:** App appears in Farcaster App Store
- **Within 48 hours:** Full indexing and search enabled

### **How Users Find You:**
1. **App Store:** Browse "Entertainment" category
2. **Search:** Search for "fortune" or "fortune caster"
3. **Direct Links:** You share your link in casts
4. **Recommendations:** Algorithm suggests based on interests

---

## 🧪 **Test Your Mini App:**

### **Test 1: Direct Link**
1. Open **Warpcast** on your phone
2. Create a new cast
3. Paste: `https://fortune-caster-six.vercel.app`
4. **Post the cast**
5. **Click the link** in your cast

**Expected:** App should open **within Warpcast** (not Safari/Chrome)

### **Test 2: Full User Journey**
1. Open app within Warpcast
2. Click to draw a fortune
3. View fortune result (all 5 life aspects)
4. Connect MetaMask wallet
5. Mint NFT on Base (~$0.03)
6. Share result back to Farcaster

### **Test 3: Manifest Validation**
Visit: https://fortune-caster-six.vercel.app/.well-known/farcaster.json

Should show:
- ✅ `accountAssociation` (your FID and signature)
- ✅ `miniapp` configuration
- ✅ All required fields

---

## 📣 **Promote Your Mini App:**

### **Share in Farcaster:**
Here are some example casts you can post:

**Cast 1:**
```
🎋 Just launched Fortune Caster - my new Farcaster Mini App!

Draw digital fortune sticks inspired by traditional Chinese divination. Get guidance for Career, Relationships, Health, Business & Life.

Mint your fortune as an NFT on Base for just $0.03! ✨

https://fortune-caster-six.vercel.app
```

**Cast 2:**
```
求籤 · Cast your fortune! 🎋

I built a fortune-telling Mini App with NFT minting on Base.

12 unique fortunes, each covering ALL aspects of life:
💼 Career
💕 Relationships  
🏥 Health
📈 Business
🧭 General Life

Try it: https://fortune-caster-six.vercel.app
```

**Cast 3:**
```
Fortune telling meets Web3! 🎋✨

My new Mini App lets you:
- Draw digital fortune sticks
- Get comprehensive life guidance
- Mint your fortune as NFT (~$0.03)
- Share on Farcaster

https://fortune-caster-six.vercel.app
```

### **Engage Users:**
- Respond to people who try it
- Share interesting fortunes people draw
- Post about updates and new features
- Create engaging fortune-related content

---

## 💰 **Developer Rewards:**

You're now eligible for **Warpcast Developer Rewards**!

### **How It Works:**
- **Weekly payouts** based on app usage
- **Bonus for onchain transactions** (your NFT mints!)
- Paid automatically to your Farcaster account

### **Maximize Rewards:**
- Encourage users to mint NFTs (onchain = more rewards)
- Drive engagement with quality content
- Build community around fortune casting
- Share user testimonials

### **Track Performance:**
- Monitor NFT mints on BaseScan
- Check Farcaster analytics
- Gather user feedback
- Iterate and improve

---

## 📊 **Your Publishing Checklist:**

- [ ] **Step 1:** Code pushed to GitHub
- [ ] **Step 1:** Deployed on Vercel (fortune-caster-six.vercel.app)
- [ ] **Step 1:** Manifest accessible (/.well-known/farcaster.json)
- [ ] **Step 2:** Account association generated
- [ ] **Step 2:** Account association added to manifest
- [ ] **Step 2:** Updated manifest deployed
- [ ] **Step 3:** Screenshot 1 created (1284 x 2778)
- [ ] **Step 3:** Screenshot 2 created (1284 x 2778)
- [ ] **Step 3:** Screenshots uploaded to /public/
- [ ] **Step 3:** Screenshots deployed and accessible
- [ ] **Test:** App opens in Warpcast
- [ ] **Test:** Fortune drawing works
- [ ] **Test:** NFT minting works
- [ ] **Share:** Posted promotion casts
- [ ] 🎉 **PUBLISHED AND EARNING REWARDS!**

---

## 🔗 **Important Links:**

| What | URL |
|------|-----|
| **Your Live App** | https://fortune-caster-six.vercel.app |
| **Your Manifest** | https://fortune-caster-six.vercel.app/.well-known/farcaster.json |
| **Account Association Tool** | https://warpcast.com/~/developers/mini-apps/manifest |
| **Farcaster App Store** | https://warpcast.com/~/discover/apps |
| **Vercel Dashboard** | https://vercel.com/dashboard |
| **Official Docs** | https://miniapps.farcaster.xyz/docs/guides/publishing |
| **NFT Contract (Base)** | https://basescan.org/address/0x43e6713BE6c9E17f021ee503F93cd2023ef85Bc3 |

---

## ❓ **Need Help?**

### **Issue: Manifest not loading**
- Check Vercel deployment status
- Clear browser cache
- Wait a few more minutes for deployment

### **Issue: Account association fails**
- Make sure domain is EXACTLY: `fortune-caster-six.vercel.app`
- No `https://` or trailing `/`
- Try generating again

### **Issue: App not in App Store yet**
- Can take up to 24-48 hours to appear
- As long as manifest is live, you're discoverable
- Users can still access via direct link

### **Issue: Screenshots wrong size**
- Use online resizer: https://www.resizepixel.com/
- Target: 1284 x 2778 pixels
- Must be portrait orientation

---

## 🎋 **You're Ready to Launch!**

**Start with Step 1 and work your way through!**

Each step takes just a few minutes. Within an hour, your Fortune Caster will be:
- ✅ Live and discoverable on Farcaster
- ✅ Verified with your Farcaster account
- ✅ Earning developer rewards
- ✅ Ready for viral growth!

**Let's go! 🚀✨**
