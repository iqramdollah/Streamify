import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import HeroBanner from '@/components/HeroBanner'
import MovieRow from '@/components/MovieRow'
import TrailerRow from '@/components/TrailerRow'

export default async function Home() {
  const { data: movies } = await supabase
    .from('movies')
    .select('*')

  if (!movies || movies.length === 0) {
    return (
      <main className="bg-[#141414] min-h-screen flex items-center justify-center">
        <p className="text-gray-400">No movies found. Add some in Supabase!</p>
      </main>
    )
  }

  const latest = movies.filter(m => m.trailer_url && m.year === 2025)
  const animation = movies.filter(m => m.genre === 'Animation')
  const scifi = movies.filter(m => m.genre === 'Sci-Fi')
  const fantasy = movies.filter(m => m.genre === 'Fantasy')
  const action = movies.filter(m => m.genre === 'Action')
  const allMovies = movies

  return (
    <main className="bg-[#141414] min-h-screen">
      <Navbar />
      <HeroBanner movies={allMovies} />
      <div className="mt-4">
        {latest.length > 0 && <TrailerRow title="🎬 Latest in Cinemas" movies={latest} />}
        <MovieRow title="All Movies" movies={allMovies} />
        {action.length > 0 && <MovieRow title="Action" movies={action} />}
        {animation.length > 0 && <MovieRow title="Animation" movies={animation} />}
        {scifi.length > 0 && <MovieRow title="Sci-Fi" movies={scifi} />}
        {fantasy.length > 0 && <MovieRow title="Fantasy" movies={fantasy} />}
      </div>
    </main>
  )
}