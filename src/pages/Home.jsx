import { useEffect, useState } from 'react'
import Hero from '../components/Hero.jsx'
import Section from '../components/Section.jsx'
import GenreCard from '../components/GenreCard.jsx'
import useFetch from '../hooks/useFetch.js'
import useGenres from '../hooks/useGenres.js'
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from '../services/movieService.js'

export default function Home() {
  const { data: popularData, loading: popularLoading, error: popularError } = useFetch(
    () => getPopularMovies(1),
    []
  )
  const { data: topRatedData, loading: topRatedLoading, error: topRatedError } = useFetch(
    () => getTopRatedMovies(1),
    []
  )
  const { data: upcomingData, loading: upcomingLoading, error: upcomingError } = useFetch(
    () => getUpcomingMovies(1),
    []
  )
  const { data: nowPlayingData, loading: nowPlayingLoading } = useFetch(() => getNowPlayingMovies(1), [])

  const { genres, loading: genresLoading } = useGenres()

  const [heroMovies, setHeroMovies] = useState([])

  useEffect(() => {
    if (nowPlayingData?.results?.length) {
      setHeroMovies(nowPlayingData.results.slice(0, 6))
    }
  }, [nowPlayingData])

  return (
    <div className="animate-fadeIn pb-10">
      <Hero movies={heroMovies} />

      <Section
        title="Popular Movies"
        subtitle="What everyone's watching right now"
        viewAllPath="/popular"
        movies={popularData?.results || []}
        loading={popularLoading}
        error={popularError}
      />

      <Section
        title="Top Rated"
        subtitle="Critically acclaimed favorites"
        viewAllPath="/top-rated"
        movies={topRatedData?.results || []}
        loading={topRatedLoading}
        error={topRatedError}
      />

      <Section
        title="Upcoming"
        subtitle="Coming soon to theaters"
        viewAllPath="/upcoming"
        movies={upcomingData?.results || []}
        loading={upcomingLoading}
        error={upcomingError}
      />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-800 dark:text-slate-100 sm:text-2xl">
              Browse by Genre
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Find something new to watch</p>
          </div>
        </div>

        {genresLoading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="shimmer-bg h-24 animate-shimmer rounded-2xl sm:h-28" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {genres.slice(0, 8).map((genre, i) => (
              <GenreCard key={genre.id} genre={genre} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
