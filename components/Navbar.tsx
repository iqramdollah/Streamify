'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [userInitial, setUserInitial] = useState('U')
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      } else {
        setUserInitial(user.email?.[0].toUpperCase() || 'U')
      }
    }
    getUser()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <nav className="fixed top-0 w-full z-50 px-12 py-4 flex items-center justify-between">
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

        <div className="relative">
          <button
            onClick={() => {
              console.log('clicked', menuOpen)
              setMenuOpen(!menuOpen)
            }}
            className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:opacity-80 transition-opacity"
          >
            {userInitial}
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-10 bg-black/90 border border-gray-700 rounded py-2 w-32">
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-gray-300 hover:text-white text-sm transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}