// app/movie/[id]/page.tsx
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data: movie } = await supabase.from('movies').select('*').eq('id', id).single()

  if (!movie) return <p className="text-white p-8">Movie not found</p>

  const bgStyle = { backgroundImage: 'url(' + movie.thumbnail_url + ')' }

  return (
    <main className="bg-[#141414] min-h-screen">
      <Navbar />
      <div className="relative w-full h-[70vh] flex items-end">
        <div className="absolute inset-0 bg-cover bg-center" style={bgStyle} />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
        <div className="relative z-10 px-12 pb-12 max-w-2xl">
          <h1 className="text-5xl font-black mb-4 leading-tight text-white">{movie.title}</h1>
          <div className="flex gap-3">
            <Link href={'/watch/' + movie.id}>
              <button className="flex items-center gap-2 bg-white text-black font-bold px-8 py-3 rounded hover:bg-gray-200 transition-colors text-base">
                ▶ Play
              </button>
            </Link>
            <Link href="/">
              <button className="flex items-center gap-2 bg-gray-600/70 text-white font-bold px-8 py-3 rounded hover:bg-gray-600/50 transition-colors text-base">
                ← Back
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="px-12 py-8 max-w-4xl">
        <h2 className="text-white text-2xl font-bold mb-4">About this movie</h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-8">{movie.description}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div><p className="text-gray-500 text-sm mb-1">Genre</p><p className="text-white font-medium">{movie.genre}</p></div>
          <div><p className="text-gray-500 text-sm mb-1">Year</p><p className="text-white font-medium">{movie.year}</p></div>
          <div><p className="text-gray-500 text-sm mb-1">Rating</p><p className="text-white font-medium">16+</p></div>
        </div>
      </div>
    </main>
  )
}