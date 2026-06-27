import { Suspense } from 'react'

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="bg-[#141414] min-h-screen" />}>{children}</Suspense>
}