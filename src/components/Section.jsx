import { Link } from 'react-router-dom'
import MovieCard from './MovieCard.jsx'
import { CardSkeleton } from './LoadingSkeleton.jsx'
import ErrorState from './ErrorState.jsx'

/**
 * A horizontally-scrollable "rail" section used on the Home page
 * (Popular, Top Rated, Upcoming, etc.) with a heading and "View All" link.
 */
export default function Section({ title, subtitle, viewAllPath, movies, loading, error }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-slate-800 dark:text-slate-100 sm:text-2xl">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
        </div>
        {viewAllPath && (
          <Link
            to={viewAllPath}
            className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary-500 transition hover:text-primary-600"
          >
            View All
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      {error ? (
        <ErrorState message={error} />
      ) : (
        <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-40 shrink-0 sm:w-48">
                  <CardSkeleton />
                </div>
              ))
            : movies.slice(0, 12).map((movie) => (
                <div key={movie.id} className="w-40 shrink-0 sm:w-48">
                  <MovieCard movie={movie} />
                </div>
              ))}
        </div>
      )}
    </section>
  )
}
