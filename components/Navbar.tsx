'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, usePathname } from 'next/navigation'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [userInitial, setUserInitial] = useState('U')
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setMenuOpen(false)
    if (menuOpen) document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [menuOpen])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Movies', href: '/movies' },
    { label: 'TV Shows', href: '/tv' },
    { label: 'My List', href: '/my-list' },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 px-8 py-4 flex items-center justify-between transition-all duration-300 ${
      scrolled || !isHome ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>

      {/* Left: Logo + Links */}
      <div className="flex items-center gap-8">
        <Link href="/">
          <span className="text-red-600 text-2xl font-black tracking-widest uppercase cursor-pointer">
            Streamify
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`transition-colors ${
                pathname === href
                  ? 'text-white font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Right: Search + Avatar */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="flex items-center gap-2">
          {searchOpen && (
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder="Search titles..."
              autoFocus
              className="bg-black/80 border border-gray-600 text-white text-sm px-3 py-1.5 rounded outline-none focus:border-white transition-colors w-48"
            />
          )}
          <button
            onClick={() => setSearchOpen(prev => !prev)}
            className="text-gray-400 hover:text-white transition-colors p-1"
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* Avatar + Dropdown */}
        <div className="relative" onClick={e => e.stopPropagation()}>
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-white text-xs font-bold hover:opacity-80 transition-opacity"
          >
            {userInitial}
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-11 bg-[#1a1a1a] border border-white/10 rounded-lg py-1 w-40 shadow-xl">
              <div className="px-4 py-2 border-b border-white/10 mb-1">
                <p className="text-gray-400 text-xs">Signed in as</p>
                <p className="text-white text-xs font-semibold truncate">{userInitial}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 text-sm transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}