import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import SearchBar from '../components/SearchBar.jsx'
import MovieGrid from '../components/MovieGrid.jsx'
import Pagination from '../components/Pagination.jsx'
import EmptyState from '../components/EmptyState.jsx'
import useFetch from '../hooks/useFetch.js'
import { searchMovies } from '../services/movieService.js'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [page, setPage] = useState(1)

  const { data, loading, error, refetch } = useFetch(
    () => (query ? searchMovies(query, page) : Promise.resolve(null)),
    [query, page],
    { skip: !query }
  )

  useEffect(() => {
    setPage(1)
  }, [query])

  const handleSearch = (value) => {
    setSearchParams({ q: value })
  }

  return (
    <div className="animate-fadeIn pb-16">
      <PageHeader title="Search Movies" subtitle="Find any movie in the TMDB catalog." />

      <div className="mx-auto max-w-2xl px-4 pt-6 sm:px-6 lg:px-8">
        <SearchBar initialValue={query} onSearch={handleSearch} autoFocus />
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {!query ? (
          <EmptyState
            title="Start typing to search"
            message="Search by movie title — e.g. “Inception”, “Dune”, “Spider-Man”."
            icon="🔍"
          />
        ) : (
          <>
            {!loading && !error && (
              <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
                {data?.total_results
                  ? `${data.total_results.toLocaleString()} results for "${query}"`
                  : `No results for "${query}"`}
              </p>
            )}
            <MovieGrid
              movies={data?.results}
              loading={loading}
              error={error}
              onRetry={refetch}
              emptyMessage={`We couldn't find any movies matching "${query}". Try a different title.`}
            />
            {!loading && !error && (
              <Pagination currentPage={page} totalPages={data?.total_pages} onPageChange={setPage} />
            )}
          </>
        )}
      </div>
    </div>
  )
}
