'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import MovieCard from '@/components/MovieCard'
import { useSearchParams } from 'next/navigation'

interface Movie {
  id: string
  title: string
  thumbnail_url: string
  year: number
  genre: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const search = async () => {
      if (!query) {
        setMovies([])
        return
      }
      setLoading(true)
      const { data } = await supabase
        .from('movies')
        .select('*')
        .or(`title.ilike.%${query}%,genre.ilike.%${query}%`)
      setMovies(data || [])
      setLoading(false)
    }
    search()
  }, [query])

  return (
    <main className="bg-[#141414] min-h-screen">
      <Navbar />
      <div className="pt-28 px-32">
        {query && (
          <h2 className="text-white text-xl mb-6">
            {loading ? 'Searching...' : `Results for "${query}"`}
          </h2>
        )}
        {!query && (
          <h2 className="text-gray-400 text-xl mb-6">Type something to search</h2>
        )}
        {movies.length === 0 && query && !loading && (
          <p className="text-gray-400">No results found for "{query}"</p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </main>
  )
}