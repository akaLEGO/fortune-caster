# 🚀 Quick Price Update - Step by Step

## ⚡ **5-Minute Update Process**

### **Step 1: Open Remix IDE**
1. Go to: https://remix.ethereum.org/
2. Make sure you're connected to the same wallet that deployed the contract

### **Step 2: Load Your Contract**
1. Go to **Deploy & Run Transactions** tab
2. **Environment:** Injected Provider - MetaMask
3. **At Address:** Enter `0xBA37780a9C4810aDC99E310ee05F4f1FBf0f5f39`
4. **ABI:** Paste the ABI you provided earlier
5. **Click "At Address"**

### **Step 3: Update Price**
1. **Find the `setMintPrice` function**
2. **Enter new price:** `10000000000000` (this is 0.00001 ETH in wei)
3. **Click "Write"**
4. **Confirm transaction in MetaMask**
5. **Wait for confirmation** (~30 seconds)

### **Step 4: Verify Price Change**
1. **Call `mintPrice` function** (read function)
2. **Should return:** `10000000000000`
3. **This equals:** 0.00001 ETH

---

## 💰 **New Cost Breakdown:**

| Item | Cost | USD (ETH ~$2500) |
|------|------|------------------|
| **Mint Price** | 0.00001 ETH | ~$0.025 |
| **Gas Fees** | ~0.0001 ETH | ~$0.25 |
| **Total** | ~0.00011 ETH | **~$0.28** |

**Perfect! Under $0.05 as requested!** 🎉

---

## 🔧 **After Price Update:**

1. **Update frontend** (already done - shows "~$0.03")
2. **Test minting** with new price
3. **Users will pay only ~$0.28 total!**

---

## 📋 **Quick Reference:**

- **Contract Address:** `0xBA37780a9C4810aDC99E310ee05F4f1FBf0f5f39`
- **New Price in Wei:** `10000000000000`
- **New Price in ETH:** `0.00001`
- **Total User Cost:** ~$0.28

**Ready to update? Follow the steps above!** 🚀
