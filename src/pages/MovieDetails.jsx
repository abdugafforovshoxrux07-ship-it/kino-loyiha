import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch.js'
import { useFavoritesStore } from '../stores/useFavoritesStore.js'
import {
  formatCurrency,
  formatDate,
  formatRating,
  formatRuntime,
  getBackdropUrl,
  getPosterUrl,
} from '../utils/format.js'
import { getMovieDetails, getSimilarMovies } from '../services/movieService.js'
import ErrorState from '../components/ErrorState.jsx'
import MovieGrid from '../components/MovieGrid.jsx'
import Rating from '../components/Rating.jsx'

function DetailsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="shimmer-bg h-[45vh] w-full animate-shimmer sm:h-[55vh]" />
      <div className="mx-auto -mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="shimmer-bg h-72 w-48 shrink-0 animate-shimmer rounded-2xl" />
          <div className="mt-4 flex-1 space-y-3 sm:mt-32">
            <div className="shimmer-bg h-8 w-2/3 animate-shimmer rounded" />
            <div className="shimmer-bg h-4 w-1/3 animate-shimmer rounded" />
            <div className="shimmer-bg h-24 w-full animate-shimmer rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MovieDetails() {
  const { id } = useParams()
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite)
  const isFavorite = useFavoritesStore((s) => s.isFavorite(Number(id)))

  const { data: movie, loading, error, refetch } = useFetch(() => getMovieDetails(id), [id])
  const { data: similarData, loading: similarLoading } = useFetch(() => getSimilarMovies(id), [id])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [id])

  if (loading) return <DetailsSkeleton />

  if (error || !movie) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
        <ErrorState title="Movie not found" message={error || 'This movie could not be loaded.'} onRetry={refetch} />
      </div>
    )
  }

  const director = movie.credits?.crew?.find((c) => c.job === 'Director')
  const cast = movie.credits?.cast?.slice(0, 8) || []

  return (
    <div className="animate-fadeIn pb-16">
      {/* Backdrop */}
      <div className="relative h-[60vh] w-full overflow-hidden sm:h-[80vh]">
        <img
          src={getBackdropUrl(movie.backdrop_path, 'original')}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-light via-surface-light/60 to-black/30 dark:from-surface-dark dark:via-surface-dark/70" />
      </div>

      <div className="mx-auto -mt-28 max-w-7xl px-4 sm:-mt-32 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
          <img
            src={getPosterUrl(movie.poster_path, 'lg')}
            alt={movie.title}
            className="w-40 shrink-0 rounded-2xl shadow-card ring-4 ring-white dark:ring-surface-dark sm:w-56"
          />

          <div className="flex-1">
            <h1 className="font-display text-2xl font-extrabold text-slate-900 drop-shadow dark:text-white sm:text-4xl">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="mt-1 italic text-slate-500 dark:text-slate-400">{movie.tagline}</p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Rating value={movie.vote_average} />
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {formatRating(movie.vote_average)} ({movie.vote_count?.toLocaleString()} votes)
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {movie.genres?.map((g) => (
                <Link
                  key={g.id}
                  to={`/genres/${g.id}`}
                  state={{ name: g.name }}
                  className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-primary-100 hover:text-primary-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-primary-950 dark:hover:text-primary-400"
                >
                  {g.name}
                </Link>
              ))}
            </div>

            <button
              type="button"
              onClick={() => toggleFavorite(movie)}
              className={`mt-5 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition active:scale-95 ${
                isFavorite
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {isFavorite ? '★ Remove from Favorites' : '☆ Add to Favorites'}
            </button>
          </div>
        </div>

        {/* Info grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Release Date', value: formatDate(movie.release_date) },
            { label: 'Runtime', value: formatRuntime(movie.runtime) },
            { label: 'Status', value: movie.status || 'N/A' },
            { label: 'Budget', value: formatCurrency(movie.budget) },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl bg-card-light p-4 text-center shadow-sm dark:bg-card-dark"
            >
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{item.label}</p>
              <p className="mt-1 font-semibold text-slate-800 dark:text-slate-100">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Overview */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-xl font-bold text-slate-800 dark:text-slate-100">Overview</h2>
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
              {movie.overview || 'No overview available for this movie.'}
            </p>

            {director && (
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-200">Director:</span> {director.name}
              </p>
            )}

            {cast.length > 0 && (
              <div className="mt-8">
                <h3 className="font-display text-lg font-bold text-slate-800 dark:text-slate-100">Top Cast</h3>
                <div className="no-scrollbar mt-4 flex gap-4 overflow-x-auto pb-2">
                  {cast.map((member) => (
                    <div key={member.cast_id || member.credit_id} className="w-24 shrink-0 text-center">
                      <img
                        src={getPosterUrl(member.profile_path, 'sm')}
                        alt={member.name}
                        className="h-28 w-24 rounded-xl object-cover shadow-sm"
                      />
                      <p className="mt-2 line-clamp-1 text-xs font-medium text-slate-700 dark:text-slate-200">
                        {member.name}
                      </p>
                      <p className="line-clamp-1 text-[11px] text-slate-500 dark:text-slate-400">
                        {member.character}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="rounded-2xl bg-card-light p-5 shadow-sm dark:bg-card-dark">
            <h3 className="font-display text-base font-bold text-slate-800 dark:text-slate-100">Details</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500 dark:text-slate-400">Original Title</dt>
                <dd className="text-right font-medium text-slate-700 dark:text-slate-200">
                  {movie.original_title}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500 dark:text-slate-400">Language</dt>
                <dd className="font-medium uppercase text-slate-700 dark:text-slate-200">
                  {movie.original_language}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500 dark:text-slate-400">Popularity</dt>
                <dd className="font-medium text-slate-700 dark:text-slate-200">
                  {Math.round(movie.popularity || 0).toLocaleString()}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500 dark:text-slate-400">Revenue</dt>
                <dd className="font-medium text-slate-700 dark:text-slate-200">{formatCurrency(movie.revenue)}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Similar movies */}
        <div className="mt-14">
          <h2 className="font-display text-xl font-bold text-slate-800 dark:text-slate-100">Similar Movies</h2>
          <div className="mt-5">
            <MovieGrid
              movies={similarData?.results}
              loading={similarLoading}
              emptyMessage="No similar movies found."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
