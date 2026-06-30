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
  const [demoLoading, setDemoLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Enter your email and password.')
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

  const handleDemoLogin = async () => {
    setDemoLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({
      email: 'demo@streamify.com',
      password: 'demo12345',
    })
    if (error) {
      setError('Demo account unavailable right now.')
      setDemoLoading(false)
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
          <h1 className="text-white text-3xl font-bold mb-2">Sign in</h1>
          <p className="text-gray-500 text-sm mb-8">Portfolio project, this is not a real streaming service.</p>
<p className="text-yellow-500/80 text-xs mb-8 bg-yellow-500/5 border border-yellow-500/20 rounded px-3 py-2">
  ⚠ Please do not use your real email or password. Use the demo button below or any test credentials.
</p>
          {/* Demo CTA — primary path */}
          <button
            onClick={handleDemoLogin}
            disabled={demoLoading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded text-base transition-colors disabled:opacity-60 disabled:cursor-not-allowed mb-3"
          >
            {demoLoading ? 'Loading demo...' : 'View demo — no signup needed'}
          </button>

          {error && (
            <p className="text-yellow-400 text-sm bg-yellow-400/10 border border-yellow-400/20 px-4 py-3 rounded mb-4">
              {error}
            </p>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-zinc-700 flex-1" />
            <span className="text-gray-500 text-xs uppercase tracking-wider">Or sign in</span>
            <div className="h-px bg-zinc-700 flex-1" />
          </div>

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

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-3.5 rounded text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
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
        </div>
      </main>
    </div>
  )
}