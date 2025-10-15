# 🚀 Fortune NFT Contract - Remix IDE Deployment Guide

## 📋 What You Need

### ✅ **Requirements:**
- [Remix IDE](https://remix.ethereum.org/) (free, browser-based)
- MetaMask wallet with some ETH on Base network
- Base network added to MetaMask

### 💰 **Costs:**
- **Deployment:** ~$5-15 (gas fees)
- **Each NFT mint:** ~$0.50-2 (gas fees)
- **Contract verification:** Free

---

## 🔧 STEP 1: Prepare Contract

### 1.1 Open Remix IDE
1. Go to: https://remix.ethereum.org/
2. Create new workspace: "Fortune-NFT"

### 1.2 Create Contract File
1. Create folder: `contracts`
2. Create file: `FortuneNFT.sol`
3. Copy the contract code (see below)

### 1.3 Install Dependencies
In Remix, go to **File Manager** → **Dependencies** and add:
```
@openzeppelin/contracts@4.9.3
```

---

## 📄 STEP 2: Contract Code

**File: `contracts/FortuneNFT.sol`**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FortuneNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;
    
    // Fortune metadata structure
    struct FortuneData {
        uint256 fortuneNumber;
        string title;
        string fortune;
        string poem;
        string careerMeaning;
        string relationshipsMeaning;
        string healthMeaning;
        string businessMeaning;
        string generalMeaning;
        uint256 timestamp;
    }
    
    // Mapping from token ID to fortune data
    mapping(uint256 => FortuneData) public fortunes;
    
    // Base URI for metadata
    string private _baseTokenURI;
    
    // Minting price (in wei)
    uint256 public mintPrice = 0.001 ether; // 0.001 ETH on Base
    
    // Maximum supply (optional)
    uint256 public maxSupply = 10000;
    
    // Events
    event FortuneMinted(
        uint256 indexed tokenId,
        address indexed owner,
        uint256 fortuneNumber,
        string title
    );
    
    constructor() ERC721("Fortune Caster NFT", "FORTUNE") Ownable(msg.sender) {}
    
    // Mint a fortune NFT
    function mintFortune(
        uint256 _fortuneNumber,
        string memory _title,
        string memory _fortune,
        string memory _poem,
        string memory _careerMeaning,
        string memory _relationshipsMeaning,
        string memory _healthMeaning,
        string memory _businessMeaning,
        string memory _generalMeaning
    ) public payable {
        require(msg.value >= mintPrice, "Insufficient payment");
        require(_tokenIds.current() < maxSupply, "Max supply reached");
        require(_fortuneNumber >= 1 && _fortuneNumber <= 12, "Invalid fortune number");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        fortunes[newTokenId] = FortuneData({
            fortuneNumber: _fortuneNumber,
            title: _title,
            fortune: _fortune,
            poem: _poem,
            careerMeaning: _careerMeaning,
            relationshipsMeaning: _relationshipsMeaning,
            healthMeaning: _healthMeaning,
            businessMeaning: _businessMeaning,
            generalMeaning: _generalMeaning,
            timestamp: block.timestamp
        });
        
        _safeMint(msg.sender, newTokenId);
        
        emit FortuneMinted(newTokenId, msg.sender, _fortuneNumber, _title);
    }
    
    // Get fortune data for a token
    function getFortuneData(uint256 tokenId) public view returns (FortuneData memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return fortunes[tokenId];
    }
    
    // Set minting price (owner only)
    function setMintPrice(uint256 _newPrice) public onlyOwner {
        mintPrice = _newPrice;
    }
    
    // Set max supply (owner only)
    function setMaxSupply(uint256 _newMaxSupply) public onlyOwner {
        maxSupply = _newMaxSupply;
    }
    
    // Set base URI for metadata (owner only)
    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }
    
    // Get current token ID counter
    function getCurrentTokenId() public view returns (uint256) {
        return _tokenIds.current();
    }
    
    // Get total supply
    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }
    
    // Withdraw contract balance (owner only)
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }
    
    // Override _baseURI
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
    
    // Override tokenURI to return JSON metadata
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        
        FortuneData memory fortune = fortunes[tokenId];
        
        // Create JSON metadata
        string memory json = string(abi.encodePacked(
            '{"name": "',
            fortune.title,
            '", "description": "',
            fortune.poem,
            '", "attributes": [',
            '{"trait_type": "Fortune Number", "value": ',
            _toString(fortune.fortuneNumber),
            '}, {"trait_type": "Fortune Level", "value": "',
            fortune.fortune,
            '"}, {"trait_type": "Mint Date", "value": ',
            _toString(fortune.timestamp),
            '}], "image": "',
            _baseTokenURI,
            'fortune-',
            _toString(fortune.fortuneNumber),
            '.png"}'
        ));
        
        return string(abi.encodePacked(
            "data:application/json;base64,",
            _base64Encode(bytes(json))
        ));
    }
    
    // Helper function to convert uint to string
    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
    
    // Helper function for base64 encoding
    function _base64Encode(bytes memory data) internal pure returns (string memory) {
        if (data.length == 0) return "";
        
        string memory table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        
        string memory result = new string(4 * ((data.length + 2) / 3));
        
        assembly {
            let tablePtr := add(table, 1)
            let resultPtr := add(result, 32)
            
            for {
                let i := 0
            } lt(i, mload(data)) {
                i := add(i, 3)
            } {
                let input := and(mload(add(data, add(32, i))), 0xffffff)
                
                let out := mload(add(tablePtr, and(shr(250, input), 0x3F)))
                out := shl(8, out)
                out := add(out, and(mload(add(tablePtr, and(shr(244, input), 0x3F))), 0xFF))
                out := shl(8, out)
                out := add(out, and(mload(add(tablePtr, and(shr(238, input), 0x3F))), 0xFF))
                out := shl(8, out)
                out := add(out, and(mload(add(tablePtr, and(shr(232, input), 0x3F))), 0xFF))
                out := shl(224, out)
                
                mstore(resultPtr, out)
                
                resultPtr := add(resultPtr, 4)
            }
            
            switch mod(mload(data), 3)
            case 1 {
                mstore(sub(resultPtr, 2), shl(240, 0x3d3d))
            }
            case 2 {
                mstore(sub(resultPtr, 1), shl(248, 0x3d))
            }
        }
        
        return result;
    }
}
```

---

## 🚀 STEP 3: Deploy Contract

### 3.1 Compile Contract
1. Go to **Solidity Compiler** tab
2. Select compiler version: `0.8.20`
3. Click **Compile FortuneNFT.sol**
4. ✅ Should show green checkmark

### 3.2 Prepare MetaMask
1. **Switch to Base Mainnet** in MetaMask
2. **Add some ETH** (you can bridge from Ethereum or buy on exchange)
3. **Get Base ETH** for gas fees (~$10-20 worth)

### 3.3 Deploy Contract
1. Go to **Deploy & Run Transactions** tab
2. **Environment:** Injected Provider - MetaMask
3. **Contract:** FortuneNFT
4. **Click Deploy**
5. **Confirm in MetaMask**

### 3.4 Save Contract Address
After deployment, save your contract address! You'll need it for the frontend.

---

## 🔗 STEP 4: Update Frontend

### 4.1 Update FortuneCaster.tsx
Replace the demo minting function with real contract interaction:

```typescript
// Add this near the top of your component
const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE"; // Replace with actual address
const CONTRACT_ABI = [
  // Contract ABI will be provided after deployment
];

const mintNFT = async () => {
  if (!walletAddress) {
    setWalletError('Please connect your wallet first!');
    return;
  }

  if (!selectedStick) {
    alert('Please draw a fortune first!');
    return;
  }

  setIsMinting(true);
  setWalletError(null);

  try {
    const ethereum = (window as any).ethereum;
    const contract = new (window as any).ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      new (window as any).ethers.providers.Web3Provider(ethereum).getSigner()
    );

    // Calculate mint price (0.001 ETH)
    const mintPrice = (window as any).ethers.utils.parseEther("0.001");

    const tx = await contract.mintFortune(
      selectedStick.number,
      selectedStick.title,
      selectedStick.fortune,
      selectedStick.poem,
      selectedStick.meanings.career,
      selectedStick.meanings.relationships,
      selectedStick.meanings.health,
      selectedStick.meanings.business,
      selectedStick.meanings.general,
      { value: mintPrice }
    );

    // Wait for transaction confirmation
    await tx.wait();
    
    setMintSuccess(true);
    setTimeout(() => setMintSuccess(false), 10000);
    
  } catch (error: any) {
    console.error('Error minting NFT:', error);
    if (error.code === 4001) {
      setWalletError('Transaction rejected by user');
    } else if (error.code === 'INSUFFICIENT_FUNDS') {
      setWalletError('Insufficient funds for minting');
    } else {
      setWalletError('Failed to mint NFT. Please try again.');
    }
  } finally {
    setIsMinting(false);
  }
};
```

### 4.2 Add Ethers.js Dependency
```bash
npm install ethers
```

---

## ✅ STEP 5: Verification (Optional but Recommended)

### 5.1 Verify Contract on Basescan
1. Go to **Basescan.org**
2. Find your contract address
3. Click **Contract** → **Verify and Publish**
4. **Contract Name:** FortuneNFT
5. **Compiler Version:** v0.8.19
6. **License:** MIT
7. **Constructor Arguments:** (leave empty)
8. **Upload contract code** and verify

---

## 🎯 STEP 6: Test Your Contract

### 6.1 Test Minting
1. **Connect wallet** to your app
2. **Draw a fortune**
3. **Click "Mint as NFT"**
4. **Pay gas fees** (~$0.50-2)
5. **Check Basescan** for your transaction

### 6.2 Check NFT
1. Go to **OpenSea** or **Basescan**
2. **Search your contract address**
3. **View your minted NFT**

---

## 💡 Tips for Success

### ✅ **Before Deployment:**
- Test on Base Sepolia testnet first (free)
- Make sure you have enough ETH for gas
- Double-check contract code

### ✅ **After Deployment:**
- Save contract address and ABI
- Test minting function
- Set up metadata images
- Monitor gas fees

### ✅ **Gas Optimization:**
- Base network has very low gas fees (~$0.50-2 per transaction)
- Much cheaper than Ethereum mainnet

---

## 🆘 Troubleshooting

### **Compilation Errors:**
- Check OpenZeppelin version compatibility
- Ensure Solidity version matches (0.8.19)

### **Deployment Errors:**
- Check MetaMask network (must be Base)
- Ensure sufficient ETH for gas
- Try increasing gas limit

### **Minting Errors:**
- Verify contract address is correct
- Check if user has enough ETH
- Ensure fortune is selected

---

**🎉 Once deployed, your Fortune Caster will have real NFT minting!** 🎋✨
