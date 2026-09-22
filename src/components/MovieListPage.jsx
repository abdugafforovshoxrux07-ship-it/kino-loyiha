import { useState } from 'react'
import PageHeader from './PageHeader.jsx'
import MovieGrid from './MovieGrid.jsx'
import Pagination from './Pagination.jsx'
import useFetch from '../hooks/useFetch.js'

/**
 * Generic "browse a paginated movie list" page — reused by Popular,
 * Top Rated, Now Playing and Upcoming so each route stays declarative.
 */
export default function MovieListPage({ title, subtitle, fetcher }) {
  const [page, setPage] = useState(1)
  const { data, loading, error, refetch } = useFetch(() => fetcher(page), [page])

  return (
    <div className="animate-fadeIn pb-16">
      <PageHeader title={title} subtitle={subtitle} />
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <MovieGrid movies={data?.results} loading={loading} error={error} onRetry={refetch} />
        {!loading && !error && (
          <Pagination currentPage={page} totalPages={data?.total_pages} onPageChange={setPage} />
        )}
      </div>
    </div>
  )
}
