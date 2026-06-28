import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import TVShowCard from '@/components/TVShowCard'

export default async function TVPage() {
  const { data: shows } = await supabase
    .from('tv_shows')
    .select('*')

  if (!shows || shows.length === 0) {
    return (
      <main className="bg-[#141414] min-h-screen flex items-center justify-center">
        <p className="text-gray-400">No TV shows found.</p>
      </main>
    )
  }

  return (
    <main className="bg-[#141414] min-h-screen pt-28">
      <Navbar />
      <div className="pb-12">
        <div style={{ paddingLeft: '6rem', paddingRight: '6rem' }} className="mb-8">
          <h1 className="text-white text-4xl font-black">TV Shows</h1>
          <p className="text-gray-400 mt-1 text-sm">{shows.length} shows available</p>
        </div>
        <div style={{ paddingLeft: '6rem', paddingRight: '6rem' }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {shows.map(show => (
            <TVShowCard key={show.id} show={show} />
          ))}
        </div>
      </div>
    </main>
  )
}