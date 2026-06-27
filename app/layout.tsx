// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { Suspense } from 'react'



export const metadata: Metadata = {
  title: 'Netflix Clone',
  description: 'A Netflix-style streaming portfolio project',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  )
}

