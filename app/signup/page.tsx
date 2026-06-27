'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async () => {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/')
    }
  }

  return (
    <main className="bg-[#141414] min-h-screen flex items-center justify-center"
      style={{ backgroundImage: 'url(https://assets.nflxext.com/ffe/siteui/vlv3/9134db96-e336-4c2f-90e9-1d2dcffe4d97/web/MY-en-20250505-TRIFECTA-perspective_e43a1c7d-67df-4b61-a7b7-cecf48b07c6e_large.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 bg-black/80 backdrop-blur-sm p-12 rounded-lg w-full max-w-md">
        <h1 className="text-red-600 text-2xl font-black tracking-widest mb-8 uppercase">Streamify</h1>
        <h2 className="text-white text-3xl font-bold mb-8">Sign Up</h2>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="bg-gray-700/80 text-white px-4 py-4 rounded outline-none focus:bg-gray-600 transition-colors placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="bg-gray-700/80 text-white px-4 py-4 rounded outline-none focus:bg-gray-600 transition-colors placeholder-gray-400"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            onClick={handleSignup}
            disabled={loading}
            className="bg-red-600 text-white font-bold py-4 rounded hover:bg-red-700 transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </div>

        <p className="text-gray-400 mt-6 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-white hover:underline font-bold">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}