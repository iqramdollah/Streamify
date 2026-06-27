'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <nav className="fixed top-0 w-full z-50 px-12 py-4 flex items-center justify-between">
      {/* Left side */}
      <div className="flex items-center gap-10">
        <Link href="/">
          <h1 className="text-red-600 text-2xl font-black tracking-widest cursor-pointer uppercase">
            Streamify
          </h1>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/" className="hover:text-white transition-colors">Movies</Link>
          <Link href="/" className="hover:text-white transition-colors">TV Shows</Link>
          <Link href="/" className="hover:text-white transition-colors">My List</Link>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {searchOpen && (
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search titles..."
              autoFocus
              className="bg-black/80 border border-gray-500 text-white text-sm px-3 py-1.5 rounded outline-none focus:border-white transition-colors w-48"
            />
          )}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-gray-300 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:opacity-80 transition-opacity">
          U
        </div>
      </div>
    </nav>
  )
}