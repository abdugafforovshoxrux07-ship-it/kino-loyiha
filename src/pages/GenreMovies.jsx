import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import MovieGrid from '../components/MovieGrid.jsx'
import Pagination from '../components/Pagination.jsx'
import useFetch from '../hooks/useFetch.js'
import useGenres from '../hooks/useGenres.js'
import { getMoviesByGenre } from '../services/movieService.js'

export default function GenreMovies() {
  const { id } = useParams()
  const location = useLocation()
  const [page, setPage] = useState(1)
  const { genres } = useGenres()

  const genreName = location.state?.name || genres.find((g) => String(g.id) === id)?.name || 'Genre'

  const { data, loading, error, refetch } = useFetch(() => getMoviesByGenre(id, page), [id, page])

  return (
    <div className="animate-fadeIn pb-16">
      <PageHeader title={`${genreName} Movies`} subtitle={`Discover the best ${genreName.toLowerCase()} movies.`} />
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <MovieGrid movies={data?.results} loading={loading} error={error} onRetry={refetch} />
        {!loading && !error && (
          <Pagination currentPage={page} totalPages={data?.total_pages} onPageChange={setPage} />
        )}
      </div>
    </div>
  )
}
