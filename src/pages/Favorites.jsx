import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import MovieCard from '../components/MovieCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { useFavoritesStore } from '../stores/useFavoritesStore.js'

export default function Favorites() {
  const favorites = useFavoritesStore((s) => s.favorites)
  const clearFavorites = useFavoritesStore((s) => s.clearFavorites)

  return (
    <div className="animate-fadeIn pb-16">
      <PageHeader
        title="Your Favorites"
        subtitle={
          favorites.length
            ? `You have ${favorites.length} movie${favorites.length > 1 ? 's' : ''} saved.`
            : 'Movies you favorite will show up here.'
        }
      />

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        {favorites.length === 0 ? (
          <EmptyState
            title="No favorites yet"
            message="Tap the heart icon on any movie card to save it here for later."
            icon="❤️"
            action={
              <Link
                to="/popular"
                className="mt-2 rounded-full bg-primary-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary-700"
              >
                Browse Popular Movies
              </Link>
            }
          />
        ) : (
          <>
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={clearFavorites}
                className="text-sm font-medium text-slate-500 underline-offset-2 hover:text-red-500 hover:underline"
              >
                Clear all favorites
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {favorites.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
