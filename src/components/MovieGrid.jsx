import MovieCard from './MovieCard.jsx'
import LoadingSkeleton from './LoadingSkeleton.jsx'
import ErrorState from './ErrorState.jsx'
import EmptyState from './EmptyState.jsx'

/**
 * Renders a responsive grid of MovieCards, and takes care of the
 * loading / error / empty states so pages don't repeat this logic.
 */
export default function MovieGrid({ movies, loading, error, onRetry, emptyMessage }) {
  if (loading) return <LoadingSkeleton count={10} />
  if (error) return <ErrorState message={error} onRetry={onRetry} />
  if (!movies || movies.length === 0) {
    return <EmptyState title="No movies found" message={emptyMessage || 'Try a different filter or search term.'} />
  }

  return (
    <div className="grid animate-fadeIn grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
