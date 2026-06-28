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
    <div className="min-h-screen w-full flex flex-col bg-black">
      <header className="px-10 py-6 md:px-16">
        <span className="text-red-600 text-3xl font-black tracking-widest uppercase select-none">
          Streamify
        </span>
      </header>

      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md bg-zinc-900 rounded-md px-16 py-16">
          <h1 className="text-white text-4xl font-bold mb-10">Sign In</h1>

          <div className="flex flex-col gap-5">
            {/* Email */}
            <div className="relative h-14">
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className="absolute inset-0 w-full bg-[#333] text-white rounded px-4 pt-6 pb-2 text-sm outline-none focus:ring-2 focus:ring-white/30 transition-all"
              />
              <label
                htmlFor="email"
                className={`absolute left-4 transition-all duration-150 pointer-events-none ${
                  email
                    ? 'top-2 text-xs text-gray-400'
                    : 'top-1/2 -translate-y-1/2 text-base text-gray-400'
                }`}
              >
                Email or phone number
              </label>
            </div>

            {/* Password */}
            <div className="relative h-14">
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className="absolute inset-0 w-full bg-[#333] text-white rounded px-4 pt-6 pb-2 text-sm outline-none focus:ring-2 focus:ring-white/30 transition-all"
              />
              <label
                htmlFor="password"
                className={`absolute left-4 transition-all duration-150 pointer-events-none ${
                  password
                    ? 'top-2 text-xs text-gray-400'
                    : 'top-1/2 -translate-y-1/2 text-base text-gray-400'
                }`}
              >
                Password
              </label>
            </div>

            {error && (
              <p className="text-yellow-400 text-sm bg-yellow-400/10 border border-yellow-400/20 px-4 py-3 rounded">
                {error}
              </p>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded text-base transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="flex items-center justify-between text-sm text-gray-400">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" className="accent-gray-400 w-4 h-4" />
                Remember me
              </label>
              <a href="#" className="hover:underline">Need help?</a>
            </div>
          </div>

          <p className="text-gray-400 mt-10 text-sm">
            New to Streamify?{' '}
            <Link href="/signup" className="text-white font-semibold hover:underline">
              Sign up now
            </Link>
          </p>

          <p className="text-gray-600 text-xs mt-5 leading-relaxed">
            This page is protected by Google reCAPTCHA to ensure you&apos;re not a bot.{' '}
            <a href="#" className="text-blue-500 hover:underline">Learn more</a>
          </p>
        </div>
      </main>
    </div>
  )
}