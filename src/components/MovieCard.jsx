import { Link } from 'react-router-dom'
import { useFavoritesStore } from '../stores/useFavoritesStore.js'
import { formatYear, getPosterUrl } from '../utils/format.js'
import Rating from './Rating.jsx'
import useGenres from '../hooks/useGenres.js'

/**
 * Premium movie card: poster, title, year, rating, genre chips and a
 * favorite toggle. On hover it reveals an overlay with an overview
 * snippet and a "View Details" call to action.
 */
export default function MovieCard({ movie }) {
  const isFavorite = useFavoritesStore((s) => s.isFavorite(movie.id))
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite)
  const { getGenreNames } = useGenres()

  const genreNames = getGenreNames(movie.genre_ids || movie.genres?.map((g) => g.id) || [])

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(movie)
  }

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group relative block overflow-hidden rounded-2xl bg-card-light shadow-card ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow dark:bg-card-dark dark:ring-white/5"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
        <img
          src={getPosterUrl(movie.poster_path, 'md')}
          alt={movie.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />

        {/* Favorite button */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-primary-600 active:scale-90"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            className={`h-5 w-5 ${isFavorite ? 'text-primary-500' : 'text-white'}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21s-6.5-4.35-9.5-8.35C.7 9.7 1.4 6 4.6 4.7 7 3.7 9.5 4.6 12 7.3c2.5-2.7 5-3.6 7.4-2.6 3.2 1.3 3.9 5 2.1 7.95C18.5 16.65 12 21 12 21Z"
            />
          </svg>
        </button>

        {/* Rating badge */}
        <div className="absolute left-2 top-2 z-10">
          <Rating value={movie.vote_average} size="sm" />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="mb-2 line-clamp-3 text-xs text-slate-200">
            {movie.overview || 'No description available.'}
          </p>
          <span className="inline-flex w-full items-center justify-center rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-primary-700">
            View Details
          </span>
        </div>
      </div>

      <div className="p-3">
        <h3 className="line-clamp-1 font-display text-sm font-semibold text-slate-800 dark:text-slate-100">
          {movie.title}
        </h3>
        <div className="mt-1 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{formatYear(movie.release_date)}</span>
          {genreNames.length > 0 && <span className="line-clamp-1">{genreNames[0]}</span>}
        </div>
      </div>
    </Link>
  )
}
