import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

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
            <Link key={show.id} href={`/tv/${show.id}`}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={show.thumbnail_url}
                    alt={show.title}
                    className="w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-75"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 bg-gradient-to-t from-black via-black/40 to-transparent">
                    <div>
                      <p className="text-white text-sm font-bold">{show.title}</p>
                      <p className="text-gray-300 text-xs">{show.year} • {show.genre}</p>
                    </div>
                  </div>
                </div>
                <p className="text-white text-sm font-semibold mt-2 truncate">{show.title}</p>
                <p className="text-gray-400 text-xs">{show.year} • {show.genre}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}