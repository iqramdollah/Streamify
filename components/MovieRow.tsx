'use client'
import { useRef } from 'react'
import MovieCard from './MovieCard'

interface Movie {
  id: string
  title: string
  thumbnail_url: string
  year: number
  genre: string
}

export default function MovieRow({ title, movies }: { title: string, movies: Movie[] }) {
  const rowRef = useRef<HTMLDivElement>(null)

  if (!movies || movies.length === 0) return null

  const scroll = (dir: 'left' | 'right') => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: dir === 'left' ? -600 : 600, behavior: 'smooth' })
    }
  }

  return (
  <div style={{ marginBottom: '2.5rem' }} className="group/row">
    <h2 style={{ paddingLeft: '6rem', paddingRight: '6rem' }} className="text-white text-lg font-bold mb-3">
      {title}
    </h2>

    <div className="relative">
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
      >
        ‹
      </button>

      <div
        ref={rowRef}
        style={{ paddingLeft: '6rem', paddingRight: '6rem', scrollbarWidth: 'none' }}
        className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide scroll-smooth"
      >
        {movies.map(movie => (
          <div key={movie.id} className="flex-none w-56 md:w-64">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
      >
        ›
      </button>
    </div>
  </div>
)
}