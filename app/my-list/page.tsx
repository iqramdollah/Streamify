'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import MovieCard from '@/components/MovieCard'
import TVShowCard from '@/components/TVShowCard'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function MyListPage() {
  const [movies, setMovies] = useState<any[]>([])
  const [shows, setShows] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchList = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data } = await supabase
        .from('my_list')
        .select('*, movies(*), tv_shows(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      const movieList = data?.filter(item => item.movies).map(item => item.movies) || []
      const showList = data?.filter(item => item.tv_shows).map(item => item.tv_shows) || []

      setMovies(movieList)
      setShows(showList)
      setLoading(false)
    }

    fetchList()
  }, [router])

  if (loading) {
    return (
      <main className="bg-[#141414] min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </main>
    )
  }

  const totalItems = movies.length + shows.length

  return (
    <main className="bg-[#141414] min-h-screen pt-28">
      <Navbar />
      <div className="pb-12">
        <div style={{ paddingLeft: '6rem', paddingRight: '6rem' }} className="mb-8">
          <h1 className="text-white text-4xl font-black">My List</h1>
          <p className="text-gray-400 mt-1 text-sm">{totalItems} titles saved</p>
        </div>

        {totalItems === 0 ? (
          <div style={{ paddingLeft: '6rem' }} className="py-20">
            <p className="text-gray-400 text-xl mb-2">Your list is empty</p>
            <p className="text-gray-600 text-sm mb-6">Add movies or shows by clicking the + button on any title</p>
            <Link href="/" className="bg-white text-black font-bold px-6 py-2 rounded hover:bg-gray-200 transition-colors">
              Browse Movies
            </Link>
          </div>
        ) : (
          <div style={{ paddingLeft: '6rem', paddingRight: '6rem' }}>
            {movies.length > 0 && (
              <div className="mb-10">
                <h2 className="text-white text-xl font-bold mb-4">Movies</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {movies.map((movie: any) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              </div>
            )}

            {shows.length > 0 && (
              <div className="mb-10">
                <h2 className="text-white text-xl font-bold mb-4">TV Shows</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {shows.map((show: any) => (
                    <TVShowCard key={show.id} show={show} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}