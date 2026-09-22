import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFavoritesStore } from '../stores/useFavoritesStore.js'
import { formatDate, formatRating, getBackdropUrl } from '../utils/format.js'

/**
 * Full-width, auto-rotating hero showcasing a handful of featured movies
 * (typically the current trending/now-playing list) with a backdrop,
 * synopsis and call-to-action buttons.
 */
export default function Hero({ movies = [] }) {
  const [active, setActive] = useState(0)
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite)
  const isFavorite = useFavoritesStore((s) => (movies[active] ? s.isFavorite(movies[active].id) : false))

  useEffect(() => {
    if (movies.length <= 1) return undefined
    const timer = setInterval(() => setActive((i) => (i + 1) % movies.length), 6000)
    return () => clearInterval(timer)
  }, [movies.length])

  if (!movies.length) {
    return (
      <div className="shimmer-bg h-[60vh] w-full animate-shimmer rounded-b-3xl sm:h-[70vh]" />
    )
  }

  const movie = movies[active]

  return (
    <section className="relative h-[64vh] w-full overflow-hidden sm:h-[75vh]">
      {movies.map((m, i) => (
        <img
          key={m.id}
          src={getBackdropUrl(m.backdrop_path, 'md')}
          alt=""
          aria-hidden="true"
          loading={i === 0 ? 'eager' : 'lazy'}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-surface-light via-surface-light/40 to-transparent dark:from-surface-dark dark:via-surface-dark/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 sm:px-6 lg:px-8">
        <div key={movie.id} className="max-w-2xl animate-fadeIn">
          <span className="mb-3 inline-block rounded-full bg-primary-600/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Featured
          </span>
          <h1 className="font-display text-3xl font-extrabold text-white drop-shadow-lg sm:text-4xl lg:text-5xl">
            {movie.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-200">
            <span className="rounded bg-white/10 px-2 py-0.5 backdrop-blur-sm">
              ⭐ {formatRating(movie.vote_average)}
            </span>
            <span>{formatDate(movie.release_date)}</span>
          </div>
          <p className="mt-4 line-clamp-3 max-w-xl text-sm text-slate-200 sm:text-base">
            {movie.overview}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to={`/movie/${movie.id}`}
              className="rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-primary-700 active:scale-95"
            >
              View Details
            </Link>
            <button
              type="button"
              onClick={() => toggleFavorite(movie)}
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
            >
              {isFavorite ? '★ In Favorites' : '☆ Add to Favorites'}
            </button>
          </div>
        </div>

        {movies.length > 1 && (
          <div className="mt-8 flex gap-2">
            {movies.map((m, i) => (
              <button
                key={m.id}
                type="button"
                aria-label={`Show ${m.title}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'w-8 bg-primary-500' : 'w-3 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
