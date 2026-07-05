# Streamify

A Netflix-inspired streaming platform built with Next.js, Supabase, and Tailwind CSS.

## Live Demo

[netflix-clone-drab-gamma.vercel.app](https://netflix-clone-drab-gamma.vercel.app)

## Features

- Auto-switching hero banner with fade transitions
- Movie rows with horizontal scroll and arrow navigation
- Movie detail page with trailer player
- Latest in cinemas trailer row (YouTube embed)
- Search by title or genre
- User authentication (signup/login/logout)
- Fully responsive design

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Frontend framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Supabase | Database and authentication |
| Vercel | Deployment |

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

1. Clone the repository
   git clone https://github.com/iqramdollah/netflix-clone.git
   cd netflix-clone

2. Install dependencies
   npm install

3. Set up environment variables
   Create a .env.local file in the root directory:
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

4. Set up Supabase
   Run this SQL in your Supabase SQL editor:
   create table movies (
     id uuid default gen_random_uuid() primary key,
     title text not null,
     description text,
     thumbnail_url text,
     stream_url text not null,
     trailer_url text,
     genre text,
     year int,
     created_at timestamp default now()
   );

5. Run the development server
   npm run dev

   Open http://localhost:3000

## Project Structure

app/
  page.tsx          - Home page
  login/            - Login page
  signup/           - Signup page
  movie/[id]/       - Movie detail page
  watch/[id]/       - Video player page
  search/           - Search results page
components/
  Navbar.tsx        - Navigation bar with auth
  HeroBanner.tsx    - Auto-switching hero
  MovieCard.tsx     - Movie card with hover effects
  MovieRow.tsx      - Scrollable movie row
  TrailerCard.tsx   - Trailer embed card
  TrailerRow.tsx    - Scrollable trailer row
  VideoPlayer.tsx   - HLS and YouTube player
lib/
  supabase.ts       - Supabase client

## Screenshots

Home Page - Hero banner with auto-switching thumbnails and movie rows
Movie Detail - Full detail page with trailer and movie info
Watch Page - Clean video player with movie details
Search - Real-time search by title or genre
Auth - Login and signup pages

## Author

Iqram - github.com/iqramdollah
