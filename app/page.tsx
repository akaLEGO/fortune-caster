'use client'

import FortuneCaster from '@/components/FortuneCaster'

export default function Home() {
  return (
    <>
      <FortuneCaster />
      
      {/* Footer */}
      <footer className="text-center py-8 text-gray-600 opacity-70">
        <p>✨ For entertainment purposes only ✨</p>
      </footer>
    </>
  )
}

