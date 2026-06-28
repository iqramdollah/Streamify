'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/')
    }
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://assets.nflxext.com/ffe/siteui/vlv3/9134db96-e336-4c2f-90e9-1d2dcffe4d97/web/MY-en-20250505-TRIFECTA-perspective_e43a1c7d-67df-4b61-a7b7-cecf48b07c6e_large.jpg')`,
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />
      {/* Top/bottom gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

      {/* Header */}
      <header className="relative z-10 px-10 py-6 md:px-16">
        <span className="text-red-600 text-3xl font-black tracking-widest uppercase select-none">
          Streamify
        </span>
      </header>

      {/* Form */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md bg-black/75 rounded-md px-12 py-14">
          <h1 className="text-white text-3xl font-bold mb-8">Sign In</h1>

          <div className="flex flex-col gap-4">
            {/* Email */}
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder=" "
                className="peer w-full bg-[#333] text-white rounded px-4 pt-5 pb-2 text-base outline-none focus:ring-2 focus:ring-white/30 transition-all placeholder-transparent"
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-1 text-xs text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs pointer-events-none"
              >
                Email or phone number
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder=" "
                className="peer w-full bg-[#333] text-white rounded px-4 pt-5 pb-2 text-base outline-none focus:ring-2 focus:ring-white/30 transition-all placeholder-transparent"
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-1 text-xs text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs pointer-events-none"
              >
                Password
              </label>
            </div>

            {/* Error */}
            {error && (
              <p className="text-yellow-400 text-sm bg-yellow-400/10 border border-yellow-400/20 px-4 py-2 rounded">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded text-base transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            {/* Help row */}
            <div className="flex items-center justify-between text-sm text-gray-400 mt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" className="accent-gray-400 w-4 h-4" />
                Remember me
              </label>
              <a href="#" className="hover:underline">Need help?</a>
            </div>
          </div>

          {/* Sign up */}
          <p className="text-gray-400 mt-10 text-sm">
            New to Streamify?{' '}
            <Link href="/signup" className="text-white font-semibold hover:underline">
              Sign up now
            </Link>
          </p>

          {/* Fine print */}
          <p className="text-gray-600 text-xs mt-4 leading-relaxed">
            This page is protected by Google reCAPTCHA to ensure you&apos;re not a bot.{' '}
            <a href="#" className="text-blue-500 hover:underline">Learn more</a>
          </p>
        </div>
      </main>
    </div>
  )
}