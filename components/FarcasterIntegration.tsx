'use client'

import { useEffect, useState } from 'react'

interface FarcasterUser {
  fid: number
  username: string
  displayName: string
  pfpUrl: string
  followerCount: number
  followingCount: number
}

export default function FarcasterIntegration() {
  const [user, setUser] = useState<FarcasterUser | null>(null)
  const [isInFarcaster, setIsInFarcaster] = useState(false)

  useEffect(() => {
    // Check if running in Farcaster/Warpcast
    const checkFarcaster = () => {
      // Check for Farcaster-specific user agent or environment
      const userAgent = navigator.userAgent.toLowerCase()
      const isWarpcast = userAgent.includes('warpcast') || userAgent.includes('farcaster')
      
      // Check for Farcaster frame context
      const isFrame = window.parent !== window
      
      setIsInFarcaster(isWarpcast || isFrame)
      
      // Try to get user data from Farcaster
      if (isWarpcast || isFrame) {
        try {
          // This would be populated by Farcaster when running as a frame/mini app
          const farcasterUser = (window as any).farcasterUser
          if (farcasterUser) {
            setUser(farcasterUser)
          }
        } catch (error) {
          console.log('Farcaster user data not available')
        }
      }
    }

    checkFarcaster()

    // Listen for Farcaster events
    const handleFarcasterMessage = (event: MessageEvent) => {
      if (event.data?.type === 'farcaster:user') {
        setUser(event.data.user)
      }
    }

    window.addEventListener('message', handleFarcasterMessage)
    
    return () => {
      window.removeEventListener('message', handleFarcasterMessage)
    }
  }, [])

  // Don't render anything if not in Farcaster
  if (!isInFarcaster) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-lg mb-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-purple-600 font-bold text-sm">🎋</span>
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold">Welcome to Fortune Caster!</div>
          {user ? (
            <div className="text-xs opacity-90">
              Hello, {user.displayName || user.username}!
            </div>
          ) : (
            <div className="text-xs opacity-90">
              Draw your fortune and mint as NFT
            </div>
          )}
        </div>
        <div className="text-xs opacity-75">
          Powered by Base
        </div>
      </div>
    </div>
  )
}

// Hook for Farcaster-specific functionality
export function useFarcaster() {
  const [isInFarcaster, setIsInFarcaster] = useState(false)
  const [user, setUser] = useState<FarcasterUser | null>(null)

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    const isWarpcast = userAgent.includes('warpcast') || userAgent.includes('farcaster')
    const isFrame = window.parent !== window
    
    setIsInFarcaster(isWarpcast || isFrame)

    if (isWarpcast || isFrame) {
      try {
        const farcasterUser = (window as any).farcasterUser
        if (farcasterUser) {
          setUser(farcasterUser)
        }
      } catch (error) {
        console.log('Farcaster user data not available')
      }
    }
  }, [])

  const shareToFarcaster = (text: string, url?: string) => {
    if (isInFarcaster) {
      // Use Farcaster's native sharing
      const shareData = {
        text: text,
        url: url || window.location.href
      }
      
      // Post message to parent frame (Farcaster)
      window.parent.postMessage({
        type: 'farcaster:share',
        data: shareData
      }, '*')
    } else {
      // Fallback to external Farcaster link
      const farcasterUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}${url ? `&embeds[]=${encodeURIComponent(url)}` : ''}`
      window.open(farcasterUrl, '_blank')
    }
  }

  return {
    isInFarcaster,
    user,
    shareToFarcaster
  }
}
