'use client'
import { useRef } from 'react'
import TrailerCard from './TrailerCard'

interface Movie {
  id: string
  title: string
  thumbnail_url: string
  year: number
  genre: string
  trailer_url: string
}

export default function TrailerRow({ title, movies }: { title: string, movies: Movie[] }) {
  const rowRef = useRef<HTMLDivElement>(null)

  if (!movies || movies.length === 0) return null

  const scroll = (dir: 'left' | 'right') => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: dir === 'left' ? -600 : 600, behavior: 'smooth' })
    }
  }

  return (
    <div className="mb-10 group/row">
      <div className="px-12 mb-3 flex items-center gap-2">
        <span className="w-1 h-5 bg-red-600 rounded inline-block" />
        <h2 className="text-white text-lg font-bold">{title}</h2>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          ‹
        </button>

        <div
          ref={rowRef}
          className="flex gap-4 overflow-x-auto px-12 pb-2"
          style={{ scrollbarWidth: 'none' }}
        >
          {movies.map(movie => (
            <TrailerCard key={movie.id} movie={movie} />
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          ›
        </button>
      </div>
    </div>
  )
}