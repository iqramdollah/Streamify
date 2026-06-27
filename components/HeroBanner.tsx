'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Movie {
  id: string
  title: string
  description: string
  thumbnail_url: string
  genre: string
  year: number
}

export default function HeroBanner({ movies }: { movies: Movie[] }) {
  const [current, setCurrent] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % movies.length)
        setFade(true)
      }, 500)
    }, 6000)
    return () => clearInterval(interval)
  }, [movies.length])

  const movie = movies[current]

  return (
    <div className="relative w-full h-[95vh] flex items-end overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 transition-all duration-1000"
        style={{
          backgroundImage: `url(${movie.thumbnail_url})`,
          opacity: fade ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      />

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent h-32" />

      {/* Content */}
      <div
        className="relative z-10 px-12 pb-24 max-w-2xl"
        style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
      >
        {/* Badges */}
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            {movie.genre.toUpperCase()}
          </span>
          <span className="border border-gray-400 text-gray-300 text-xs px-2 py-1 rounded">
            16+
          </span>
          <span className="text-gray-400 text-sm">{movie.year}</span>
        </div>

        <h1 className="text-6xl font-black mb-4 leading-tight tracking-tight drop-shadow-lg">
          {movie.title}
        </h1>

        {/* Match & runtime */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-green-400 font-bold text-sm">98% Match</span>
          <span className="text-gray-400 text-sm">2h 14m</span>
          <span className="text-gray-400 text-sm">HD</span>
        </div>

        <p className="text-gray-300 mb-8 leading-relaxed text-base line-clamp-3">
          {movie.description}
        </p>

        <div className="flex gap-3">
          <Link href={`/watch/${movie.id}`}>
            <button className="flex items-center gap-2 bg-white text-black font-bold px-8 py-3 rounded hover:bg-gray-200 transition-colors text-base">
              ▶ Play
            </button>
          </Link>
          <button className="flex items-center gap-2 bg-gray-600/70 text-white font-bold px-8 py-3 rounded hover:bg-gray-600/50 transition-colors text-base backdrop-blur-sm">
            + My List
          </button>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-8 right-12 flex gap-2 z-10">
        {movies.map((_, i) => (
          <button
            key={i}
            onClick={() => { setFade(false); setTimeout(() => { setCurrent(i); setFade(true) }, 500) }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? 'bg-white w-6' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  )
}