import { supabase } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import Navbar from '@/components/Navbar'
import MovieCard from '@/components/MovieCard'
import Link from 'next/link'

export default async function MyListPage() {
  const cookieStore = await cookies()

  const supabaseServer = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  )

  const { data: { user } } = await supabaseServer.auth.getUser()

  if (!user) {
    return (
      <main className="bg-[#141414] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Sign in to view your list</p>
          <Link href="/login" className="bg-red-600 text-white px-6 py-2 rounded font-bold hover:bg-red-700 transition-colors">
            Sign In
          </Link>
        </div>
      </main>
    )
  }

  const { data: listItems } = await supabaseServer
    .from('my_list')
    .select('*, movies(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const movies = listItems?.map(item => item.movies).filter(Boolean) || []

  return (
    <main className="bg-[#141414] min-h-screen pt-28">
      <Navbar />
      <div className="pb-12">
        <div style={{ paddingLeft: '6rem', paddingRight: '6rem' }} className="mb-8">
          <h1 className="text-white text-4xl font-black">My List</h1>
          <p className="text-gray-400 mt-1 text-sm">{movies.length} titles saved</p>
        </div>

        {movies.length === 0 ? (
          <div style={{ paddingLeft: '6rem' }} className="text-center py-20">
            <p className="text-gray-400 text-xl mb-2">Your list is empty</p>
            <p className="text-gray-600 text-sm mb-6">Add movies by clicking the + button on any title</p>
            <Link href="/" className="bg-white text-black font-bold px-6 py-2 rounded hover:bg-gray-200 transition-colors">
              Browse Movies
            </Link>
          </div>
        ) : (
          <div style={{ paddingLeft: '6rem', paddingRight: '6rem' }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {movies.map((movie: any) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}