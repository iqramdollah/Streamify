// app/watch/[id]/VideoPlayerWrapper.tsx
'use client'
import dynamic from 'next/dynamic'

const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), { ssr: false })

export default function VideoPlayerWrapper({ streamUrl }: { streamUrl: string }) {
  return <VideoPlayer streamUrl={streamUrl} />
}