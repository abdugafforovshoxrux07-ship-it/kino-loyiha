import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import LoadingSkeleton from './components/LoadingSkeleton.jsx'

// Lazy-loaded pages: each route's code is split into its own chunk,
// so the initial bundle only contains what's needed for the first paint.
const Home = lazy(() => import('./pages/Home.jsx'))
const Popular = lazy(() => import('./pages/Popular.jsx'))
const TopRated = lazy(() => import('./pages/TopRated.jsx'))
const NowPlaying = lazy(() => import('./pages/NowPlaying.jsx'))
const Upcoming = lazy(() => import('./pages/Upcoming.jsx'))
const Genres = lazy(() => import('./pages/Genres.jsx'))
const GenreMovies = lazy(() => import('./pages/GenreMovies.jsx'))
const Search = lazy(() => import('./pages/Search.jsx'))
const MovieDetails = lazy(() => import('./pages/MovieDetails.jsx'))
const Favorites = lazy(() => import('./pages/Favorites.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

function PageFallback() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <LoadingSkeleton count={10} />
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/now-playing" element={<NowPlaying />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/genres/:id" element={<GenreMovies />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
