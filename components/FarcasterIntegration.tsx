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
    // Check if running in Farcaster/Warpcast and initialize SDK
    const initializeFarcaster = async () => {
      try {
        // Check for Farcaster-specific user agent or environment
        const userAgent = navigator.userAgent.toLowerCase()
        const isWarpcast = userAgent.includes('warpcast') || userAgent.includes('farcaster')
        
        // Check for Farcaster frame context
        const isFrame = window.parent !== window
        
        const isInFarcasterApp = isWarpcast || isFrame
        
        if (isInFarcasterApp) {
          setIsInFarcaster(true)
          
          // Dynamically import Farcaster SDK
          const { sdk } = await import('@farcaster/miniapp-sdk')
          
          // Call ready() to dismiss splash screen
          await sdk.actions.ready()
          
          console.log('✅ Farcaster SDK initialized and ready() called')
          
          // Try to get user data
          try {
            const userData = await sdk.actions.signIn()
            setUser(userData)
            console.log('✅ Farcaster user data:', userData)
          } catch (error) {
            console.log('Farcaster sign-in not available:', error)
          }
        }
      } catch (error) {
        console.log('Farcaster SDK not available or error:', error)
      }
    }

    initializeFarcaster()

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
  const [sdk, setSdk] = useState<any>(null)

  useEffect(() => {
    const initializeFarcaster = async () => {
      try {
        const userAgent = navigator.userAgent.toLowerCase()
        const isWarpcast = userAgent.includes('warpcast') || userAgent.includes('farcaster')
        const isFrame = window.parent !== window
        
        const isInFarcasterApp = isWarpcast || isFrame
        setIsInFarcaster(isInFarcasterApp)

        if (isInFarcasterApp) {
          // Dynamically import Farcaster SDK
          const { sdk: farcasterSdk } = await import('@farcaster/miniapp-sdk')
          setSdk(farcasterSdk)
          
          // Call ready() to dismiss splash screen
          await farcasterSdk.actions.ready()
          console.log('✅ Farcaster SDK ready() called')
          
          // Try to get user data
          try {
            const userData = await farcasterSdk.actions.signIn()
            setUser(userData)
          } catch (error) {
            console.log('Farcaster sign-in not available:', error)
          }
        }
      } catch (error) {
        console.log('Farcaster SDK not available:', error)
      }
    }

    initializeFarcaster()
  }, [])

  const shareToFarcaster = async (text: string, url?: string) => {
    if (isInFarcaster && sdk) {
      try {
        // Use Farcaster SDK native sharing
        await sdk.actions.share({
          text: text,
          url: url || window.location.href
        })
      } catch (error) {
        console.log('Farcaster native sharing failed, using fallback:', error)
        // Fallback to external Farcaster link
        const farcasterUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}${url ? `&embeds[]=${encodeURIComponent(url)}` : ''}`
        window.open(farcasterUrl, '_blank')
      }
    } else {
      // Fallback to external Farcaster link
      const farcasterUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}${url ? `&embeds[]=${encodeURIComponent(url)}` : ''}`
      window.open(farcasterUrl, '_blank')
    }
  }

  return {
    isInFarcaster,
    user,
    sdk,
    shareToFarcaster
  }
}
