# 🎋 Fortune Caster

An interactive fortune stick (求籤) web application with Web3 integration. Draw fortune sticks, receive traditional Chinese-inspired fortunes, and mint them as NFTs on the Base network.

## ✨ Features

- **🎲 Fortune Stick Drawing**: Traditional fortune stick experience with beautiful animations
- **📜 12 Comprehensive Fortunes**: Each fortune provides guidance for ALL 5 life aspects
- **🌟 Complete Life Readings**: Every fortune includes:
  - 💼 **Career** - Job prospects, promotions, professional growth
  - 💕 **Relationships** - Love, marriage, family connections
  - 🏥 **Health** - Physical and mental wellbeing
  - 📈 **Business** - Ventures, investments, finances
  - 🧭 **General Life** - Overall direction and fortune
- **🎭 Multiple Fortune Levels**: From Supreme Fortune (大吉) to Difficult Fortune (下下籤)
- **💰 Web3 Integration**: Connect wallet (MetaMask) and switch to Base network
- **🖼️ NFT Minting**: Mint your fortune as an NFT (demo functionality included)
- **📱 Farcaster Sharing**: Share your fortune directly to Farcaster/Warpcast
- **🎨 Beautiful UI**: Modern design with color-coded categories and smooth animations
- **📱 Fully Responsive**: Optimized for both desktop and mobile devices
- **⚡ TypeScript**: Fully typed for better development experience

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed on your system
- npm or yarn package manager
- MetaMask or another Web3 wallet (for wallet features)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
fortune-caster/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles and Tailwind
├── components/
│   └── FortuneCaster.tsx   # Main fortune stick component
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── next.config.js          # Next.js configuration
```

## 🎮 How to Use

1. **Focus on Your Question**: Think about what guidance you seek
2. **Shake Fortune Sticks**: Click the button to draw your fortune
3. **Receive Complete Life Reading**: Read your fortune poem and comprehensive guidance for:
   - Career & Professional Life
   - Relationships & Love
   - Health & Wellbeing
   - Business & Finance
   - General Life Direction
4. **Connect Wallet** (Optional): Connect to mint your fortune as an NFT
5. **Share**: Share your fortune on Farcaster
6. **Draw Again**: Get another complete reading anytime

## 🎨 Complete Life Aspects (Every Fortune Includes All 5)

Each fortune provides specific, actionable guidance for:

- **💼 Career**: Job prospects, promotions, career changes, professional growth
- **💕 Relationships**: Love, romance, family, partnerships
- **🏥 Health**: Physical wellness, mental health, vitality, medical matters
- **📈 Business**: Ventures, investments, financial decisions, opportunities
- **🧭 General Life**: Overall direction, life balance, personal growth

## 📊 Fortune Levels

- **🌟 Supreme Fortune (大吉)** - Excellent
- **⭐ Excellent Fortune (上上籤)** - Very Good
- **✨ Great Fortune (上吉)** - Very Good  
- **💫 Good Fortune (中吉)** - Good
- **⚖️ Balanced Fortune (平籤/平)** - Neutral
- **📊 Fair Fortune (中平)** - Neutral
- **⚠️ Below Average (下平)** - Difficult
- **🌧️ Challenging Fortune (下籤)** - Difficult
- **⛈️ Difficult Fortune (下下籤)** - Challenging

## 🔗 Web3 Features

### Wallet Connection
- Connects to MetaMask or other Web3 wallets
- Automatically switches to Base network (Chain ID: 8453)
- Adds Base network if not already configured

### NFT Minting (Demo)
- Simulates minting process (2-second delay)
- In production, would:
  - Generate metadata with fortune details
  - Upload to IPFS
  - Call smart contract mint function
  - Wait for transaction confirmation

### Farcaster Sharing
- Pre-formatted messages with fortune details
- Direct link to Warpcast compose interface
- Includes fortune title and first line of poem

## 🛠️ Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library with hooks
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icon library
- **Web3/Ethereum** - Wallet connection (MetaMask)
- **Base Network** - L2 blockchain for NFTs

## 🔧 Customization

### Adding New Fortunes

Edit the `fortunes` array in `components/FortuneCaster.tsx`:

```typescript
{
  number: 99,
  title: "Your Title - English Translation",
  fortune: "Good", // Excellent, Very Good, Good, Neutral, Difficult, Challenging
  poem: "Your fortune poem here,\nLine by line,\nFour lines total,\nWith rhyme and rhythm.",
  meanings: {
    career: "Specific career guidance...",
    relationships: "Specific relationship guidance...",
    health: "Specific health guidance...",
    business: "Specific business guidance...",
    general: "Overall life guidance..."
  },
  color: "#HEX_COLOR"
}
```

**Note**: Every fortune MUST include all 5 life aspects (career, relationships, health, business, general) to provide a complete reading.

### Implementing Real NFT Minting

Replace the `mintNFT` function with actual smart contract interaction:

```typescript
// 1. Deploy ERC-721 contract on Base
// 2. Create IPFS upload function
// 3. Use ethers.js or viem to interact with contract
// 4. Handle transaction states and errors
```

## 📝 License

This project is open source and available for personal and commercial use.

## 🌟 Acknowledgments

Inspired by traditional Chinese fortune stick divination (求籤) practices found in temples across Asia.

Built with modern web technologies and Web3 integration.

## 🚀 Deployment

Ready to deploy? Follow the complete guide:

- **[📋 Full Deployment Guide](README-DEPLOYMENT.md)** - Step-by-step instructions
- **[⚡ Quick Commands](DEPLOY.md)** - Copy-paste deployment commands
- **[🖼️ Image Assets](public/README-images.md)** - Generate required images

### Quick Start:
```bash
git init
git add .
git commit -m "Initial commit: Fortune Caster"
# Create repo at https://github.com/new (name: fortune-caster)
git remote add origin https://github.com/YOUR_USERNAME/fortune-caster.git
git push -u origin main
```

Then deploy to [Vercel](https://vercel.com) and add your domain!

---

**✨ For entertainment purposes only ✨**

*Traditional fortune telling meets modern blockchain technology* 🎋

# fortune-caster
