# 🚀 Fortune NFT - Quick Deployment Checklist

## ⚡ Quick Start (5 minutes)

### ✅ **Step 1: Open Remix**
- Go to: https://remix.ethereum.org/
- Create workspace: "Fortune-NFT"

### ✅ **Step 2: Add Dependencies**
- File Manager → Dependencies → Add: `@openzeppelin/contracts@4.9.3`

### ✅ **Step 3: Create Contract**
- Create folder: `contracts`
- Create file: `contracts/FortuneNFT.sol`
- Copy contract code from `README-REMIX-DEPLOYMENT.md`

### ✅ **Step 4: Compile**
- Solidity Compiler → Version 0.8.20
- Click "Compile FortuneNFT.sol"
- ✅ Green checkmark = Success

### ✅ **Step 5: Deploy**
- Deploy & Run → Injected Provider (MetaMask)
- Switch MetaMask to **Base Mainnet**
- Click "Deploy"
- Confirm transaction (~$5-15 gas)

### ✅ **Step 6: Save Address**
- Copy contract address after deployment
- You'll need this for your frontend!

---

## 💰 Costs Breakdown

| Action | Cost | Notes |
|--------|------|-------|
| **Deploy Contract** | $5-15 | One-time gas fee |
| **Each NFT Mint** | $0.50-2 | Per fortune minted |
| **Contract Verification** | Free | Optional but recommended |

---

## 🔗 Network Details

### **Base Mainnet:**
- **Chain ID:** 8453
- **RPC URL:** https://mainnet.base.org
- **Block Explorer:** https://basescan.org
- **Gas Price:** Very low (~1 gwei)

### **Base Sepolia (Testnet):**
- **Chain ID:** 84532
- **RPC URL:** https://sepolia.base.org
- **Block Explorer:** https://sepolia.basescan.org
- **Gas:** Free test ETH

---

## 📋 Contract Features

### ✅ **What Your Contract Does:**
- Mints ERC721 NFTs for each fortune
- Stores fortune data on-chain
- Charges 0.001 ETH per mint
- Owner can withdraw funds
- Maximum supply: 10,000 NFTs

### ✅ **Contract Functions:**
- `mintFortune()` - Main minting function
- `getFortuneData()` - Read fortune details
- `setMintPrice()` - Change price (owner only)
- `withdraw()` - Withdraw funds (owner only)

---

## 🎯 After Deployment

### **1. Update Frontend:**
- Replace demo minting with real contract calls
- Add contract address and ABI
- Install ethers.js library

### **2. Test Minting:**
- Connect wallet to your app
- Draw a fortune
- Mint as NFT
- Check on Basescan/OpenSea

### **3. Optional Setup:**
- Verify contract on Basescan
- Set up metadata images
- Configure royalty settings

---

## 🆘 Common Issues

### **"Insufficient funds"**
- Add more ETH to your wallet
- Check you're on Base network

### **"Contract not found"**
- Verify contract address is correct
- Check contract is deployed on Base

### **"Transaction failed"**
- Increase gas limit
- Try again with higher gas price

---

**🎉 Ready to deploy? Follow the checklist above!** 🚀
