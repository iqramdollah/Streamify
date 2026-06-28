// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { Suspense } from 'react'



export const metadata: Metadata = {
  title: 'Netflix Clone',
  description: 'A Netflix-style streaming portfolio project',
  verification: {
    google: 'uKNbd6N_YFa0JHb4xL6ZRMogOO-5Jx_LQUJB06yLmOQ', // paste just the content value here
  },
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


