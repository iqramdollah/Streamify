// app/watch/[id]/page.tsx
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import VideoPlayerWrapper from './VideoPlayerWrapper'

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data: movie } = await supabase.from('movies').select('*').eq('id', id).single()
  if (!movie) return <p className="text-white p-8">Movie not found</p>

  return (
  <main className="bg-[#141414] min-h-screen">
    <div className="flex items-center px-8 py-4 bg-black">
      <Link href="/" className="text-red-600 text-xl font-black tracking-widest uppercase mr-8">
        Streamify
      </Link>
      <Link href={`/movie/${movie.id}`} className="text-gray-400 hover:text-white text-sm transition-colors">
        ← Back to {movie.title}
      </Link>
    </div>

    <div className="max-w-5xl mx-auto px-8 py-6">
      <VideoPlayerWrapper streamUrl={movie.stream_url} />
      <h1 className="text-white text-3xl font-black mt-6">{movie.title}</h1>
      <p className="text-gray-400 mt-2">{movie.year} • {movie.genre}</p>
      <p className="text-gray-300 mt-4 text-lg leading-relaxed">{movie.description}</p>
    </div>
  </main>
)
}