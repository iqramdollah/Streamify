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
    <div className="mb-10 group/row">
      <div className="flex items-center justify-between px-12 mb-3">
        <h2 className="text-white text-lg font-bold hover:text-gray-300 cursor-pointer transition-colors">
          {title}
          <span className="text-red-500 text-sm ml-2 opacity-0 group-hover/row:opacity-100 transition-opacity">
            Explore all →
          </span>
        </h2>
      </div>

      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          ‹
        </button>

        {/* Cards */}
        <div
          ref={rowRef}
          className="flex gap-2 overflow-x-auto px-12 pb-2 scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none' }}
        >
          {movies.map(movie => (
            <div key={movie.id} className="flex-none w-56 md:w-64">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Right arrow */}
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