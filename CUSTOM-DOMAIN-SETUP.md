# 🌐 How to Switch to Custom Domain: fortunecaster.xyz

## 🎯 **Current Status:**
- ✅ **Live App:** https://fortune-caster-six.vercel.app/
- 🎯 **Target Domain:** https://fortunecaster.xyz/

---

## 📋 **Step-by-Step Guide:**

### **Step 1: Add Domain in Vercel (5 minutes)**

#### **1.1 Go to Vercel Project Settings:**
1. Visit: https://vercel.com/dashboard
2. Click on your **"fortune-caster"** project
3. Click **"Settings"** tab (top menu)
4. Click **"Domains"** in the left sidebar

#### **1.2 Add Your Custom Domain:**
1. In the domain input field, type: `fortunecaster.xyz`
2. Click **"Add"**
3. Also add with `www`: `www.fortunecaster.xyz`
4. Click **"Add"** again

Vercel will now show you DNS records you need to add.

---

### **Step 2: Configure DNS Records (10 minutes)**

Vercel will show you something like this:

#### **For Root Domain (fortunecaster.xyz):**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: Auto
```

#### **For WWW Subdomain (www.fortunecaster.xyz):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Auto
```

#### **2.1 Go to Your Domain Registrar:**
This is where you bought `fortunecaster.xyz`. Common registrars:
- **Namecheap** → https://namecheap.com (manage domains)
- **GoDaddy** → https://godaddy.com/domains
- **Cloudflare** → https://dash.cloudflare.com
- **Google Domains** → https://domains.google.com
- **Name.com** → https://name.com

#### **2.2 Add DNS Records:**

**Find DNS Settings:**
- Look for: "DNS Management", "DNS Settings", "Nameservers", or "DNS Records"

**Add Record #1 (Root Domain):**
```
Type: A
Host/Name: @ (or leave blank, or "fortunecaster.xyz")
Value/Points to: 76.76.21.21
TTL: Automatic (or 3600)
```

**Add Record #2 (WWW Subdomain):**
```
Type: CNAME
Host/Name: www
Value/Points to: cname.vercel-dns.com
TTL: Automatic (or 3600)
```

**Important:**
- Remove any existing A or CNAME records for the same host
- Make sure there are no conflicting records

#### **2.3 Save Changes:**
Click "Save" or "Update" in your domain registrar.

---

### **Step 3: Wait for DNS Propagation (5-60 minutes)**

#### **3.1 DNS Takes Time:**
- **Usually:** 5-15 minutes
- **Sometimes:** Up to 48 hours (rare)
- **Average:** 30-60 minutes

#### **3.2 Check DNS Propagation:**
Visit: https://dnschecker.org/

1. Enter: `fortunecaster.xyz`
2. Select "A" record type
3. Click "Search"
4. Should show `76.76.21.21` globally

Do the same for `www.fortunecaster.xyz` (CNAME type).

---

### **Step 4: Verify in Vercel (2 minutes)**

#### **4.1 Back to Vercel:**
1. Go to: https://vercel.com/dashboard
2. Click your project → **Settings** → **Domains**

#### **4.2 Check Status:**
You should see:
- ✅ `fortunecaster.xyz` - **Valid Configuration**
- ✅ `www.fortunecaster.xyz` - **Valid Configuration**

If you see:
- ⏳ "Pending" - Wait for DNS propagation
- ❌ "Invalid Configuration" - Double-check DNS records

---

### **Step 5: Set Primary Domain (1 minute)**

#### **5.1 Choose Primary:**
In Vercel Domains settings:
1. Find `fortunecaster.xyz` in the list
2. Click the **three dots (...)** menu
3. Click **"Set as Primary Domain"**

Now all traffic redirects to `https://fortunecaster.xyz`!

---

## ✅ **Verification Checklist:**

After DNS propagates, verify everything works:

- [ ] Visit `https://fortunecaster.xyz` - Should load your app
- [ ] Visit `http://fortunecaster.xyz` - Should redirect to HTTPS
- [ ] Visit `https://www.fortunecaster.xyz` - Should work
- [ ] Visit `https://fortune-caster-six.vercel.app` - Should redirect to custom domain
- [ ] Test fortune drawing - Should work
- [ ] Test wallet connection - Should work
- [ ] Test NFT minting - Should work
- [ ] Check manifest: `https://fortunecaster.xyz/.well-known/farcaster.json`

---

## 🔧 **Common Issues & Solutions:**

### **Issue 1: "Invalid Configuration" in Vercel**
**Solution:**
- Wait longer (DNS can take up to 48 hours)
- Double-check DNS records match exactly
- Make sure no conflicting records exist
- Try removing and re-adding the domain

### **Issue 2: DNS Not Propagating**
**Solution:**
- Check https://dnschecker.org/
- Clear your browser cache
- Try incognito/private mode
- Use different DNS: `8.8.8.8` (Google) or `1.1.1.1` (Cloudflare)

### **Issue 3: SSL Certificate Pending**
**Solution:**
- Vercel auto-generates SSL certificates
- Wait 10-15 minutes after DNS propagates
- Should show "Secure" automatically

### **Issue 4: WWW Subdomain Not Working**
**Solution:**
- Make sure CNAME record for `www` exists
- Value should be: `cname.vercel-dns.com`
- Wait for DNS propagation

---

## 📱 **Domain Registrar Quick Guides:**

### **Namecheap:**
1. Dashboard → Domain List
2. Click "Manage" next to your domain
3. Go to "Advanced DNS" tab
4. Click "Add New Record"
5. Add the A and CNAME records
6. Save changes

### **GoDaddy:**
1. My Products → Domains
2. Click domain name → DNS
3. Click "Add" under DNS Records
4. Add the A and CNAME records
5. Save

### **Cloudflare:**
1. Select your domain
2. Click "DNS" tab
3. Click "Add record"
4. Add the A and CNAME records
5. Orange cloud = ON (proxied)
6. Save

### **Google Domains:**
1. My Domains → Manage
2. Click "DNS" in left sidebar
3. Scroll to "Custom resource records"
4. Add the A and CNAME records
5. Save

---

## 🎯 **After Domain is Live:**

### **Update Your Manifest:**
Your manifest already uses `fortunecaster.xyz`, so it's ready!

File: `public/.well-known/farcaster.json`
```json
{
  "miniapp": {
    "homeUrl": "https://fortunecaster.xyz",
    "iconUrl": "https://fortunecaster.xyz/icon-192.png",
    ...
  }
}
```

### **Update Links:**
All your links already use the custom domain:
- ✅ Manifest URLs
- ✅ Screenshot URLs  
- ✅ OG Image URLs
- ✅ Hero Image URLs

**You're all set!** 🎉

---

## 🚀 **Final Steps After Domain Works:**

### **1. Test Everything:**
```bash
# Test your domain
curl -I https://fortunecaster.xyz

# Test manifest
curl https://fortunecaster.xyz/.well-known/farcaster.json

# Should return 200 OK
```

### **2. Update Farcaster:**
When you generate your account association:
- Use domain: `fortunecaster.xyz` (exact match!)
- At: https://warpcast.com/~/developers/mini-apps/manifest

### **3. Share Your App:**
Now you can share:
- `https://fortunecaster.xyz` in Farcaster casts
- App will open within Farcaster
- Users can draw fortunes and mint NFTs
- You earn developer rewards!

---

## 📊 **Timeline:**

| Step | Time | What Happens |
|------|------|--------------|
| Add domain in Vercel | 2 min | Configure domain settings |
| Add DNS records | 5 min | Update domain registrar |
| DNS propagation | 5-60 min | DNS spreads globally |
| SSL certificate | 5-15 min | Auto-generated by Vercel |
| **Total** | **20-90 min** | **Domain fully working** |

---

## 🎉 **Success!**

Once your domain is live:
- ✅ `https://fortunecaster.xyz` loads your app
- ✅ HTTPS is automatic (SSL certificate)
- ✅ `www` subdomain works
- ✅ Old Vercel URL redirects automatically
- ✅ Ready for Farcaster Mini App publishing!

---

**Need help?** Check Vercel's official guide: https://vercel.com/docs/custom-domains

**Next:** Follow [QUICK-START-FARCASTER.md](QUICK-START-FARCASTER.md) to publish your Mini App!
