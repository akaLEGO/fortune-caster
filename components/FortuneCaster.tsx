'use client'

import React, { useState, useEffect } from 'react'
import { Sparkles, RefreshCw, Wallet, Image, Share2, Briefcase, Heart, Activity, TrendingUp, Compass } from 'lucide-react'
import { ethers } from 'ethers'
import FarcasterIntegration, { useFarcaster } from './FarcasterIntegration'

interface Fortune {
  number: number
  title: string
  fortune: string
  poem: string
  meanings: {
    career: string
    relationships: string
    health: string
    business: string
    general: string
  }
  color: string
}

// Contract configuration
const CONTRACT_ADDRESS = "0x43e6713BE6c9E17f021ee503F93cd2023ef85Bc3"
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "uint256", "name": "_fortuneNumber", "type": "uint256"},
      {"internalType": "string", "name": "_title", "type": "string"},
      {"internalType": "string", "name": "_fortune", "type": "string"},
      {"internalType": "string", "name": "_poem", "type": "string"},
      {"internalType": "string", "name": "_careerMeaning", "type": "string"},
      {"internalType": "string", "name": "_relationshipsMeaning", "type": "string"},
      {"internalType": "string", "name": "_healthMeaning", "type": "string"},
      {"internalType": "string", "name": "_businessMeaning", "type": "string"},
      {"internalType": "string", "name": "_generalMeaning", "type": "string"}
    ],
    "name": "mintFortune",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mintPrice",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "getFortuneData",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256", "name": "fortuneNumber", "type": "uint256"},
          {"internalType": "string", "name": "title", "type": "string"},
          {"internalType": "string", "name": "fortune", "type": "string"},
          {"internalType": "string", "name": "poem", "type": "string"},
          {"internalType": "string", "name": "careerMeaning", "type": "string"},
          {"internalType": "string", "name": "relationshipsMeaning", "type": "string"},
          {"internalType": "string", "name": "healthMeaning", "type": "string"},
          {"internalType": "string", "name": "businessMeaning", "type": "string"},
          {"internalType": "string", "name": "generalMeaning", "type": "string"},
          {"internalType": "uint256", "name": "timestamp", "type": "uint256"}
        ],
        "internalType": "struct FortuneNFT.FortuneData",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export default function FortuneCaster() {
  const [isShaking, setIsShaking] = useState(false)
  const [selectedStick, setSelectedStick] = useState<Fortune | null>(null)
  const [showFortune, setShowFortune] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isMinting, setIsMinting] = useState(false)
  const [mintSuccess, setMintSuccess] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletError, setWalletError] = useState<string | null>(null)
  const [networkName, setNetworkName] = useState<string>('')
  
  // Farcaster integration
  const { isInFarcaster, user, shareToFarcaster } = useFarcaster()

  const fortunes: Fortune[] = [
    {
      number: 1,
      title: "大吉 - Supreme Fortune",
      fortune: "Excellent",
      poem: "Phoenix rises from the dawn,\nNew horizons to be drawn.\nSkills you've honed will shine so bright,\nSuccess arrives in golden light.",
      meanings: {
        career: "Outstanding prospects! Promotions and recognition are imminent. Your hard work is finally being noticed. Perfect time to ask for raises, pursue new opportunities, or launch that project you've been planning.",
        relationships: "Love flourishes in all forms. Singles will meet someone special, couples deepen their bond. Family harmony prevails. This is an ideal time for commitments, proposals, or resolving past conflicts.",
        health: "Peak vitality! Your energy is strong and recovery is swift. Excellent time to start new fitness routines or health programs. Both physical and mental wellbeing are in harmony.",
        business: "Golden opportunities abound! Perfect timing for launches, investments, and partnerships. Financial gains are likely. Your business instincts are particularly sharp - trust them and act boldly.",
        general: "Everything flows in your favor. This is your moment to shine! The universe supports your endeavors. Start new projects, take calculated risks, and pursue your dreams with confidence."
      },
      color: "#FF6B6B"
    },
    {
      number: 7,
      title: "上上籤 - Excellent Fortune",
      fortune: "Very Good",
      poem: "Golden light shines from above,\nBlessings flow like peaceful dove.\nPatience brings the harvest near,\nProsperous days throughout the year.",
      meanings: {
        career: "Recognition and advancement are coming. Your expertise is valued. Excellent time for networking and seeking mentorship. New learning opportunities will accelerate your growth.",
        relationships: "Harmony and understanding deepen. Perfect time for strengthening bonds and creating lasting memories. Communication flows effortlessly. Romance blooms for singles, couples rediscover passion.",
        health: "Strong vitality with minor improvements possible. Your body is resilient. Focus on preventive care and maintaining good habits. Energy levels are high and stable.",
        business: "Expansion plans will succeed. Good time for negotiations and new ventures. Customer satisfaction is high, and your reputation grows stronger. Profits increase steadily.",
        general: "Very fortunate period! Expect positive surprises and opportunities. Your efforts bear fruit across all life areas. Share your good fortune with others and practice gratitude."
      },
      color: "#4ECDC4"
    },
    {
      number: 13,
      title: "中吉 - Good Fortune",
      fortune: "Good",
      poem: "Mountain high and river wide,\nSteady steps with careful stride.\nOpportunities appear in time,\nGradual progress, steady climb.",
      meanings: {
        career: "Steady advancement through dedication. Success comes through adaptability and continuous learning. Your ability to learn quickly is your greatest asset. Focus on skill development.",
        relationships: "Solid foundations are being built. Take time to nurture connections through small gestures. Singles should remain open to new possibilities. Couples grow through shared experiences.",
        health: "Good overall health with room for improvement. Your body responds well to exercise and healthy habits. Mental clarity improves with physical activity. Maintain balanced routines.",
        business: "Moderate growth with stable returns. Good time to consolidate gains and build infrastructure. Focus on customer relationships rather than quick profits. Sustainable success is forming.",
        general: "Positive outlook with steady progress. Stay focused and patient. Opportunities will present themselves at the right time. Trust the process and maintain consistency."
      },
      color: "#FFE66D"
    },
    {
      number: 21,
      title: "平籤 - Balanced Fortune",
      fortune: "Neutral",
      poem: "Clouds may come and clouds may go,\nRiver flows both fast and slow.\nBalance found in middle way,\nPeace of mind will guide your day.",
      meanings: {
        career: "Stability without major changes. Focus on maintaining current position while preparing for future opportunities. Build skills quietly. Not the time for major moves, but for strategic preparation.",
        relationships: "Relationships require conscious effort and communication. Neither particularly good nor bad - balance is key. Open dialogue prevents misunderstandings. Work on maintaining mutual understanding.",
        health: "Health is stable but requires attention. Don't ignore minor symptoms. Maintain balanced lifestyle - neither push too hard nor be too sedentary. Regular sleep and nutrition are essential.",
        business: "Steady course without boom or bust. Maintain current operations. Not ideal for expansion but perfect for consolidation and efficiency improvements. Preserve capital wisely.",
        general: "Life proceeds normally without major ups or downs. Good time for routine maintenance in all areas. Not ideal for major changes but perfect for consolidating gains and planning ahead."
      },
      color: "#A8DADC"
    },
    {
      number: 28,
      title: "中平 - Fair Fortune",
      fortune: "Neutral",
      poem: "Seeds beneath the frozen ground,\nWaiting for the spring's sweet sound.\nWhat you plant with care today,\nBlooms when winter fades away.",
      meanings: {
        career: "Preparation phase. Focus on professional development and building relationships. Your current work lays groundwork for future success. Mistakes become valuable teachers.",
        relationships: "Nurturing period. Not the time for major commitments or breakups. Focus on small gestures of care and patience. Let things develop naturally without forcing outcomes.",
        health: "Mindful attention required. Not alarming but don't be complacent. Address stress levels and consider lifestyle modifications. Prevention is better than cure.",
        business: "Mixed results likely. Some deals succeed, others stall. Focus on building solid foundations and customer trust. Long-term thinking serves better than seeking quick wins.",
        general: "Mixed fortunes in various life areas. Some aspects improve while others need work. Focus on maintaining equilibrium. Practice gratitude while working toward goals."
      },
      color: "#F1A7DC"
    },
    {
      number: 42,
      title: "下籤 - Challenging Fortune",
      fortune: "Difficult",
      poem: "Stormy seas and rocky shore,\nCareful steps are needed more.\nSeek the wisdom of the wise,\nCaution helps you to survive.",
      meanings: {
        career: "Career challenges ahead. Avoid major decisions or job changes now. Focus on maintaining stability and documenting your work. Avoid office politics. This difficult period will pass.",
        relationships: "Challenges and misunderstandings likely. Arguments may arise. Avoid hasty decisions about breakups or commitments. Seek counseling if needed. Give each other space and practice patience.",
        health: "Health concerns need attention. Don't ignore symptoms or delay medical consultation. Prioritize rest and recovery. Avoid stress and overexertion. Proper care will restore wellness.",
        business: "Business challenges ahead. Avoid major investments or expansions. Focus on cash flow and existing clients. Cut unnecessary expenses. Seek expert advice and weather the storm.",
        general: "Challenging period in multiple areas. Don't lose hope - this is temporary. Focus on basics, seek support from loved ones, and avoid major life decisions. Better times are coming."
      },
      color: "#95E1D3"
    },
    {
      number: 8,
      title: "上吉 - Great Fortune",
      fortune: "Very Good",
      poem: "Mandarin ducks swim side by side,\nLove's sweet current is your guide.\nHarmony flows without strife,\nJoyful partnership in life.",
      meanings: {
        career: "Collaboration brings success. Teamwork and partnerships flourish. Your communication skills shine. Great time for joint projects and building professional alliances.",
        relationships: "Perfect harmony! Ideal time for proposals, moving in together, or resolving conflicts. Your bond strengthens significantly. Singles meet someone meaningful. Love flows naturally.",
        health: "Excellent vitality and balance. Body and mind are in harmony. Good time for holistic health practices. Recovery from any ailments is swift and complete.",
        business: "Partnerships and collaborations are especially favored. Joint ventures succeed. Clients and customers are satisfied. Excellent time for contracts and agreements.",
        general: "Everything aligns beautifully. Peace and prosperity in all areas. Your positive energy attracts good fortune. This is a time of joy and fulfillment."
      },
      color: "#FFB3DE"
    },
    {
      number: 15,
      title: "中吉 - Good Fortune",
      fortune: "Good",
      poem: "Bamboo bends but does not break,\nFlexibility for goodness' sake.\nAdapt to changes as they come,\nVictory is nearly won.",
      meanings: {
        career: "Adaptability is your superpower now. Being flexible and open to change brings advancement. Embrace new methods and technologies. Your versatility opens doors.",
        relationships: "Flexibility and understanding strengthen bonds. Compromise leads to harmony. Being open to your partner's needs deepens connection. Adapt to changing dynamics gracefully.",
        health: "Listen to your body's changing needs. Flexibility in routines brings better results. Try new wellness approaches. Your body responds well to variety and adaptation.",
        business: "Market conditions change - your ability to pivot is crucial. Stay flexible in strategies. Adapt products or services to customer needs. Innovation through adaptation pays off.",
        general: "Change is your friend. Embrace transformation rather than resisting it. Your ability to adapt to circumstances leads to success. Flow with life rather than against it."
      },
      color: "#FF7F50"
    },
    {
      number: 23,
      title: "平 - Balanced Fortune",
      fortune: "Neutral",
      poem: "Steady stream flows day by day,\nNeither rushing nor delay.\nPatience serves the wise one well,\nTime will weave its perfect spell.",
      meanings: {
        career: "Slow but steady growth. Focus on building skills rather than seeking immediate advancement. Maintain current position while preparing quietly for future opportunities.",
        relationships: "Steady and stable. Neither exciting breakthroughs nor major problems. Maintain consistency in care and attention. Relationships deepen slowly through daily kindness.",
        health: "Stable health requiring maintenance. Keep up with regular checkups and healthy habits. Neither push too hard nor become complacent. Consistency is key.",
        business: "Steady revenue without major spikes or drops. Maintain operations efficiently. Not the time for aggressive expansion but for operational excellence. Build slowly.",
        general: "Life flows at a moderate pace. Good time for establishing routines and maintaining stability. Progress happens quietly. Patience and persistence will be rewarded."
      },
      color: "#FFD93D"
    },
    {
      number: 35,
      title: "中平 - Fair Fortune",
      fortune: "Neutral",
      poem: "Garden needs both sun and rain,\nLove requires both joy and pain.\nTend with care each passing day,\nGrowth comes slow but finds its way.",
      meanings: {
        career: "Learning period with ups and downs. Both successes and setbacks teach valuable lessons. Focus on gaining experience. Long-term growth requires accepting short-term challenges.",
        relationships: "Relationships need active nurturing. Accept that growth includes both good times and challenges. Small consistent efforts matter more than grand gestures.",
        health: "Health requires daily attention. Small adjustments and habits accumulate into significant wellness. Balance activity with rest, indulgence with discipline.",
        business: "Business has natural cycles. Accept both profitable and slow periods as normal. Customer relationships need ongoing care. Growth is gradual but real.",
        general: "Life includes both sunny and rainy days. Accept this as natural. Consistent care and attention to all areas leads to gradual improvement. Embrace the full spectrum of experience."
      },
      color: "#E0B0FF"
    },
    {
      number: 47,
      title: "下平 - Below Average",
      fortune: "Difficult",
      poem: "Clouds obscure the mountain way,\nCareful steps required today.\nHidden obstacles appear,\nSeek advice from those sincere.",
      meanings: {
        career: "Obstacles and setbacks likely. Document everything carefully. Avoid taking on new responsibilities. Seek mentorship and guidance. Focus on surviving this period with professionalism intact.",
        relationships: "Misunderstandings and friction possible. Communication is difficult. Take time before reacting. Consider counseling. Remember that difficult periods don't define relationships.",
        health: "Warning signs appearing. Burnout or illness threatens. Slow down before forced to stop. Prioritize self-care aggressively. Minor issues now prevent major problems later.",
        business: "Financial pressure and challenges ahead. Revenue may decrease or expenses spike. Focus on survival, not growth. Renegotiate terms, manage debt carefully. This too shall pass.",
        general: "Difficult period requiring caution in all areas. Don't make major decisions under stress. Seek support and advice. Focus on getting through each day. Clarity will return."
      },
      color: "#B392AC"
    },
    {
      number: 52,
      title: "下下籤 - Difficult Fortune",
      fortune: "Challenging",
      poem: "Heavy fog obscures the view,\nUncertain what you should do.\nWait for clarity to come,\nDon't decide till seeing sun.",
      meanings: {
        career: "Confusion and uncertainty dominate. Avoid major career decisions until you have clarity. Stay in place if possible. This is a time for reflection, not action.",
        relationships: "Confusion about relationship direction. Don't make permanent decisions based on temporary emotions. Seek outside perspective. Wait for emotional clarity before acting.",
        health: "Multiple health concerns or confusion about symptoms. Seek professional medical advice immediately. Don't self-diagnose. Focus on basics: rest, nutrition, stress reduction.",
        business: "Market uncertainty makes planning difficult. Avoid major investments or changes. Preserve resources. Seek expert advice before any significant moves. Wait for better visibility.",
        general: "Uncertainty in multiple life areas creates stress and confusion. This is not the time for major decisions. Wait, observe, and seek counsel. The fog will lift with time."
      },
      color: "#778899"
    }
  ]

  useEffect(() => {
    const initWallet = async () => {
      try {
        await checkWalletConnection()
        setupEventListeners()
      } catch (error) {
        console.error('Error initializing wallet:', error)
      }
    }
    
    initWallet()
    
    return () => {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        try {
          const ethereum = (window as any).ethereum
          if (typeof ethereum.removeAllListeners === 'function') {
            ethereum.removeAllListeners('accountsChanged')
            ethereum.removeAllListeners('chainChanged')
          } else if (typeof ethereum.removeListener === 'function') {
            // Fallback for providers that use removeListener
            ethereum.removeListener('accountsChanged', () => {})
            ethereum.removeListener('chainChanged', () => {})
          }
        } catch (error) {
          console.error('Error removing event listeners:', error)
        }
      }
    }
  }, [])

  const setupEventListeners = () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        const ethereum = (window as any).ethereum
        
        // Check if the provider supports event listeners
        if (typeof ethereum.on === 'function') {
          // Listen for account changes
          ethereum.on('accountsChanged', (accounts: string[]) => {
            try {
              if (accounts && accounts.length === 0) {
                setWalletAddress(null)
                setNetworkName('')
              } else if (accounts && accounts.length > 0) {
                setWalletAddress(accounts[0])
                checkNetwork().catch(() => {})
              }
            } catch (error) {
              console.error('Error handling accountsChanged:', error)
            }
          })

          // Listen for network changes
          ethereum.on('chainChanged', () => {
            try {
              checkNetwork().catch(() => {})
            } catch (error) {
              console.error('Error handling chainChanged:', error)
            }
          })
        } else {
          console.log('Ethereum provider does not support event listeners')
        }
      } catch (error) {
        console.error('Error setting up event listeners:', error)
      }
    }
  }

  const checkWalletConnection = async () => {
    if (!isMetaMaskInstalled()) return

    try {
      const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' })
      if (accounts.length > 0) {
        setWalletAddress(accounts[0])
        await checkNetwork()
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error)
      setWalletError('Failed to check wallet connection')
    }
  }

  const isMetaMaskInstalled = () => {
    return typeof window !== 'undefined' && typeof (window as any).ethereum !== 'undefined'
  }

  const checkNetwork = async () => {
    if (!isMetaMaskInstalled()) return

    try {
      const chainId = await (window as any).ethereum.request({ method: 'eth_chainId' })
      if (chainId) {
        const chainIdHex = parseInt(chainId, 16)
        
        switch (chainIdHex) {
          case 1:
            setNetworkName('Ethereum Mainnet')
            break
          case 8453:
            setNetworkName('Base')
            break
          case 137:
            setNetworkName('Polygon')
            break
          case 56:
            setNetworkName('BSC')
            break
          default:
            setNetworkName(`Chain ${chainIdHex}`)
        }
      }
    } catch (error) {
      console.error('Error checking network:', error)
      setNetworkName('Unknown')
    }
  }

  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      setWalletError('MetaMask is not installed. Please install MetaMask to continue.')
      return
    }

    setIsConnecting(true)
    setWalletError(null)

    try {
      // Request account access
      const accounts = await (window as any).ethereum.request({ 
        method: 'eth_requestAccounts' 
      })
      
      if (accounts.length === 0) {
        setWalletError('No accounts found. Please create an account in MetaMask.')
        return
      }

      setWalletAddress(accounts[0])
      
      // Check and switch to Base network
      await switchToBaseNetwork()
      
    } catch (error: any) {
      console.error('Error connecting wallet:', error)
      
      if (error.code === 4001) {
        setWalletError('Connection rejected. Please approve the connection in MetaMask.')
      } else if (error.code === -32002) {
        setWalletError('Connection request already pending. Please check MetaMask.')
      } else {
        setWalletError('Failed to connect wallet. Please try again.')
      }
    } finally {
      setIsConnecting(false)
    }
  }

  const switchToBaseNetwork = async () => {
    try {
      // Try to switch to Base network
      await (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x2105' }], // Base mainnet
      })
    } catch (switchError: any) {
      // If network doesn't exist, add it
      if (switchError.code === 4902) {
        try {
          await (window as any).ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x2105',
              chainName: 'Base',
              nativeCurrency: {
                name: 'Ethereum',
                symbol: 'ETH',
                decimals: 18
              },
              rpcUrls: ['https://mainnet.base.org'],
              blockExplorerUrls: ['https://basescan.org']
            }]
          })
        } catch (addError) {
          console.error('Error adding Base network:', addError)
          setWalletError('Failed to add Base network. Please add it manually in MetaMask.')
        }
      } else if (switchError.code === 4001) {
        setWalletError('Network switch rejected. Please approve the network switch in MetaMask.')
      } else {
        console.error('Error switching network:', switchError)
        setWalletError('Failed to switch to Base network.')
      }
    }
  }

  const disconnectWallet = () => {
    setWalletAddress(null)
    setNetworkName('')
    setWalletError(null)
  }

  const mintNFT = async () => {
    console.log('🎯 mintNFT function called')
    console.log('Wallet address:', walletAddress)
    console.log('Selected stick:', selectedStick)
    
    if (!walletAddress) {
      console.log('❌ No wallet connected')
      setWalletError('Please connect your wallet first!')
      return
    }

    if (!selectedStick) {
      console.log('❌ No fortune selected')
      setWalletError('Please draw a fortune first!')
      return
    }

    console.log('✅ Starting minting process...')
    setIsMinting(true)
    setWalletError(null)

    try {
      console.log('🔗 Connecting to Ethereum...')
      const ethereum = (window as any).ethereum
      
      if (!ethereum) {
        throw new Error('MetaMask not found')
      }
      
      console.log('📡 Creating provider...')
      const provider = new ethers.BrowserProvider(ethereum)
      console.log('✍️ Getting signer...')
      const signer = await provider.getSigner()
      console.log('📋 Creating contract instance...')
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      console.log('💰 Getting mint price...')
      const mintPrice = await contract.mintPrice()
      console.log('Mint price:', mintPrice.toString())

      console.log('🎲 Minting NFT with data:', {
        fortuneNumber: selectedStick.number,
        title: selectedStick.title,
        fortune: selectedStick.fortune,
        poem: selectedStick.poem.substring(0, 50) + '...',
        careerMeaning: selectedStick.meanings.career.substring(0, 50) + '...',
        relationshipsMeaning: selectedStick.meanings.relationships.substring(0, 50) + '...',
        healthMeaning: selectedStick.meanings.health.substring(0, 50) + '...',
        businessMeaning: selectedStick.meanings.business.substring(0, 50) + '...',
        generalMeaning: selectedStick.meanings.general.substring(0, 50) + '...'
      })

      console.log('🚀 Calling mintFortune function...')
      // Call the mintFortune function
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
      )

      console.log('✅ Transaction submitted:', tx.hash)
      setWalletError(`Transaction submitted! Hash: ${tx.hash}`)
      
      console.log('⏳ Waiting for confirmation...')
      // Wait for transaction confirmation
      const receipt = await tx.wait()
      console.log('🎉 Transaction confirmed:', receipt)
      
      setMintSuccess(true)
      setWalletError(null)
      setTimeout(() => setMintSuccess(false), 10000)
      
    } catch (error: any) {
      console.error('❌ Error minting NFT:', error)
      
      if (error.code === 4001) {
        setWalletError('Transaction rejected by user')
      } else if (error.code === 'INSUFFICIENT_FUNDS') {
        setWalletError('Insufficient funds for minting and gas fees')
      } else if (error.message?.includes('user rejected')) {
        setWalletError('Transaction cancelled by user')
      } else if (error.message?.includes('insufficient funds')) {
        setWalletError('Insufficient funds for minting and gas fees')
      } else if (error.message?.includes('MetaMask not found')) {
        setWalletError('MetaMask not found. Please install MetaMask.')
      } else {
        setWalletError(`Failed to mint NFT: ${error.message || 'Unknown error'}`)
      }
    } finally {
      console.log('🏁 Minting process finished')
      setIsMinting(false)
    }
  }

  const shareOnFarcaster = () => {
    if (!selectedStick) return
    
    const text = `I just drew ${selectedStick.title} on Fortune Caster! 🎋✨\n\n"${selectedStick.poem.split('\n')[0]}..."\n\nCast your fortune too!`
    const url = 'https://fortune-caster-six.vercel.app'
    
    // Use the Farcaster integration hook
    shareToFarcaster(text, url)
  }

  const handleShake = () => {
    setIsShaking(true)
    setShowFortune(false)
    setSelectedStick(null)
    setMintSuccess(false)

    setTimeout(() => {
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
      setSelectedStick(randomFortune)
      setIsShaking(false)
      
      setTimeout(() => {
        setShowFortune(true)
      }, 500)
    }, 2000)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Farcaster Integration Banner */}
        <FarcasterIntegration />
        <div className="absolute top-4 md:top-8 right-4 md:right-8 z-10">
          {!walletAddress ? (
            <div className="flex flex-col items-end gap-2">
              {!isMetaMaskInstalled() ? (
                <div className="text-right">
                  <a
                    href="https://metamask.io/download/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 text-sm md:text-base"
                  >
                    <Wallet className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="hidden sm:inline">Install MetaMask</span>
                    <span className="sm:hidden">Install</span>
                  </a>
                  <p className="text-xs text-gray-600 mt-1">MetaMask required</p>
                </div>
              ) : (
                <div className="text-right">
                  <button
                    onClick={connectWallet}
                    disabled={isConnecting}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <Wallet className={`w-4 h-4 md:w-5 md:h-5 ${isConnecting ? 'animate-spin' : ''}`} />
                    {isConnecting ? (
                      <span className="hidden sm:inline">Connecting...</span>
                    ) : (
                      <>
                        <span className="hidden sm:inline">Connect MetaMask</span>
                        <span className="sm:hidden">Connect</span>
                      </>
                    )}
                  </button>
                  <p className="text-xs text-gray-600 mt-1">Connect your wallet</p>
                </div>
              )}
              
              {walletError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-lg text-xs max-w-xs">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">Error:</span>
                    <span>{walletError}</span>
                  </div>
                  <button
                    onClick={() => setWalletError(null)}
                    className="text-red-500 hover:text-red-700 ml-auto mt-1"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-full px-4 md:px-6 py-2 md:py-3 shadow-lg border-2 border-green-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-gray-700 text-xs md:text-base">{formatAddress(walletAddress)}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-500">{networkName || 'Connected'}</span>
                <button
                  onClick={disconnectWallet}
                  className="text-xs text-red-500 hover:text-red-700 ml-2"
                  title="Disconnect wallet"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mb-8 md:mb-12 pt-16 md:pt-0">
          <div className="inline-flex items-center gap-2 md:gap-3 mb-4">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-orange-500" />
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Fortune Caster
            </h1>
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-purple-500" />
          </div>
          <p className="text-lg md:text-xl text-gray-600">求籤 · Cast Your Fortune</p>
        </div>

        <div className="relative mb-8 md:mb-12">
          <div className="w-64 h-80 md:w-80 md:h-96 mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border-4 md:border-8 border-gradient">
            <div className="h-full bg-gradient-to-br from-purple-200 via-pink-200 to-orange-200 p-4 md:p-6 flex flex-col items-center justify-center relative">
              <div className="absolute top-6 left-6 w-12 h-12 md:w-16 md:h-16 bg-green-400 rounded-full opacity-70"></div>
              <div className="absolute bottom-10 right-6 w-8 h-8 md:w-12 md:h-12 bg-yellow-400 rotate-45 opacity-70"></div>
              <div className="absolute top-1/3 right-10 w-16 h-16 md:w-20 md:h-20 bg-purple-400 opacity-50" style={{clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'}}></div>
              
              <div className={`relative transition-all duration-500 ${isShaking ? 'animate-bounce' : ''}`}>
                {!selectedStick && (
                  <div className="flex gap-1 md:gap-2 items-end">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`w-8 h-24 md:w-12 md:h-32 rounded-t-full transition-all ${
                          isShaking ? 'animate-pulse' : ''
                        }`}
                        style={{
                          background: `linear-gradient(to bottom, ${['#FF6B6B', '#4ECDC4', '#FFE66D', '#F1A7DC', '#95E1D3'][i]}, white)`,
                          height: `${100 + Math.random() * 40}px`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      >
                        <div className="w-full h-8 md:h-12 bg-orange-500 rounded-t-full flex items-center justify-center text-white font-bold text-sm md:text-base">
                          {i + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {selectedStick && !showFortune && (
                  <div
                    className="w-12 h-48 md:w-16 md:h-64 rounded-t-full shadow-xl animate-pulse"
                    style={{
                      background: `linear-gradient(to bottom, ${selectedStick.color}, white)`
                    }}
                  >
                    <div className="w-full h-12 md:h-16 bg-orange-500 rounded-t-full flex items-center justify-center text-white font-bold text-lg md:text-xl">
                      {selectedStick.number}
                    </div>
                  </div>
                )}
              </div>

              {selectedStick && !showFortune && (
                <div className="absolute bottom-6 text-2xl md:text-4xl font-bold text-orange-500 animate-bounce">
                  WOW
                </div>
              )}
            </div>
          </div>
        </div>

        {!isShaking && !showFortune && (
          <div className="text-center mb-8 md:mb-12">
            <button
              onClick={handleShake}
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 md:px-12 py-3 md:py-4 rounded-full text-lg md:text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 md:gap-3 mx-auto"
            >
              <RefreshCw className="w-5 h-5 md:w-6 md:h-6" />
              Shake Fortune Sticks
            </button>
            <p className="text-gray-500 mt-4 text-sm md:text-base">Focus on your question and shake</p>
          </div>
        )}

        {showFortune && selectedStick && (
          <div className="animate-fadeIn">
            <div
              className="bg-white rounded-3xl shadow-2xl p-4 md:p-8 mb-6 md:mb-8 border-t-4 md:border-t-8"
              style={{ borderColor: selectedStick.color }}
            >
              <div className="flex items-center gap-3 md:gap-4 mb-6">
                <div
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white text-xl md:text-2xl font-bold flex-shrink-0"
                  style={{ backgroundColor: selectedStick.color }}
                >
                  {selectedStick.number}
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{selectedStick.title}</h2>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 ${
                    selectedStick.fortune === 'Excellent' || selectedStick.fortune === 'Very Good' || selectedStick.fortune === 'Good' ? 'bg-green-100 text-green-700' :
                    selectedStick.fortune === 'Neutral' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {selectedStick.fortune}
                  </span>
                </div>
              </div>

              <div className="mb-6 p-4 md:p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl">
                <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-3">籤詩 Fortune Poem</h3>
                <p className="text-gray-700 whitespace-pre-line italic text-base md:text-lg leading-relaxed">
                  {selectedStick.poem}
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 md:p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-800 text-base md:text-lg">Career</h4>
                  </div>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">{selectedStick.meanings.career}</p>
                </div>

                <div className="p-4 md:p-5 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-5 h-5 text-pink-600" />
                    <h4 className="font-semibold text-gray-800 text-base md:text-lg">Relationships</h4>
                  </div>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">{selectedStick.meanings.relationships}</p>
                </div>

                <div className="p-4 md:p-5 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-green-600" />
                    <h4 className="font-semibold text-gray-800 text-base md:text-lg">Health</h4>
                  </div>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">{selectedStick.meanings.health}</p>
                </div>

                <div className="p-4 md:p-5 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-yellow-600" />
                    <h4 className="font-semibold text-gray-800 text-base md:text-lg">Business</h4>
                  </div>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">{selectedStick.meanings.business}</p>
                </div>

                <div className="p-4 md:p-5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Compass className="w-5 h-5 text-purple-600" />
                    <h4 className="font-semibold text-gray-800 text-base md:text-lg">General Life</h4>
                  </div>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">{selectedStick.meanings.general}</p>
                </div>
              </div>

              {mintSuccess && (
                <div className="mt-6 p-4 bg-green-100 border-2 border-green-500 rounded-2xl animate-fadeIn">
                  <p className="text-green-800 font-semibold text-center flex items-center justify-center gap-2 text-sm md:text-base">
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                    Fortune NFT minted successfully!
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
              <button
                onClick={mintNFT}
                disabled={isMinting || !walletAddress}
                className={`${
                  walletAddress && !isMinting
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-400 cursor-not-allowed'
                } text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full text-base md:text-lg font-bold shadow-lg transition-all duration-200 flex items-center gap-2 md:gap-3`}
              >
                <Image className="w-4 h-4 md:w-5 md:h-5" />
                {isMinting ? 'Minting...' : 'Mint as NFT (~$0.03)'}
              </button>

              <button
                onClick={shareOnFarcaster}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full text-base md:text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 md:gap-3"
              >
                <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                Share on Farcaster
              </button>

              <button
                onClick={() => {
                  setShowFortune(false)
                  setSelectedStick(null)
                }}
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full text-base md:text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 md:gap-3"
              >
                <RefreshCw className="w-4 h-4 md:w-5 md:h-5" />
                Draw Again
              </button>
            </div>

            {!walletAddress && (
              <p className="text-center text-gray-500 mt-4 text-xs md:text-sm">
                Connect your wallet to mint this fortune as an NFT
              </p>
            )}
          </div>
        )}

        {isShaking && (
          <div className="text-center text-xl md:text-2xl font-semibold text-gray-600 animate-pulse">
            Consulting the spirits...
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}

