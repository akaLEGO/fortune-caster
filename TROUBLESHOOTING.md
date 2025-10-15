# 🔧 NFT Minting Troubleshooting Guide

## 🎯 **"Mint as NFT" Button Not Working - Debug Steps**

### **Step 1: Check Prerequisites**

Before clicking "Mint as NFT", make sure:

- ✅ **Wallet Connected** - You should see your wallet address in the top right
- ✅ **On Base Network** - Should show "Base" next to your address
- ✅ **Fortune Drawn** - You must draw a fortune first (shake the container)
- ✅ **Fortune Displayed** - The fortune result should be visible

### **Step 2: Open Browser Console**

1. **Press F12** or **Right-click → Inspect**
2. **Go to Console tab**
3. **Click "Mint as NFT"**
4. **Look for these messages:**

```
🎯 mintNFT function called
Wallet address: 0x...
Selected stick: {...}
✅ Starting minting process...
```

### **Step 3: Common Issues & Solutions**

#### **❌ Issue 1: "Please connect your wallet first!"**
**Solution:**
- Click "Connect MetaMask" button
- Approve connection in MetaMask popup
- Make sure you're on Base network

#### **❌ Issue 2: "Please draw a fortune first!"**
**Solution:**
- Click the fortune stick container to shake it
- Wait for fortune to appear
- Then try minting

#### **❌ Issue 3: "MetaMask not found"**
**Solution:**
- Install MetaMask browser extension
- Refresh the page
- Make sure MetaMask is unlocked

#### **❌ Issue 4: "Insufficient funds"**
**Solution:**
- Add ETH to your wallet (need ~$0.30 total)
- Make sure you're on Base network
- Bridge ETH from Ethereum if needed

#### **❌ Issue 5: "Transaction rejected by user"**
**Solution:**
- Don't click "Reject" in MetaMask popup
- Click "Confirm" to approve the transaction
- Wait for transaction to process

#### **❌ Issue 6: Console shows errors**
**Solution:**
- Check if you're on Base network (Chain ID: 8453)
- Refresh the page and try again
- Clear browser cache

### **Step 4: Network Requirements**

**Required Network:** Base Mainnet
- **Chain ID:** 8453
- **RPC URL:** https://mainnet.base.org
- **Currency:** ETH
- **Block Explorer:** https://basescan.org

### **Step 5: Cost Requirements**

**Total Cost:** ~$0.28
- **Mint Price:** 0.00001 ETH (~$0.025)
- **Gas Fees:** ~0.0001 ETH (~$0.25)

### **Step 6: Debug Checklist**

- [ ] Wallet connected and showing address
- [ ] On Base network (not Ethereum)
- [ ] Fortune has been drawn and displayed
- [ ] Have enough ETH for minting + gas
- [ ] MetaMask is unlocked
- [ ] Browser console shows no errors
- [ ] Clicking button shows debug messages

### **Step 7: Still Not Working?**

**Check these:**

1. **Browser Compatibility:**
   - Use Chrome, Firefox, or Edge
   - Make sure JavaScript is enabled

2. **MetaMask Version:**
   - Update to latest version
   - Try refreshing the page

3. **Network Issues:**
   - Try switching to Ethereum and back to Base
   - Check if Base network is properly added

4. **Contract Issues:**
   - Make sure contract is deployed
   - Check if contract address is correct

### **Step 8: Get Help**

**If still not working, provide:**

1. **Console logs** (copy all messages)
2. **Browser** (Chrome, Firefox, etc.)
3. **MetaMask version**
4. **Network** (Base Mainnet?)
5. **Error messages** shown on screen

---

## 🚀 **Quick Test Steps:**

1. **Refresh page**
2. **Connect MetaMask**
3. **Switch to Base network**
4. **Draw a fortune**
5. **Open console (F12)**
6. **Click "Mint as NFT"**
7. **Watch console messages**
8. **Check for error messages**

**The debugging version will show exactly where the process fails!** 🔍
