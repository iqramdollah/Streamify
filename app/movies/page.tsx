// app/movies/page.tsx
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import MovieRow from '@/components/MovieRow'

export default async function MoviesPage() {
  const { data: movies } = await supabase
    .from('movies')
    .select('*')

  if (!movies || movies.length === 0) {
    return (
      <main className="bg-[#141414] min-h-screen flex items-center justify-center">
        <p className="text-gray-400">No movies found.</p>
      </main>
    )
  }

  const all = movies
  const animation = movies.filter(m => m.genre === 'Animation')
  const fantasy = movies.filter(m => m.genre === 'Fantasy')
  const scifi = movies.filter(m => m.genre === 'Sci-Fi')

  return (
    <main className="bg-[#141414] min-h-screen">
      <Navbar />
      <div className="pt-36 pb-12">
        {/* Header */}
        <div className="px-8 mb-8">
          <h1 className="text-white text-4xl font-black">Movies</h1>
          <p className="text-gray-400 mt-1 text-sm">{all.length} titles available</p>
        </div>

        {/* Rows by genre */}
        <MovieRow title="All Movies" movies={all} />
        {animation.length > 0 && <MovieRow title="Animation" movies={animation} />}
        {fantasy.length > 0 && <MovieRow title="Fantasy" movies={fantasy} />}
        {scifi.length > 0 && <MovieRow title="Sci-Fi" movies={scifi} />}
      </div>
    </main>
  )
}