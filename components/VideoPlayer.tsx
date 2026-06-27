'use client'

export default function VideoPlayer({ streamUrl }: { streamUrl: string }) {
  const isYouTube = streamUrl.includes('youtube.com/embed')

  if (isYouTube) {
    return (
      <iframe
        src={streamUrl}
        className="w-full aspect-video rounded-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  return (
    <video
      src={streamUrl}
      controls
      className="w-full rounded-lg"
      autoPlay
    />
  )
}