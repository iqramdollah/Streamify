import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default async function TVShowPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data: show } = await supabase
    .from('tv_shows')
    .select('*')
    .eq('id', id)
    .single()

  const { data: episodes } = await supabase
    .from('episodes')
    .select('*')
    .eq('show_id', id)
    .order('season')
    .order('episode')

  if (!show) return <p className="text-white p-8">Show not found</p>

  const seasons = [...new Set(episodes?.map(e => e.season) || [])].sort()

  return (
    <main className="bg-[#141414] min-h-screen">
      <Navbar />

      {/* Banner */}
      <div className="relative w-full h-[60vh] flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${show.banner_url})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
        <div className="relative z-10 px-12 pb-10 max-w-2xl">
          <p className="text-gray-400 text-sm mb-2 uppercase tracking-widest">{show.genre} • {show.year}</p>
          <h1 className="text-5xl font-black mb-3 text-white leading-tight">{show.title}</h1>
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-6">{show.description}</p>
          <Link href={`/tv/${show.id}/watch/${episodes?.[0]?.id}`}>
            <button className="flex items-center gap-2 bg-white text-black font-bold px-8 py-3 rounded hover:bg-gray-200 transition-colors">
              ▶ Play S1:E1
            </button>
          </Link>
        </div>
      </div>

      {/* Episodes */}
      <div style={{ paddingLeft: '6rem', paddingRight: '6rem' }} className="py-10">
        {seasons.map(season => (
          <div key={season} className="mb-10">
            <h2 className="text-white text-2xl font-bold mb-4">Season {season}</h2>
            <div className="flex flex-col gap-3">
              {episodes?.filter(e => e.season === season).map(ep => (
                <Link key={ep.id} href={`/tv/${show.id}/watch/${ep.id}`}>
                  <div className="flex gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/10">
                    <div className="relative flex-none w-40 aspect-video rounded overflow-hidden">
                      <img
                        src={ep.thumbnail_url || show.thumbnail_url}
                        alt={ep.title}
                        className="w-full h-full object-cover group-hover:brightness-75 transition-all"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/90 rounded-full w-8 h-8 flex items-center justify-center">
                          <span className="text-black text-xs font-bold">▶</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-white font-semibold">
                          {ep.episode}. {ep.title}
                        </p>
                        <span className="text-gray-400 text-sm flex-none ml-4">{ep.duration}</span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{ep.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}