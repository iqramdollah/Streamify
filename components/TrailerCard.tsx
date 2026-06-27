interface Movie {
  id: string
  title: string
  thumbnail_url: string
  year: number
  genre: string
  trailer_url: string
}

export default function TrailerCard({ movie }: { movie: Movie }) {
  return (
    <div className="flex-none w-64 md:w-80">
      <div className="relative group cursor-pointer rounded overflow-hidden">
        <iframe
          src={movie.trailer_url}
          title={movie.title}
          className="w-full aspect-video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <p className="text-white mt-2 text-sm font-bold">{movie.title}</p>
      <p className="text-gray-400 text-xs">{movie.year} • {movie.genre}</p>
    </div>
  )
}