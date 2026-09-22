import PageHeader from '../components/PageHeader.jsx'
import GenreCard from '../components/GenreCard.jsx'
import useGenres from '../hooks/useGenres.js'

export default function Genres() {
  const { genres, loading } = useGenres()

  return (
    <div className="animate-fadeIn pb-16">
      <PageHeader title="Genres" subtitle="Browse the full catalog by genre." />
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="shimmer-bg h-28 animate-shimmer rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {genres.map((genre, i) => (
              <GenreCard key={genre.id} genre={genre} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
