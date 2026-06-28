import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import VideoPlayerWrapper from '@/app/watch/[id]/VideoPlayerWrapper'

export default async function WatchEpisodePage({ params }: { params: Promise<{ id: string, episodeId: string }> }) {
  const { id, episodeId } = await params

  const { data: episode } = await supabase
    .from('episodes')
    .select('*')
    .eq('id', episodeId)
    .single()

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

  if (!episode || !show) return <p className="text-white p-8">Episode not found</p>

  const currentIndex = episodes?.findIndex(e => e.id === episodeId) ?? 0
  const nextEpisode = episodes?.[currentIndex + 1]
  const prevEpisode = episodes?.[currentIndex - 1]

  return (
    <main className="bg-[#141414] min-h-screen">
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-4 bg-black">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-red-600 text-xl font-black tracking-widest uppercase">
            Streamify
          </Link>
          <Link href={`/tv/${show.id}`} className="text-gray-400 hover:text-white text-sm transition-colors">
            ← {show.title}
          </Link>
        </div>
        <p className="text-gray-400 text-sm">
          S{episode.season}:E{episode.episode} — {episode.title}
        </p>
      </div>

      {/* Player */}
      <div className="max-w-5xl mx-auto px-8 py-6">
        <VideoPlayerWrapper streamUrl={episode.stream_url} />

        {/* Episode info */}
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-gray-400 text-sm">S{episode.season} E{episode.episode} • {episode.duration}</p>
            <h1 className="text-white text-2xl font-black mt-1">{episode.title}</h1>
            <p className="text-gray-300 mt-2 leading-relaxed">{episode.description}</p>
          </div>

          {/* Prev / Next */}
          <div className="flex gap-2 flex-none mt-2">
            {prevEpisode && (
              <Link href={`/tv/${show.id}/watch/${prevEpisode.id}`}>
                <button className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded transition-colors">
                  ← Prev
                </button>
              </Link>
            )}
            {nextEpisode && (
              <Link href={`/tv/${show.id}/watch/${nextEpisode.id}`}>
                <button className="bg-white text-black font-bold text-sm px-4 py-2 rounded hover:bg-gray-200 transition-colors">
                  Next →
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}