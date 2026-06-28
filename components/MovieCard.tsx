'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Movie {
  id: string
  title: string
  thumbnail_url: string
  year: number
  genre: string
}

export default function MovieCard({ movie }: { movie: Movie }) {
  const router = useRouter()
  const [inList, setInList] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const checkList = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from('my_list')
        .select('id')
        .eq('user_id', user.id)
        .eq('movie_id', movie.id)
        .single()
      setInList(!!data)
    }
    checkList()
  }, [movie.id])

  const toggleList = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    if (inList) {
      await supabase
        .from('my_list')
        .delete()
        .eq('user_id', user.id)
        .eq('movie_id', movie.id)
      setInList(false)
    } else {
      await supabase
        .from('my_list')
        .insert({ user_id: user.id, movie_id: movie.id })
      setInList(true)
    }
    setLoading(false)
  }

  return (
    <Link href={`/watch/${movie.id}`}>
      <div className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg shadow-black/60 hover:shadow-2xl hover:shadow-black/80 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
        <img
          src={movie.thumbnail_url}
          alt={movie.title}
          className="w-full rounded-xl aspect-video object-cover transition-all duration-300 group-hover:brightness-75"
        />

        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
            {movie.genre}
          </span>
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end rounded-xl overflow-hidden">
          <div className="bg-gradient-to-t from-black via-black/80 to-transparent p-3">
            <p className="text-white text-sm font-bold truncate">{movie.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-green-400 text-xs font-bold">98%</span>
              <span className="text-gray-400 text-xs">{movie.year}</span>
              <span className="border border-gray-500 text-gray-400 text-xs px-1 rounded">HD</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  router.push(`/watch/${movie.id}`)
                }}
                className="bg-white text-black rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold hover:bg-gray-200 transition-colors"
              >
                ▶
              </button>
              <button
                onClick={toggleList}
                disabled={loading}
                className={`border rounded-full w-7 h-7 flex items-center justify-center text-sm transition-colors ${
                  inList
                    ? 'bg-white text-black border-white'
                    : 'border-gray-400 text-white hover:border-white'
                }`}
              >
                {inList ? '✓' : '+'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}